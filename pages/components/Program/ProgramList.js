import React, { useState } from "react";
import {
  Badge,
  Button,
  Table,
  Space,
  Typography,
  Tooltip,
  Row,
  Col,
} from "antd";

export default () => {
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: "Name of Program",
      dataIndex: "programname",
      key: "programname",
      render: (text) => (
        <Tooltip title="Click to view program details.">
          <a>{text}</a>
        </Tooltip>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "No. of Benificiaries",
      dataIndex: "noOfBenificiaries",
      key: "noOfBenificiaries",
      render: (text) => (
        <Tooltip title="Click to view list.">
          <a>{text}</a>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text) =>
        text == "Active" ? (
          <Typography.Text type="success">
            <Badge status="success" />
            Active
          </Typography.Text>
        ) : (
          <Typography.Text type="danger">
            <Badge status="error" />
            Expired
          </Typography.Text>
        ),
    },
    {
      title: "Function",
      key: "function",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Remove</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      programname: "Poor Peace Program",
      dateCreated: "Jan 26, 2019",
      noOfBenificiaries: "9,053",
      active: "Expired",
    },
    {
      key: "2",
      programname: "Trabahong Tapat",
      dateCreated: "Mar 21, 2020",
      noOfBenificiaries: "3,210",
      active: "Active",
    },
    {
      key: "3",
      programname: "Angat Buhay Lahat",
      dateCreated: "May 20, 2022",
      noOfBenificiaries: "7,500",
      active: "Active",
    },
  ];

  return (
    <>
      <Row>
        <Col span={15}>
          <Row>
            <Col span={12}>
              <Typography.Title level={4}>List of Program</Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: 130, float: "right" }}
                onClick={() => setVisible(true)}
              >
                Add Program
              </Button>{" "}
            </Col>
          </Row>

          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};
