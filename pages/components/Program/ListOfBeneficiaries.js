import { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Timeline,
  Image,
  Table,
} from "antd";

export default () => {
  const [programListModal, setprogramListModal] = useState(true);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date Availed",
      dataIndex: "availDate",
      key: "availDate",
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
      title: "Action",
      key: "action",
      render: (text) => (
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
      name: "Sandro Ehh",
      availDate: "Jan 26, 2019",
      address: "Ilocos Norte",
      contact: "09830376021",
    },
    {
      key: "2",
      name: "Bongbong Marcos",
      availDate: "Jan 26, 2019",
      address: "Ilocos Norte",
      contact: "09830376021",
    },
    {
      key: "3",
      name: "Sarah Duterte",
      availDate: "Jan 26, 2019",
      address: "Ilocos Norte",
      contact: "09830376021",
    },
  ];

  return (
    <Modal
      visible={programListModal}
      width={800}
      closable={false}
      title={
        <>
          <Row>
            <Col span={12}>
              <Typography.Title level={5}>Poor Peace Program</Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: 130, float: "right" }}
                onClick={() => alert("Add na!")}
              >
                Add Client
              </Button>{" "}
            </Col>
          </Row>{" "}
        </>
      }
      onCancel={() => {
        setprogramListModal(false);
      }}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
};
