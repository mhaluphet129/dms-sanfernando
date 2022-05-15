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
  Search,
  Input,
} from "antd";

export default ({ programListModal, setProgramListModal }) => {
  const [addClientModal, setAddClientModal] = useState(false);
  const { Search } = Input;
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
    /* modal for list of beneficiaries */
    <Modal
      visible={programListModal}
      width={800}
      closable={false}
      okButtonProps={{ style: { display: "none" } }}
      title={
        <>
          <Row>
            <Col span={12}>
              <Typography.Title level={5}>Poor Peace Program</Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: 130, float: "right" }}
                onClick={() => setAddClientModal(true)}
              >
                Add Client
              </Button>{" "}
            </Col>
          </Row>{" "}
        </>
      }
      onCancel={() => {
        setProgramListModal(false);
      }}
      destroyOnClose={true}
    >
      <Table columns={columns} dataSource={data} />

      {/* modal to add client*/}
      <Modal
        visible={addClientModal}
        width={500}
        closable={false}
        title="Add CLient"
        destroyOnClose
        onCancel={() => {
          setAddClientModal(false);
        }}
        okText="Add"
      >
        <Space
          direction="vertical"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button style={{ width: 130 }} onClick={() => alert("scan QR")}>
            Scan QR
          </Button>{" "}
          <Typography.Text style={{ textAlign: "center" }}>Or</Typography.Text>
          <Search
            placeholder="Input client name"
            allowClear
            enterButton="Search"
            size="large"
          />
        </Space>
      </Modal>
      {/* end add client modal */}
    </Modal>
  );
};
