import React, { useState, useEffect } from "react";
import { Menu, Layout, message } from "antd";

import Admin from "./Admin/Admin";
import Farmers from "./Livelihood";
import QRSample from "./QR";
import ProfilerModal from "./ProfilerModal";
import ProgramList from "./Program/ProgramList";
import ListOfBeneficiaries from "./Program/ListOfBeneficiaries";
import ViewProgam from "./Program/ViewProgam";
const { Sider } = Layout;

export const SidePane = ({ setPage }) => {
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
              children: <QRSample />,
            });
          }}
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
        >
          Program
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={() => {
            setPage({
              children: <ListOfBeneficiaries />,
            });
          }}
        >
          List
        </Menu.Item>
        <Menu.Item
          key="6"
          onClick={() => {
            setPage({
              children: <ProfilerModal />,
            });
          }}
        >
          Profiler Modal
        </Menu.Item>
        <Menu.Item
          key="7"
          onClick={() => {
            setPage({
              children: <ViewProgam />,
            });
          }}
        >
          View Program
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
