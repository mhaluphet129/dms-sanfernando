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
import axios from "axios";

import Page from "../components/Page";
import ProfilerModal from "../components/ProfilerModal";
import { SidePane } from "../components/Sider";

const { Content, Header } = Layout;
let socket;

export default () => {
  const [page, setPage] = useState();
  const [data, setData] = useState({});
  const [keyData, setKeyData] = useState();
  const [openProfiler, setOpenProfiler] = useState(false);
  const [profilerData, setProfilerData] = useState();

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
            // socket.emit("remove-system", key);
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
  }, []);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();
      socket.emit("get-key", { systemID: Cookies.get("key") });
      socket.on("on-get-key", (_key) => {
        if (_key.length == 0) message.error("Relogin");
        else setKeyData(_key);
      });

      socket.on("push-notify", (_key) => {
        if (Cookies.get("key") == _key)
          message.success("A new device is connected to this pc.");
      });

      socket.on("connected-to-system", (key, updatedKey) => {
        if (Cookies.get("key") == key) setKeyData(updatedKey);
      });

      socket.on("on-remove-device", ({ data }) => {
        if (data) setKeyData(data);
      });

      socket.on("on-open-profile", async ({ data, id }) => {
        if (
          data &&
          data[0].connected &&
          data[0].systemID == Cookies.get("key")
        ) {
          let { data } = await axios.get("/api/main", {
            params: { id },
          });
          if (data.success) {
            setProfilerData(data.data[0]);
            setOpenProfiler(true);
          }
        }
      });
    });
  }, []);

  return (
    <>
      <ProfilerModal
        data={profilerData}
        visible={openProfiler}
        setVisible={setOpenProfiler}
      />
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
                <Typography.Text
                  type='secondary'
                  onClick={() => console.log(keyData)}
                >
                  System Key:{" "}
                  <Typography.Text keyboard>
                    {keyData?.length > 0 ? keyData[0].systemID : ""}
                  </Typography.Text>
                </Typography.Text>
              </li>
              <li>
                <Typography.Text type='secondary'>
                  Device ID:
                  <Typography.Text keyboard>
                    {keyData?.length > 0 ? keyData[0].deviceID : ""}
                  </Typography.Text>
                </Typography.Text>
              </li>
              <li>
                <Typography.Text type='secondary'>
                  Status:{" "}
                  {keyData?.length > 0 && (
                    <Tag
                      color={
                        keyData[0].connected
                          ? "green"
                          : keyData[0].deviceID == null
                          ? "orange"
                          : "red"
                      }
                    >
                      {keyData?.length > 0 && keyData[0].connected
                        ? "Connected"
                        : keyData[0].deviceID == null
                        ? "No connection"
                        : "Not Connected"}
                    </Tag>
                  )}
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
    </>
  );
};
