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
import ProgramList from "./Program/ProgramList";
import Dashboard from "./Dashboard/Dashboard";
import VisitHistory from "./VisitHistory";
import EventHistory from "./EventHistory";
import EditProgram from "./Program/ViewProgram";
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
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{
          fontSize: "1.25em",
        }}
      >
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
          key="3"
          onClick={() => {
            setPage({
              children: <Farmers />,
            });
          }}
          icon={<ApartmentOutlined />}
        >
          Profiles
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
        <Menu.Item
          key="log1"
          onClick={() => {
            setPage({
              children: <VisitHistory />,
            });
          }}
          icon={<LoginOutlined />}
        >
          Visit History
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
      </Menu>
    </Sider>
  );
};
