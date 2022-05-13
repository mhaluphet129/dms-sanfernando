import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Typography,
  Button,
  Dropdown,
  Menu,
  Popconfirm,
} from "antd";
import CustomModal from "./FarmParcelModal";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default ({ data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    [
      {
        title: "Farm Parcel No.",
        width: 200,
        render: () => "-",
      },
      {
        title: (
          <span>
            Farm Land Description{" "}
            {data.length == 0 ? (
              <Typography.Text type='secondary'>(Example form)</Typography.Text>
            ) : (
              ""
            )}
          </span>
        ),
        render: (_, row, index) => (
          <>
            <CustomModal
              visible={modalOpen}
              setVisible={setModalOpen}
              pushData={(e) => setData([...data, e])}
            />
            {data.length == 0 ? (
              <div style={{ padding: 10 }}>
                <Row>
                  <Col
                    span={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography.Text>Location: </Typography.Text>
                    <Typography.Text>Ownership Document: </Typography.Text>
                    <Typography.Text>Ownership: </Typography.Text>
                    <Typography.Text>Name of Land Owner: </Typography.Text>
                  </Col>
                  <Col
                    spamn={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography.Text>Total Farm Area: </Typography.Text>
                    <Typography.Text>Ownership Document no: </Typography.Text>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col span={24}>
                    <Table
                      columns={columns[1]}
                      dataSource={[null]}
                      pagination={false}
                      style={{ border: "1px solid #aaa" }}
                      bordered
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                  <Col span={24}>
                    <Table
                      columns={columns[2]}
                      dataSource={[null]}
                      pagination={false}
                      style={{ border: "1px solid #aaa" }}
                      bordered
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <div
                style={{
                  background: "#eee",
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <Row>
                  <Col
                    span={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography.Text>
                      Location:{" "}
                      <span style={{ fontWeight: 900 }}>{row.loc || ""}</span>
                    </Typography.Text>
                    <Typography.Text>
                      Ownership Document:{" "}
                      <span style={{ fontWeight: 900 }}>
                        {row.docType || ""}
                      </span>
                    </Typography.Text>
                    <Typography.Text>
                      Ownership:{" "}
                      <span style={{ fontWeight: 900 }}>
                        {row.owner.type || ""}
                      </span>
                    </Typography.Text>
                    <Typography.Text>
                      Name of Land Owner:{" "}
                      <span style={{ fontWeight: 900 }}>
                        {row.owner.data || "N/A"}
                      </span>
                    </Typography.Text>
                  </Col>
                  <Col
                    push={2}
                    span={10}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography.Text>
                      Total Farm Area:{" "}
                      <span style={{ fontWeight: 900 }}>
                        {row.totalArea || ""}
                      </span>
                    </Typography.Text>
                    <Typography.Text>
                      Ownership Document no:{" "}
                      <span style={{ fontWeight: 900 }}>
                        {row.docNum || ""}
                      </span>
                    </Typography.Text>
                  </Col>
                  <Col
                    span={2}
                    style={{
                      display: "flex",
                      height: 0,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key={1}>
                            <EditOutlined /> Edit
                          </Menu.Item>
                          <Menu.Item key={2}>
                            <Popconfirm
                              title='Are you sure to delete this parcel?'
                              okText='Yes'
                              cancelText='No'
                              onConfirm={() =>
                                setData(data.filter((_, _i) => _i != index))
                              }
                            >
                              <Typography.Text type='danger'>
                                <DeleteOutlined /> Delete
                              </Typography.Text>
                            </Popconfirm>
                          </Menu.Item>
                        </Menu>
                      }
                      placement='bottomRight'
                    >
                      <MoreOutlined />
                    </Dropdown>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col span={24}>
                    <Table
                      columns={columns[1]}
                      dataSource={row.arr1.length == 0 ? [null] : row.arr1}
                      pagination={false}
                      style={{ border: "1px solid #aaa" }}
                      bordered
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                  <Col span={24}>
                    <Table
                      columns={columns[2]}
                      dataSource={row.arr2.length == 0 ? [null] : row.arr2}
                      pagination={false}
                      style={{ border: "1px solid #aaa" }}
                      bordered
                    />
                  </Col>
                </Row>
              </div>
            )}

            <Row>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: 5,
                }}
              >
                <Button onClick={() => setModalOpen(true)}>Add Parcel</Button>
              </div>
            </Row>
          </>
        ),
      },
    ],
    [
      {
        title: "Crop",
        render: (_) => <Typography.Text>{_?.crop}</Typography.Text>,
      },
      {
        title: "Farm Type",
        width: 200,
        align: "center",
        render: (_) => <Typography.Text>{_?.farmtype}</Typography.Text>,
      },
      {
        title: "Size (ha)",
        width: 150,
        align: "center",
        render: (_) => <Typography.Text>{_?.size}</Typography.Text>,
      },
      {
        title: "Organic Practioner (Y/N) ?",
        width: 250,
        render: (_) => (
          <Typography.Text>
            {_?.bool ? (_?.bool ? "Yes" : "No") : ""}
          </Typography.Text>
        ),
      },
    ],
    [
      {
        title: "Livestock/Poultry",
        render: (_) => <Typography.Text>{_?.livestock}</Typography.Text>,
      },
      {
        title: "No. of head",
        width: 150,
        align: "center",
        render: (_) => <Typography.Text>{_?.noOfhead}</Typography.Text>,
      },
      {
        title: "Organic Practioner (Y/N) ?",
        width: 250,
        render: (_) => (
          <Typography.Text>
            {_?.bool ? (_?.bool ? "Yes" : "No") : ""}
          </Typography.Text>
        ),
      },
    ],
  ];
  return (
    <Table
      columns={columns[0]}
      dataSource={data.length == 0 ? [null] : data}
      pagination={false}
      bordered
    />
  );
};
