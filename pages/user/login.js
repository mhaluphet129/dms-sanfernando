import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Form, Tabs, Input, Button, Modal, message, Checkbox } from "antd";
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
    if (
      (val.username?.length > 0 && val.username?.trim() == "") ||
      val.username == undefined
    ) {
      message.error("Username is empty.");
      return;
    }
    let { data } = await axios.post("/api/auth", {
      payload: {
        type: "admin",
        username: val.username,
        password: val.password,
        email: val.username,
      },
    });

    if (data.success) {
      if (data.mode == "validated") {
        let obj = {
          _id: data?.user?._id,
          password: data?.user?.password,
          lastname: data?.user?.lastname,
          name: data?.user?.name,
          username: data?.user?.username,
          email: data?.user?.email,
          role: data?.user?.role,
          profile: data?.user?.profile,
        };

        let key = keyGenerator(5);
        //Cookieeee, wanna bite ? :3
        Cookies.set("user", JSON.stringify(obj));
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
    } else {
      if (data.mode == "not-exist") message.error("Account doesn't exist");
      if (data.mode == "with-pass") message.error("Please input a password.");
      if (data.mode == "wrong-pass") message.error(data.message);
    }
  };

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();
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
              <Input.Password />
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
              <Input.Password />
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
          <div style={{ marginBottom: 10 }}>
            <Image src='/logo.png' alt='logo' width='180' height='64' />
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
            <Form.Item label='username' name='username'>
              <Input />
            </Form.Item>

            <Form.Item label='password' name='password'>
              <Input.Password />
            </Form.Item>

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

// 3003 - Password required
// 3004 - Credentials invalid
// 3006 - Permissions insufficient
// 3009 - Name required
// 3010 - Type required
// 3011 - Type invalid
// 3012 - Name taken
// 3030 - Description required
// 3048 - Address line 1 required
// 3049 - Address line 2 required
// 3001 - Email required
// 3074 - Email taken
// 3002 - Email invalid
// 3075 - Mobile required
// 3076 - Mobile taken
// 3077 - Mobile invalid
// 3081 - Old password invalid (min: 6, max: 64 characters)
// 3082 - New password required
// 3083 - New password invalid (min: 6, max: 64 characters)
// 3084 - Old password and new password identical
// 3085 - Old password required
// 3086 - Password invalid (min:6, max: 64 characters)
// 3088 - Old password incorrect
// 2048 - First name required
// 2049 - Last name required
