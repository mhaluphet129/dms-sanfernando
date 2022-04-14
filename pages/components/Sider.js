import { useEffect } from "react";
import { Menu, Layout, Typography, Row, Col } from "antd";
import io from "socket.io-client";

import Admin from "./Admin/Admin";
// import Dashboard from "./dashboard";
import QRSample from "./QR";
import Livelihood from "./Livelihood/AddForm";
const { Sider } = Layout;

let socket;

export const SidePane = ({ setPage }) => {
  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.on("connect", () => {
        console.log("socket connection established");
      });

      socket.on("alert", (data) => {
        alert(data);
      });

      socket.on("disconnect", () => {
        console.log("socket connection is disconnected");
      });
    });
  }, []);

  return (
    <Sider collapsible theme='light'>
      <div
        style={{
          width: "90%",
          margin: "3% 5%",
          textAlign: "center",
          backgroundColor: "#eee",
          paddingBottom: 30,
          paddingTop: 30,
        }}
      >
        <Typography.Text keyboard>LOGO</Typography.Text>
      </div>
      <Menu defaultSelectedKeys={["1"]} mode='inline'>
        <Menu.Item
          key='1'
          onClick={() => {
            setPage({
              children: <QRSample />,
            });
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key='2'
          onClick={() =>
            setPage({
              children: <Admin />,
            })
          }
        >
          Admins
        </Menu.Item>
        <Menu.SubMenu key='3' title='Clients'>
          <Menu.Item key='a'>Farmers</Menu.Item>
          <Menu.Item key='b'>Fisheries</Menu.Item>
          <Menu.Item
            key='c'
            onClick={() => {
              setPage({
                children: (
                  <div style={{ margin: 10 }}>
                    <Livelihood />
                  </div>
                ),
              });
            }}
          >
            Add
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};
