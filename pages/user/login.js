import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Form, Tabs, Input, Button, Modal, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons/lib/icons";
import { isBrowser } from "react-device-detect";
import axios from "axios";
import io from "socket.io-client";
import Image from "next/image";

import keyGenerator from "../assets/js/KeyGenerator";
import QRScanner from "../components/QRwithCamera";
let socket;

export default () => {
  const [type, setType] = useState("admin");
  const [isConnected, setIsConnected] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [form] = Form.useForm();

  const handleLogin = async (val) => {
    let payload = {};
    if (val.superpassword) {
      payload = {
        type: "superadmin",
        pass: val.superpassword,
      };
    } else {
      payload = {
        type: "admin",
        username: val.username,
        password: val.password,
        email: val.username,
      };
    }
    let { data } = await axios.post("/api/auth", {
      payload,
    });

    if (!data.success && data.mode == "not-exist")
      message.error("Account doesn't exist");
    if (!data.success && data.mode == "with-pass")
      message.error("Please input a password.");
    if (!data.success && data.mode == "wrong-pass") message.error(data.message);

    if (data.success) {
      if (data.mode == "validated") {
        let key = keyGenerator(5);
        //Cookieeee, wanna bite ? :3
        Cookies.set("user", JSON.stringify(data.user));
        Cookies.set("loggedIn", "true");
        Cookies.set("key", key);

        socket.emit("push-new-system", key);

        message.success(data.message);
        window.location.href = "/";
      }
      if (data.mode == "admin-no-pass") {
        setModalEmail(data.email);
        setOpenModal(true);
      }
    }
  };

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      if (!isBrowser)
        socket.emit("remove-device", {
          deviceID: Cookies.get("key"),
        });
    });
  }, []);

  //return a view
  if (!isBrowser) {
    if (!JSON.parse(Cookies.get("redirectedToQR") || false)) {
      Cookies.set("redirectedToQR", "true");
      if (window.location.href != "https://192.168.254.113:3001/")
        window.location.href = "https://192.168.254.113:3001/";
    } else Cookies.remove("redirectedToQR");

    return (
      <QRScanner setIsConnected={setIsConnected} isConnected={isConnected} />
    );
  } else
    return (
      <>
        <Modal
          visible={openModal}
          title={`Setup account for email '${modalEmail}'`}
          onCancel={() => setOpenModal(false)}
          onOk={form.submit}
        >
          <Form
            form={form}
            onFinish={async (val) => {
              const { confirm, password } = val;
              if (confirm != password) {
                message.error("password and confirm password didn't match.");
                return;
              }

              let { data } = await axios.post("/api/auth", {
                payload: {
                  ...val,
                  email: modalEmail,
                  type: "new-admin-update",
                },
              });

              if (data.success) {
                let key = keyGenerator(5);
                Cookies.set("user", JSON.stringify(data.user));
                Cookies.set("loggedIn", "true");
                Cookies.set("key", key);

                socket.emit("push-new-system", key);

                message.success(data.message);
                window.location.href = "/";
              }
            }}
            labelCol={{ span: 7 }}
          >
            <Form.Item
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: "This is required.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Lastname'
              name='lastname'
              rules={[
                {
                  required: true,
                  message: "This is required.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[
                {
                  required: true,
                  message: "This is required.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: "This is required.",
                },
              ]}
            >
              <Input type='password' />
            </Form.Item>
            <Form.Item
              label='Confirm Password'
              name='confirm'
              rules={[
                {
                  required: true,
                  message: "This is required.",
                },
              ]}
            >
              <Input type='password' />
            </Form.Item>
          </Form>
        </Modal>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            overflow: "auto",
            minHeight: "100vh",
            background: "#eee",
          }}
        >
          {/* <Typography.Title>Ngalan samo system</Typography.Title> */}
          <div style={{ marginBottom: 10 }}>
            <Image src='/logo.png' alt='me' width='128' height='64' />
          </div>
          <Form
            style={{
              width: 400,
              padding: 30,
              boxShadow: "0 0 7px 1px gray",
              background: "#fff",
            }}
            onFinish={handleLogin}
          >
            <Tabs activeKey={type} onChange={setType} type='card'>
              <Tabs.TabPane key='admin' tab='Admin'>
                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: type == "admin" ? true : false,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} size='large' />
                </Form.Item>
                <Form.Item name='password'>
                  <Input
                    prefix={<LockOutlined />}
                    type='password'
                    size='large'
                  />
                </Form.Item>
              </Tabs.TabPane>
              <Tabs.TabPane key='superadmin' tab='Super Admin'>
                <Form.Item
                  name='superpassword'
                  label={<LockOutlined />}
                  labelCol={{ span: 24 }}
                  colon={false}
                  rules={[
                    {
                      required: type == "superadmin" ? true : false,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    type='password'
                    size='large'
                    style={{
                      letterSpacing: 10,
                      width: "80%",
                      textAlign: "center",
                    }}
                  />
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>
            <Form.Item>
              <Button
                type='primary'
                style={{ width: "100%" }}
                htmlType='submit'
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
};
