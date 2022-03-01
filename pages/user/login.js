import { useState } from "react";
import Cookies from "js-cookie";
import { Form, Tabs, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons/lib/icons";
import axios from "axios";

export default () => {
  const [type, setType] = useState("admin");

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
    let { data } = await axios.post("/api/login", {
      payload,
    });
    if (data.success) {
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("loggedIn", "true");
      message.success(data.message);
      window.location.href = "/";
    } else message.error(data.message);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "auto",
        minHeight: "100vh",
      }}
    >
      <Typography.Title>Ngalan samo system</Typography.Title>
      <Form
        style={{ width: 255, padding: 30, boxShadow: "0 0 10px 3px" }}
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
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: type == "admin" ? true : false,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type='password' />
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane key='superadmin' tab='Super Admin'>
            <Form.Item
              name='superpassword'
              rules={[
                {
                  required: type == "superadmin" ? true : false,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type='password' />
            </Form.Item>
          </Tabs.TabPane>
        </Tabs>
        <Form.Item>
          <Button type='primary' style={{ width: "100%" }} htmlType='submit'>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
