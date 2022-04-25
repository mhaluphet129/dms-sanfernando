import { useState, useEffect } from "react";
import { Menu, Layout, message } from "antd";

import Admin from "./Admin/Admin";
import QRSample from "./QR";
import Livelihood from "./Livelihood/AddForm";
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
