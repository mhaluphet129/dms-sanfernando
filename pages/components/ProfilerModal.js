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
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import AddForm from "./Livelihood/AddForm";

export default () => {
  const [profileModal, setProfileModal] = useState(true);

  return (
    <Modal
      visible={profileModal}
      width={800}
      closable={false}
      title="Profile"
      onCancel={() => {
        setProfileModal(false);
      }}
    >
      <Row>
        <Col span={16}>
          <Row>
            <Col span={10}>
              <UserOutlined
                style={{
                  fontSize: 150,
                  color: "#aaa",
                  width: "100%",
                  textAlign: "center",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Typography.Text
                  type="secondary"
                  style={{
                    fontSize: 13,
                  }}
                >
                  id: 20210424-1324-2143
                </Typography.Text>
              </div>
              <Button style={{ width: "100%", marginBottom: 5 }}>
                View Full Profile
              </Button>
              <Button style={{ width: "100%", marginBottom: 5 }}>
                Edit Profile
              </Button>
              <Button style={{ width: "100%", marginBottom: 5 }}>
                Upload File
              </Button>
              <Button style={{ width: "100%", marginBottom: 5 }}>
                View Program
              </Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  width={150}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" //QR code ni sya
                />
              </div>
            </Col>
            <Col span={11} offset={1}>
              <Space
                direction="vertical"
                size="small"
                style={{ display: "flex" }}
              >
                <Typography.Text type="secondary">
                  Name: <br />
                  <Typography.Text strong>Xander Ford</Typography.Text>
                </Typography.Text>

                <Typography.Text type="secondary">
                  Address: <br />
                  <Typography.Text strong>
                    Monserrat Street corner Gaches Street, 2 Capricorn Building,
                    BF Homes, Paranaque City, Metro Manila
                  </Typography.Text>
                </Typography.Text>
                <Typography.Text type="secondary">
                  Contact Number: <br />{" "}
                  <Typography.Text strong>09271234567</Typography.Text>
                </Typography.Text>

                <Typography.Text type="secondary">
                  Livelihood:{" "}
                  <Typography.Text strong>
                    <Space>
                      <Tag color="green">Farmer</Tag>
                      <Tag color="cyan">Farmworker</Tag>
                      <Tag color="blue">Fisherfolk</Tag>
                    </Space>
                  </Typography.Text>
                </Typography.Text>
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
