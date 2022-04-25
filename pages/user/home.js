import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Avatar,
  Dropdown,
  Menu,
  Button,
  Tag,
  message,
} from "antd";
import Cookies from "js-cookie";
import io from "socket.io-client";

import Page from "../components/Page";
import { SidePane } from "../components/Sider";

const { Content, Header } = Layout;
let socket;

export default () => {
  const [page, setPage] = useState();
  const [data, setData] = useState({});
  const [key, setKey] = useState();
  const [keyData, setKeyData] = useState({});

  const menu = () => (
    <Menu>
      <Menu.Item style={{ marginTop: 10, marginBottom: 10 }}>
        <Typography.Text type='secondary'>
          {data.name && data.name.charAt(0).toUpperCase() + data.name.slice(1)}{" "}
          {data.lastname &&
            data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1)}
        </Typography.Text>
      </Menu.Item>
      <Menu.Item key='2'>
        <Button
          type='text'
          onClick={() => {
            console.log(keyData);
          }}
        >
          Account Settings
        </Button>
      </Menu.Item>
      <Menu.Item key='3'>
        <Button
          type='text'
          danger
          onClick={() => {
            Cookies.remove("user");
            Cookies.set("loggedIn", "false");
            socket.emit("remove-system-key", key);
            window.location.href = "/user/login";
          }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setData(JSON.parse(Cookies.get("user"))[0]);
    setKey(Cookies.get("key"));
  }, []);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.emit("get-keys", Cookies.get("key"));

      socket.on("get-key", (_key) => {
        if (_key.length == 0) message.error("Error in server sockets");
        else setKeyData(_key);
      });

      socket.on("push-notify", (_key) => {
        if (Cookies.get("key") == _key)
          message.success("A new device is connected to this pc.");
      });
    });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#eee",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div style={{ lineHeight: 1.3, marginTop: 20, marginLeft: -80 }}>
          <ul style={{ listStyle: "none" }}>
            <li>
              <Typography.Text type='secondary'>
                System Key: <Typography.Text keyboard>{key}</Typography.Text>
              </Typography.Text>
            </li>
            <li>
              <Typography.Text type='secondary'>
                Device ID Connected:
                <Typography.Text keyboard>
                  {keyData[0]?.deviceId ? keyData[0].deviceId : ""}
                </Typography.Text>
              </Typography.Text>
            </li>
            <li>
              <Typography.Text type='secondary'>
                Status:{" "}
                <Tag color={keyData[0]?.deviceId ? "green" : "red"}>
                  {keyData[0]?.deviceId ? "Connected" : "Not Connected"}
                </Tag>
              </Typography.Text>
            </li>
          </ul>
        </div>

        <Dropdown overlay={menu}>
          <Avatar
            size='large'
            style={{ marginLeft: "auto", cursor: "pointer" }}
          >
            {data.name && data.name[0].toUpperCase()}
            {data.lastname && data.lastname[0].toUpperCase()}
          </Avatar>
        </Dropdown>
      </Header>

      <SidePane setPage={setPage} />
      <Content style={{ overflowY: "scroll", marginTop: 65 }}>
        <Page {...page} />
      </Content>
    </Layout>
  );
};
