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
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import ListOfBeneficiaries from "./ListOfBeneficiaries";
import ViewProgam from "./ViewProgam";

export default () => {
  const [visible, setVisible] = useState(false);
  const [viewModal1, setViewModal1] = useState(false);
  const [mode1, setMode1] = useState("");
  const [addProgramModal, setAddProgramModal] = useState(false);
  const { TextArea } = Input;
  const columns = [
    {
      title: "Name of Program",
      dataIndex: "programname",
      key: "programname",
      render: (text) => (
        <Tooltip title="Click to view program details.">
          <Button
            type="link"
            onClick={() => {
              setViewModal1(true);
            }}
          >
            {text}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Program In-charge",
      dataIndex: "incharge",
      key: "incharge",
    },
    {
      title: "No. of Benificiaries",
      dataIndex: "noOfBenificiaries",
      key: "noOfBenificiaries",
      render: (text) => (
        <Tooltip title="Click to view list.">
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
            }}
          >
            {text}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text == "Active" ? (
          <Typography.Text type="success">Active</Typography.Text>
        ) : (
          <Typography.Text type="danger">Expired</Typography.Text>
        ),
    },
    {
      title: "Function",
      key: "function",
      render: (text, record) => (
        <Select
          //value={mode == "edit" ? data?.status : ""}
          placeholder={"Settings"}
        >
          <Select.Option value="active">
            <Button
              type="link"
              onClick={() => {
                setViewModal1(true);
                setMode1("edit");
              }}
            >
              Edit
            </Button>
          </Select.Option>
          <Select.Option value="expired">
            <Button type="link">Remove</Button>
          </Select.Option>
        </Select>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      programname: "Poor Peace Program",
      dateCreated: "Jan 26, 2019",
      incharge: "Ninoy Aquino",
      noOfBenificiaries: "9,053",
      status: "Expired",
    },
    {
      key: "2",
      programname: "Trabahong Tapat",
      dateCreated: "Mar 21, 2020",
      incharge: "Leni Robredo",
      noOfBenificiaries: "3,210",
      status: "Active",
    },
    {
      key: "3",
      programname: "Angat Buhay Lahat",
      dateCreated: "May 20, 2022",
      incharge: "Leni Robredo",
      noOfBenificiaries: "7,500",
      status: "Active",
    },
  ];

  return (
    <>
      <ListOfBeneficiaries
        programListModal={visible}
        setProgramListModal={setVisible}
      />

      <ViewProgam
        viewModal={viewModal1}
        setViewModal={setViewModal1}
        mode={mode1}
        setMode={setMode1}
      />
      <Row>
        <Col span={15}>
          <Row>
            <Col span={12}>
              <Typography.Title level={4}>List of Program</Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: 130, float: "right" }}
                onClick={() => setAddProgramModal(true)}
              >
                Add Program
              </Button>
              <Modal
                visible={addProgramModal}
                closable={false}
                title="Add Program"
                onCancel={() => {
                  setAddProgramModal(false);
                }}
                okText="Add"
                destroyOnClose={true}
              >
                <Form layout="vertical">
                  <Form.Item
                    label="Name of Program"
                    name="programname"
                    required={[{ required: true }]}
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    label="Program In-charge"
                    name="incharge"
                    required={[{ required: true }]}
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    required={[{ required: true }]}
                  >
                    <TextArea rows={6} allowClear />
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>

          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};
