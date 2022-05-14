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
  Tooltip,
} from "antd";

export default () => {
  const [programListModal, setprogramListModal] = useState(true);
  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title="Click to view full profile.">
          <a>{text}</a>
        </Tooltip>
      ),
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
      title: "Livelihood",
      dataIndex: "livelihood",
      key: "livelihood",
      render: (text) => (
        <Space direction="vertical">
          {text.map((el, i) => (
            <Tag key={i} color={color[el]}>
              {el}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Space size="middle">
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
      livelihood: ["Farmer", "Farmworker"],
    },
    {
      key: "2",
      name: "Bongbong Marcos",
      availDate: "Jan 26, 2019",
      address: "Ilocos Norte",
      contact: "09830376021",
      livelihood: ["Farmer", "Farmworker", "Fisherfolk"],
    },
    {
      key: "3",
      name: "Sarah Duterte",
      availDate: "Jan 26, 2019",
      address: "Ilocos Norte",
      contact: "09830376021",
      livelihood: ["Fisherfolk"],
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
      destroyOnClose={true}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
};
