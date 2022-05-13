import React, { useState } from "react";
import { Tabs, Button, Table, Space, Typography } from "antd";

export default () => {
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: "Name of Program",
      dataIndex: "programname",
      key: "programname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date of Release",
      dataIndex: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "No. of Benificiaries",
      dataIndex: "noOfBenificiaries",
      key: "noOfBenificiaries",
    },
    {
      title: "Active?",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>View Program Details</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      programname: "Poor Peace Program",
      releaseDate: "Jan 26, 2019",
      noOfBenificiaries: "9,053",
      active: "Expired",
    },
    {
      key: "2",
      programname: "Trabahong Tapat",
      releaseDate: "Mar 21, 2020",
      noOfBenificiaries: "3,210",
      active: "Active",
    },
    {
      key: "3",
      programname: "Angat Buhay Lahat",
      releaseDate: "May 20, 2022",
      noOfBenificiaries: "7,500",
      active: "Active",
    },
  ];

  return (
    <>
      <Button
        style={{ width: 150, float: "right" }}
        onClick={() => setVisible(true)}
      >
        Add Program
      </Button>{" "}
      <br />
      <Table columns={columns} dataSource={data} />
    </>
  );
};
