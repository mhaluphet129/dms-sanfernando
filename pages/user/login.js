import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Form, Tabs, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons/lib/icons";
import { isBrowser } from "react-device-detect";
import axios from "axios";
import io from "socket.io-client";
import Image from "next/image";

import { keyGenerator } from "../assets/js/KeyGenerator";
import QRScanner from "../components/QRwithCamera";
let socket;

export default () => {
  const [type, setType] = useState("admin");
  const [isConnected, setIsConnected] = useState(false);

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
      };
    }
    let { data } = await axios.post("/api/auth", {
      payload,
    });
    if (data.success) {
      let key = keyGenerator(5);
      //Cookieeee, wanna bite ? :3
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("loggedIn", "true");
      Cookies.set("key", key);

      socket.emit("push-new-system", key);

      message.success(data.message);
      window.location.href = "/";
    } else message.error(data.message);
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
      // window.location.href = "https://192.168.254.113:3001/";
    } else Cookies.remove("redirectedToQR");

    return (
      <QRScanner setIsConnected={setIsConnected} isConnected={isConnected} />
    );
  } else
    return (
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
        <Image src="/logo.png" alt="me" width="128" height="64" />
        <Form
          style={{
            width: 255,
            padding: 30,
            boxShadow: "0 0 5px 1px",
            background: "#fff",
          }}
          onFinish={handleLogin}
        >
          <Tabs activeKey={type} onChange={setType} type="card">
            <Tabs.TabPane key="admin" tab="Admin">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: type == "admin" ? true : false,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: type == "admin" ? true : false,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input prefix={<LockOutlined />} type="password" />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane key="superadmin" tab="Super Admin">
              <Form.Item
                name="superpassword"
                rules={[
                  {
                    required: type == "superadmin" ? true : false,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input prefix={<LockOutlined />} type="password" />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Form.Item>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
};
