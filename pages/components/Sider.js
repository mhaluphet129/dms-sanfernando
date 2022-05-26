import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  ApartmentOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined,
  LoginOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Cookie from "js-cookie";

import Admin from "./Admin/Admin";
import Farmers from "./Livelihood";
import QRSample from "./QR";
import ProgramList from "./Program/ProgramList";
import Dashboard from "./Dashboard/Dashboard";
import VisitHistory from "./VisitHistory";
import EventHistory from "./EventHistory";
import EditProgram from "./Program/EditProgram";
const { Sider } = Layout;

export default ({ setPage }) => {
  const [role, setRole] = useState();
  useEffect(() => {
    setPage({
      children: <Dashboard />,
    });
    setRole(JSON.parse(Cookie.get("user")).role);
  }, []);

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
        {role == "superadmin" ? (
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
        ) : null}
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
        <Menu.Item
          key="7"
          onClick={() => {
            setPage({
              children: <EditProgram />,
            });
          }}
        >
          ViewProgram
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
