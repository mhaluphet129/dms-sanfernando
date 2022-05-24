import React, { useState, useEffect } from "react";
import { Menu, Layout, message } from "antd";
import {
  ApartmentOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined,
  LoginOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Admin from "./Admin/Admin";
import Farmers from "./Livelihood";
import QRSample from "./QR";
import ProfilerModal from "./ProfilerModal";
import ProgramList from "./Program/ProgramList";
import Dashboard from "./Dashboard/Dashboard";
import VisitHistory from "./VisitHistory";
import EventHistory from "./EventHistory";
const { Sider } = Layout;

export default ({ setPage }) => {
  useEffect(
    () =>
      setPage({
        children: <Dashboard />,
      }),
    []
  );

  return (
    <Sider
      collapsible
      theme="light"
      style={{
        marginTop: 65,
      }}
    >
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          onClick={() => {
            setPage({
              children: <Dashboard />,
            });
          }}
          icon={<BarChartOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() =>
            setPage({
              children: <Admin />,
            })
          }
          icon={<TeamOutlined />}
        >
          Admins
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            setPage({
              children: <Farmers />,
            });
          }}
          icon={<ApartmentOutlined />}
        >
          Livelihood
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => {
            setPage({
              children: <ProgramList />,
            });
          }}
          icon={<DeploymentUnitOutlined />}
        >
          Program
        </Menu.Item>
        <Menu.SubMenu key="logs" title="Logs" icon={<LoginOutlined />}>
          <Menu.Item
            key="log1"
            onClick={() => {
              setPage({
                children: <VisitHistory />,
              });
            }}
          >
            Visit History
          </Menu.Item>
          <Menu.Item
            key="log2"
            onClick={() => {
              setPage({
                children: <EventHistory />,
              });
            }}
          >
            Event History
          </Menu.Item>
        </Menu.SubMenu>
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
