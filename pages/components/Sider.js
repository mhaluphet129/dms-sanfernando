import React, { useState, useEffect } from "react";
import { Menu, Layout, message } from "antd";

import Admin from "./Admin/Admin";
import Farmers from "./Livelihood";
import QRSample from "./QR";
const { Sider } = Layout;

export const SidePane = ({ setPage }) => {
  return (
    <Sider
      collapsible
      theme='light'
      style={{
        marginTop: 65,
      }}
    >
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
        <Menu.Item
          key='3'
          onClick={() => {
            setPage({
              children: <Farmers />,
            });
          }}
        >
          Livelihood
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
