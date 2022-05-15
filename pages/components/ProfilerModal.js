import { useState, useEffect } from "react";
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
  Badge,
} from "antd";
import QRCode from "qrcode";
import parse from "html-react-parser";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import ViewProfile from "./Livelihood/ViewProfile";
import TitleText from "../assets/js/TitleText";

export default ({ data, visible, setVisible }) => {
  const [profileVisible, setProfileVisible] = useState();
  const [qr, setQr] = useState();
  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  let columns = [
    {
      title: "status",
      align: "center",
      width: 80,
      render: () => <Badge status='success' />,
    },
    {
      title: "Program",
      render: (_, row) => row.name,
    },
  ];

  useEffect(() => {
    QRCode.toString(data?._id?.toString(), function (err, url) {
      setQr(parse(url || ""));
    });
  }, [visible]);
  return (
    <Modal
      visible={visible}
      width={800}
      closable={false}
      title={
        <>
          {data?.profile?.type.map((el, i) => (
            <Tag color={color[el]} key={i}>
              {el}
            </Tag>
          ))}
          <Space style={{ position: "absolute", right: 10 }}>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => {
                setProfileVisible(true);
                console.log(data);
              }}
            >
              View Full Profile
            </Button>
            <Button style={{ width: "100%", marginBottom: 5 }}>
              Edit Profile
            </Button>
          </Space>
        </>
      }
      onCancel={() => {
        setVisible(false);
      }}
    >
      {/* full details */}
      <ViewProfile
        profileVisible={profileVisible}
        setProfileVisible={setProfileVisible}
        info={data}
      />
      <Row>
        <Col span={16}>
          <Row>
            <Col span={10}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Badge.Ribbon
                  text={
                    data?.isActive ? (
                      <span>
                        <CheckOutlined /> Active
                      </span>
                    ) : (
                      <span>
                        <CloseOutlined /> Inactive
                      </span>
                    )
                  }
                  placement='start'
                  color={data?.isActive ? "green" : "red"}
                >
                  <Image
                    width={200}
                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' //QR code ni sya
                  />
                </Badge.Ribbon>
              </div>
              <div style={{ textAlign: "center" }}>
                <Typography.Text
                  type='secondary'
                  style={{
                    fontSize: 13,
                  }}
                >
                  id: {data?._id}
                </Typography.Text>
              </div>

              <Button style={{ width: "100%", marginBottom: 5 }}>
                Upload File
              </Button>
              <Button style={{ width: "100%", marginBottom: 5 }}>
                View Program
              </Button>
              <div>{qr}</div>
            </Col>
            <Col span={11} offset={1}>
              <Space
                direction='vertical'
                size='small'
                style={{ display: "flex" }}
              >
                <Typography.Text type='secondary'>
                  Name: <br />
                  <Typography.Text strong>
                    {TitleText(
                      `${data?.name?.name} ${data?.name?.middleName[0]}. ${data?.name?.lastName} ${data?.name?.extensionName}`
                    )}
                  </Typography.Text>
                </Typography.Text>

                <Typography.Text type='secondary'>
                  Address: <br />
                  <Typography.Text strong>
                    {TitleText(
                      `${data?.address?.street}, ${data?.address?.city}, ${data?.address?.province}`
                    )}
                  </Typography.Text>
                </Typography.Text>
                <Typography.Text type='secondary'>
                  Contact Number: <br />{" "}
                  <Typography.Text strong>{data?.contactNum}</Typography.Text>
                </Typography.Text>
                <Typography.Title level={5}>PROGRAMS</Typography.Title>
                <Table
                  scroll={{ y: 250 }}
                  columns={columns}
                  pagination={false}
                  dataSource={[
                    { name: "poor peace" },
                    { name: "poor peace" },
                    { name: "poor peace" },
                    { name: "poor peace" },
                    { name: "poor peace" },
                    { name: "poor peace" },
                  ]}
                />
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ backgroundColor: "#eee" }}>
          <Typography.Title
            level={5}
            style={{
              textAlign: "center",
            }}
          >
            Log History
          </Typography.Title>{" "}
          <Timeline
            style={{
              overflowY: "scroll",
              height: 430,
              width: 250,
              paddingTop: 10,
              paddingLeft: 10,
            }}
          >
            <Timeline.Item>
              2022-09-01 <br />
              Create a services site{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Solve initial network problems
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Technical testing{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Network problems being solved
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Create a services site{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Solve initial network problems
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Technical testing{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Network problems being solved
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Create a services site{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Solve initial network problems
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Technical testing{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Network problems being solved
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Create a services site{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Solve initial network problems
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Technical testing{" "}
            </Timeline.Item>
            <Timeline.Item>
              2022-09-01 <br />
              Network problems being solved
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </Modal>
  );
};
