import React from "react";
import {
  Button,
  Table,
  Typography,
  Tooltip,
  Row,
  Col,
  Popconfirm,
  notification,
} from "antd";

export default () => {
  const columns = [
    {
      title: "Date and Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title="Click to view full profile.">
          <Button type="link">{text}</Button>
        </Tooltip>
      ),
    },
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
    },
  ];

  const logData = [
    {
      key: "1",
      dateTime: "March 09, 2022 | 10:45 am",
      name: "Levian Limbaga",
      barangay: "Bonacao",
    },
    {
      key: "2",
      dateTime: "March 09, 2022 | 10:40 am",
      name: "Vian Limbaga",
      barangay: "Bonacao",
    },
    {
      key: "3",
      dateTime: "March 09, 2022 | 10:38 am",
      name: "Janice Mambajao",
      barangay: "Kawayan",
    },
    {
      key: "4",
      dateTime: "March 09, 2022 | 10:15 am",
      name: "Quinn Rosario",
      barangay: "Palacpacan",
    },
    {
      key: "5",
      dateTime: "March 09, 2022 | 10:13 am",
      name: "Roxanne Aguilar",
      barangay: "Tugop",
    },
    {
      key: "6",
      dateTime: "March 09, 2022 | 10:08 am",
      name: "Harlan Santiago",
      barangay: "Kawayan",
    },
  ];

  return (
    <>
      <Row>
        <Typography.Title level={4}>Log History</Typography.Title>
      </Row>
      <Table columns={columns} dataSource={logData} scroll={{ y: 500 }} />
    </>
  );
};
