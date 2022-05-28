import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Input,
  Select,
  Space,
  Table,
  Button,
  Form,
  InputNumber,
  Radio,
  Alert,
  message,
} from "antd";
import { PlusOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";

import jason from "../../assets/json/index";

const label2 = (doc, loader, bool) => {
  if (doc == undefined || bool) return "Check";
  if (doc != undefined && loader == "check-docnum") return "";
  if (doc == true && loader == "")
    return (
      <Typography.Text type='danger'>
        <CloseOutlined /> Invalid
      </Typography.Text>
    );
  if (doc == false && loader == "")
    return (
      <Typography.Text type='success'>
        <CheckOutlined /> Valid
      </Typography.Text>
    );
};

export default ({ visible, setVisible, pushData }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loader, setLoader] = useState("");
  const [docStatus, setDocStatus] = useState();
  const [doc, docChange] = useState(false);
  const [docname, setDocname] = useState("");

  const [data, setData] = useState({
    loc: "",
    docType: "",
    totalArea: 0,
    docNum: "",
    owner: {
      type: "Registered Owner",
      data: "",
    },
    arr1: [],
    arr2: [],
  });

  // for farmlandinfo
  const [docNum, setDocNum] = useState();

  const columns = [
    [
      {
        render: (_, row, i) => {
          if (row?.bool != null) {
            return (
              <Button
                type='text'
                onClick={() => {
                  setData((el) => ({
                    ...el,
                    arr1: el.arr1.filter((__, _i) => i != _i),
                  }));
                }}
                danger
              >
                remove
              </Button>
            );
          }
        },
        width: 25,
      },
      {
        title: "Crop/Commodity",
        render: (_, row) => <Typography.Text>{row?.crop}</Typography.Text>,
      },
      {
        title: "Size (ha)",
        render: (_, row) => <Typography.Text>{row?.size}</Typography.Text>,
      },
      {
        title: "Farm Type",
        align: "center",
        render: (_, row) => <Typography.Text>{row?.farmtype}</Typography.Text>,
      },
      {
        title: (
          <Typography.Text>
            Organic Pratitioner <br />
            (y/n)
          </Typography.Text>
        ),
        align: "center",
        render: (_, row) => (
          <Typography.Text>
            {row?.bool ? "Yes" : row?.bool == false ? "No" : ""}
          </Typography.Text>
        ),
        width: 200,
      },
    ],
    [
      {
        render: (_, row, i) => {
          if (row?.bool != null) {
            return (
              <Button
                type='text'
                onClick={() => {
                  setData((el) => ({
                    ...el,
                    arr2: el.arr2.filter((__, _i) => i != _i),
                  }));
                }}
                danger
              >
                remove
              </Button>
            );
          }
        },
        width: 25,
      },
      {
        title: "Livestock/Poultry",
        render: (_, row) => <Typography.Text>{row?.livestock}</Typography.Text>,
      },
      {
        title: "No. of head",
        align: "center",
        render: (_, row) => <Typography.Text>{row?.noOfhead}</Typography.Text>,
      },
      {
        title: (
          <Typography.Text>
            Organic Pratitioner <br />
            (y/n)
          </Typography.Text>
        ),
        align: "center",
        render: (_, row) => (
          <Typography.Text>
            {row?.bool ? "Yes" : row?.bool == false ? "No" : ""}
          </Typography.Text>
        ),
        width: 200,
      },
    ],
  ];

  return (
    <>
      <Modal
        visible={visible1}
        onCancel={() => setVisible1(false)}
        closable={false}
        footer={false}
        destroyOnClose
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(e) => {
            setData((el) => ({
              ...el,
              arr1: [...el.arr1, e],
            }));
            setVisible1(false);
          }}
        >
          <Form.Item
            name='crop'
            label='Crop/Commodity'
            rules={[{ required: true, message: "This field is blank." }]}
          >
            <Input style={{ width: "70%" }} allowClear />
          </Form.Item>
          <Form.Item
            name='size'
            label='Size (ha)'
            rules={[{ required: true, message: "This field is blank." }]}
          >
            <InputNumber controls={false} style={{ width: "30%" }} />
          </Form.Item>
          <Form.Item
            name='farmtype'
            label='Farm Type'
            rules={[{ required: true, message: "This field is blank." }]}
          >
            <Select
              placeholder='Select a farm type'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{
                width: "70%",
              }}
            >
              <Select.Option key='1' value='irrigated'>
                1. Irrigated
              </Select.Option>
              <Select.Option key='2' value='rainfedUpland'>
                2. Rainfed Upland
              </Select.Option>
              <Select.Option key='3' value='rainfedLowland'>
                3. Rainfed Lowland
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='Organic Practioner?'
            name='bool'
            rules={[{ required: true, message: "Must select one." }]}
          >
            <Radio.Group>
              <Radio value={true} key={1}>
                Yes
              </Radio>
              <Radio value={false} key={2}>
                No
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className='submit' wrapperCol={{ offset: 16 }}>
            <Button type='primary' htmlType='submit' style={{ width: 150 }}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visible2}
        onCancel={() => setVisible2(false)}
        closable={false}
        footer={false}
        destroyOnClose
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(e) => {
            setData((el) => ({
              ...el,
              arr2: [...el.arr2, e],
            }));
            setVisible2(false);
          }}
        >
          <Form.Item
            name='livestock'
            label='Livestock/Poultry'
            rules={[{ required: true, message: "This field is blank." }]}
          >
            <Input style={{ width: "70%" }} allowClear />
          </Form.Item>
          <Form.Item
            name='noOfhead'
            label='No. of Head'
            rules={[{ required: true, message: "This field is blank." }]}
          >
            <InputNumber controls={false} style={{ width: "30%" }} allowClear />
          </Form.Item>
          <Form.Item
            label='Organic Practioner?'
            name='bool'
            rules={[{ required: true, message: "Must select one." }]}
          >
            <Radio.Group>
              <Radio value={true} key={1}>
                Yes
              </Radio>
              <Radio value={false} key={2}>
                No
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className='submit' wrapperCol={{ offset: 16 }}>
            <Button type='primary' htmlType='submit' style={{ width: 150 }}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* START ADD FORM HERE */}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title='Farm Land Description'
        footer={null}
        width={800}
      >
        <Form
          layout='vertical'
          onFinish={(val) => {
            let sum = data.arr1.reduce((prev, curr) => prev + curr?.size, 0);
            if (sum > val.totalArea) {
              message.warn("Crops/Commodity land area exceed the total area.");
              return;
            }
            console.log(val);
            console.log(data);
            if (docStatus) {
              message.warn("Document number is invalid.");
              return;
            }
            if (docStatus == undefined) {
              message.warn("Please check your document number validity first.");
              return;
            }
            if (
              data?.owner.type != "Registered Owner" &&
              data?.owner.data == ""
            ) {
              message.error("Please fill up the name of land Owner.");
              return;
            }

            pushData(data);
            setVisible(false);
          }}
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Space direction='vertical'>
                <Form.Item
                  name='location'
                  label='Barangay'
                  rules={[{ required: true, message: "This field is empty" }]}
                >
                  <Select
                    onChange={(e) =>
                      setData((el) => ({
                        ...el,
                        loc: e,
                      }))
                    }
                  >
                    {jason.barangays.map((el) => (
                      <Select.Option value={el}>{el}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name='ownDoc'
                  label='Ownership Document'
                  rules={[{ required: true, message: "This field is empty" }]}
                >
                  <Select
                    showSearch
                    placeholder='Select a document'
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{
                      width: 250,
                    }}
                    onChange={(e) => {
                      setDocname(e);
                      setDocStatus();
                      setData((el) => ({
                        ...el,
                        docType: e,
                      }));
                    }}
                  >
                    {jason.docType.map((el, i) => (
                      <Select.Option key={i} value={el}>{`${
                        i + 1
                      }. ${el}`}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Space>
            </Col>
            <Col span={8} push={1} offset={1}>
              <Space direction='vertical'>
                <Form.Item
                  name='totalArea'
                  label='Total Farm Area (ha):'
                  rules={[{ required: true, message: "This field is empty" }]}
                >
                  <InputNumber
                    onChange={(e) => {
                      setData((el) => ({ ...el, totalArea: e }));
                    }}
                    controls={false}
                    style={{
                      width: "100%",
                    }}
                    allowClear
                  />
                </Form.Item>
                <Form.Item name='ownDocNum' label='Ownership Document No.'>
                  <Input.Group compact>
                    <Input
                      onChange={(e) => {
                        setData((el) => ({
                          ...el,
                          docNum: e.target.value,
                        }));
                        docChange(true);
                        setDocStatus();
                      }}
                      style={{
                        width: "calc(100% - 100px)",
                      }}
                      status={docStatus ? "error" : ""}
                      allowClear
                    />
                    <Button
                      loading={loader == "check-docnum"}
                      onClick={async () => {
                        if (data?.docNum != "" && data?.docNum != undefined) {
                          console.log(data?.docNum);
                          setLoader("check-docnum");
                          docChange(false);
                          let a = await axios.get("/api/livelihood", {
                            params: {
                              mode: "check",
                              docnum: data?.docNum,
                              docname,
                            },
                          });
                          if (a?.data) {
                            setDocStatus(a?.data.success);
                            setLoader("");

                            if (a?.data.success) {
                              message.error(
                                `Reason: Already registered as ${a?.data.type} by ${a?.data.name}`
                              );
                            }
                          }
                        } else message.error("Input document number");
                      }}
                    >
                      {label2(docStatus, loader, doc)}
                    </Button>
                  </Input.Group>
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col span={12}>
              <Radio.Group
                defaultValue='Registered Owner'
                onChange={(e) =>
                  setData((el) => ({
                    ...el,
                    owner: {
                      type: e.target.value,
                      data: "",
                    },
                  }))
                }
              >
                <Space direction='vertical'>
                  <Radio value='Registered Owner' key={1}>
                    Registered Owner
                  </Radio>
                  <Radio value='tenant' key={2}>
                    Tenant <br />
                    {data.owner.type == "tenant" && (
                      <Input
                        style={{ width: 300 }}
                        placeholder='Name of Land Owner'
                        onChange={(e) =>
                          setData((el) => ({
                            ...el,
                            owner: {
                              type: "tenant",
                              data: e.target.value,
                            },
                          }))
                        }
                        allowClear
                      />
                    )}
                  </Radio>
                  <Radio value='lessee' key={3}>
                    Lessee <br />
                    {data.owner.type == "lessee" && (
                      <Input
                        style={{ width: 300 }}
                        placeholder='Name of Land Owner'
                        onChange={(e) =>
                          setData((el) => ({
                            ...el,
                            owner: {
                              type: "lessee",
                              data: e.target.value,
                            },
                          }))
                        }
                        allowClear
                      />
                    )}
                  </Radio>
                  <Radio value='others' key={4}>
                    Others <br />
                    {data.owner.type == "others" && (
                      <Input style={{ width: 300 }} allowClear />
                    )}
                  </Radio>
                </Space>
              </Radio.Group>
            </Col>
          </Row>
          {/* FORM END HERE */}
          <Row
            style={{
              width: "100%",
              display: "flex",
              marginTop: 10,
              flexDirection: "column",
            }}
          >
            <Table
              columns={columns[0]}
              dataSource={data.arr1.length != 0 ? data.arr1 : [null]}
              style={{ width: "100%" }}
              pagination={false}
              bordered
            />
            <Button
              style={{ alignSelf: "flex-end", marginTop: 5 }}
              onClick={() => setVisible1(true)}
            >
              ADD <PlusOutlined />
            </Button>
          </Row>
          <Row
            style={{
              width: "100%",
              display: "flex",
              marginTop: 10,
              flexDirection: "column",
            }}
          >
            <Table
              columns={columns[1]}
              dataSource={data.arr2.length != 0 ? data.arr2 : [null]}
              pagination={false}
              style={{ width: "100%", marginTop: 5 }}
              bordered
            />
            <Button
              style={{ alignSelf: "flex-end", marginTop: 5 }}
              onClick={() => setVisible2(true)}
            >
              ADD <PlusOutlined />
            </Button>
          </Row>
          <br />
          <Form.Item
            className='submit'
            style={{
              width: "100%",
            }}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{ width: 150, position: "absolute", right: 0, top: 0 }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
