import React, { useState, useEffect } from "react";
import { Menu, Layout, message } from "antd";

import Admin from "./Admin/Admin";
import Farmers from "./Livelihood";
import QRSample from "./QR";
import ProfilerModal from "./ProfilerModal";
import ProgramList from "./Program/ProgramList";
import Dashboard from "./Dashboard/Dashboard";
import LogHistory from "./LogHistory";
const { Sider } = Layout;

export default ({ setPage }) => {
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
              children: <Dashboard />,
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
        <Menu.Item
          key='4'
          onClick={() => {
            setPage({
              children: <ProgramList />,
            });
          }}
        >
          Program
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={() => {
            setPage({
              children: <LogHistory />,
            });
          }}
        >
          Log History
        </Menu.Item>
        <Menu.Item
          key="6"
          onClick={() => {
            setPage({
              children: <QRSample />,
            });
          }}
        >
          Scan
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
