import React, { useState } from "react";
import { Tabs, Button, Table, Space } from "antd";

import AddForm from "./AddForm";
export default () => {
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Programs",
      dataIndex: "programs",
      key: "programs",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      address: "New York No. 1 Lake Park",
      contact: "+630317577329",
      programs: "Poor Peace Program, Trabahong Tapat, Angat Buhay Lahat",
    },
    {
      key: "2",
      name: "John Brown",
      address: "New York No. 1 Lake Park",
      contact: "+630317577329",
      programs: "Poor Peace Program, Trabahong Tapat, Angat Buhay Lahat",
    },
    {
      key: "3",
      name: "John Brown",
      address: "New York No. 1 Lake Park",
      contact: "+630317577329",
      programs: "Poor Peace Program, Trabahong Tapat, Angat Buhay Lahat",
    },
  ];

  return (
    <>
      <AddForm visible={visible} setVisible={setVisible} />
      <Tabs
        defaultActiveKey="1"
        size="large"
        tabBarGutter={24}
        tabBarExtraContent={{
          right: (
            <Button style={{ width: 150 }} onClick={() => setVisible(true)}>
              Add
            </Button>
          ),
        }}
        destroyInactiveTabPane
      >
        <Tabs.TabPane tab="Farmer" key="1">
          NAOL
          <Table columns={columns} dataSource={data} />;
        </Tabs.TabPane>
        <Tabs.TabPane tab="Farmworker" key="2">
          Farmworker
          <Table columns={columns} dataSource={data} />;
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fisherfolk" key="3">
          Fisherfolk
          <Table columns={columns} dataSource={data} />;
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
