import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Divider,
  Button,
  Space,
  Modal,
  Steps,
  DatePicker,
  Radio,
  Table,
  Checkbox,
  InputNumber,
  Upload,
  Typography,
  Tag,
  Avatar,
  Image,
  List,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

export default ({ profileVisible, setProfileVisible }) => {
  const [current, setCurrent] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [isHead, setIsHead] = useState(true);
  const [maxCount, setMaxCount] = useState(false);
  const { Step } = Steps;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [otherInfo, setOtherInfo] = useState({
    isPWD: false,
    is4Ps: false,
    isIP: {
      status: false,
      name: "",
    },
    hasID: {
      status: false,
      name: "",
    },
    isMember: {
      status: false,
      name: "",
    },
    farmer: {
      status: false,
      crops: {
        status: false,
        data: [],
      },
      livestock: {
        status: false,
        data: [],
      },
      poultry: {
        status: false,
        data: [],
      },
    },
    farmworker: {
      status: false,
      data: [],
    },
    fisherfolk: {
      status: false,
      data: [],
    },
  });

  // columns and data for other info.
  const columns = [
    {
      dataIndex: "Question",
      key: "Question",
    },
    {
      dataIndex: "YesNo",
      key: "YesNo",
    },
    {
      dataIndex: "Specify",
      key: "Specify",
    },
  ];
  const data = [
    {
      key: "1",
      Question: "Person With Disability (PWD)?",
      YesNo: "No",
    },
    {
      key: "2",
      Question: "4P's Beneficiary?",
      YesNo: "No",
    },
    {
      key: "3",
      Question: "Member of Indigenous Group?",
      YesNo: "Yes",
      Specify: "Talaandig",
    },
    {
      key: "4",
      Question: "With Government ID?",
      YesNo: "Yes",
      Specify: "0028-1215160-9",
    },
    {
      key: "5",
      Question: "Member of any Farmer Association/Cooperation?",
      YesNo: "Yes",
      Specify: "Organic Farmer Association",
    },
  ];

  //data for Type of farmer Activity
  const farmerActivity = [
    "Crops: Rice, Corn, Sugarcane",
    "Livestock: Cow, Carabao, Pig",
    "Poultry: Chicken, Duck",
  ];

  // data for Kind of Work (farmworker)
  const farmworkerActivity = [
    "Land Preparation",
    "Planting/Transplanting",
    "Cultivation",
    "Harvesting",
    "Other work",
  ];

  //data for Type of Fishing Activity
  const fishingActivity = [
    "Fish Capture",
    "Fish Processing",
    "Fish Vending",
    "Aquaculture",
    "Gleaning",
    "Other work",
  ];

  //HANDLERS NI BEBE *mwah*
  const handleChange = (current) => {
    setCurrent(current);
    console.log(otherInfo);
  };

  const handleNext = () => {
    if (current < 2) setCurrent(current + 1);
    else alert("add me");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <Modal
      visible={profileVisible}
      width={800}
      onCancel={() => {
        setProfileVisible(false);
        setCurrent(0);
      }}
      footer={null}
      destroyOnClose
    >
      <div>
        <Row>
          <Col span={18} push={6}>
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              <Typography.Text strong>Xander Ford</Typography.Text>
              <Typography.Text strong>
                <Space>
                  <Tag color="green">Farmer</Tag>
                  <Tag color="cyan">Farmworker</Tag>
                  <Tag color="blue">Fisherfolk</Tag>
                </Space>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                size={150}
                icon="user"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" //QR code ni sya
              />
            </div>
          </Col>
        </Row>
        <Divider />
      </div>
      <Steps size="small" current={current} progressDot onChange={handleChange}>
        <Step title="Part I" description="Personal Information" />
        <Step title="Part II" description="Farm Profile" />
        <Step title="Part III" description="Scanned Documents" />
      </Steps>
      <Divider />

      <div style={{ display: current != 0 ? "none" : null }}>
        <Row>
          {/* Name and Gender */}
          <Col span={18} push={6}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Full Name: <br />
                <Typography.Text strong>Xander Kalapanget Ford</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Gender: <br />
                <Typography.Text strong>Male</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Name and Gender</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Address Details */}
          <Col span={18} push={6}>
            <Typography.Text type="secondary">
              Address: <br />
              <Typography.Text strong>
                Monserrat Street corner Gaches Street, 2 Capricorn Building, BF
                Homes, Paranaque City, Metro Manila
              </Typography.Text>
            </Typography.Text>
          </Col>
          <Col span={6} pull={18}>
            <strong>Address Details</strong>
          </Col>
        </Row>

        <Divider />

        <Row>
          {/* Contact */}
          <Col span={18} push={6}>
            <Typography.Text type="secondary">
              Contact Number: <br />
              <Typography.Text strong>09271234567</Typography.Text>
            </Typography.Text>
          </Col>
          <Col span={6} pull={18}>
            <strong>Contact</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Birth */}
          <Col span={18} push={6}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Date of Birth: <br />
                <Typography.Text strong>January 15, 2000</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Place of Birth: <br />
                <Typography.Text strong>
                  Paranaque City, Metro Manila
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Birth</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Status */}
          <Col span={18} push={6}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Civil Status: <br />
                <Typography.Text strong>Married</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Name of Spouse: <br />
                <Typography.Text strong>Saturi bastaMarried</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Religion: <br />
                <Typography.Text strong>Atheist</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Status</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Mother's Name */}
          <Col span={18} push={6}>
            <Space>
              <Typography.Text type="secondary">
                Mother's Maiden Name: <br />
                <Typography.Text strong>
                  Xandera Middle Kalapanget
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Mother's Name</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Household */}
          <Col span={18} push={6}>
            <Space>
              <Typography.Text type="secondary">
                Household Head? <Typography.Text strong>No</Typography.Text>
              </Typography.Text>
            </Space>{" "}
            <br />
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Name of Household Head <br />
                <Typography.Text strong>
                  Makagago Barumbado Ford
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Relationship <br />
                <Typography.Text strong>Father</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                No. of living household members:{" "}
                <Typography.Text strong>5</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                No. of Male: <Typography.Text strong>3</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                No. of Female: <Typography.Text strong>2</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Household</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Education */}
          <Col span={18} push={6}>
            <Space>
              <Typography.Text type="secondary">
                Highest Formal Education <br />
                <Typography.Text strong>High School</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Education</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Other Information */}
          <Col span={18} push={6}>
            <Input.Group>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size={"small"}
                showHeader={false}
              />
            </Input.Group>
          </Col>
          <Col span={6} pull={18}>
            <strong>Other Information</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* In Case of Emergency */}
          <Col span={18} push={6}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Person to Contact <br />
                <Typography.Text strong>Xian Gaza</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Contact Number <br />
                <Typography.Text strong>09178301880</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>In Case of Emergency</strong>
          </Col>
        </Row>
      </div>

      <div style={{ display: current != 1 ? "none" : null }}>
        <Row>
          {/* Main Livelihood */}
          <Col span={18} push={6}>
            <Space>
              <Typography.Text type="secondary">
                Type of livelihood <br />
                <Typography.Text strong>
                  <Space>
                    <Tag color="gray">Farmer</Tag>
                    <Tag color="gray">Farmworker</Tag>
                    <Tag color="gray">Fisherfolk</Tag>
                  </Space>
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Main Livelihood</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* For farmer */}
          <Col span={18} push={6}>
            <Space direction="horizontal">
              <List
                size="small"
                header={
                  <Typography.Text type="secondary">
                    Type of Farming Activity:
                  </Typography.Text>
                }
                dataSource={farmerActivity}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text strong>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>For Farmer</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* For Farmworker */}
          <Col span={18} push={6}>
            <Space direction="horizontal">
              <List
                size="small"
                header={
                  <Typography.Text type="secondary">
                    Kind of Work:
                  </Typography.Text>
                }
                dataSource={farmworkerActivity}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text strong>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>For Farmworker</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* For Fisherfolk */}
          <Col span={18} push={6}>
            <Space direction="horizontal">
              <List
                size="small"
                header={
                  <Typography.Text type="secondary">
                    Type of Fishing Activity:
                  </Typography.Text>
                }
                dataSource={fishingActivity}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text strong>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>For Fisherfolk</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Farm Land */}
          <Col span={18} push={6}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                No. of Farm Parcel:
                <Typography.Text strong>0</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Agrarian Reform Beneficiary (ARB)?{" "}
                <Typography.Text strong>Yes</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Farm Land</strong>
          </Col>
        </Row>
      </div>

      <div style={{ display: current != 2 ? "none" : null }}>
        <Row>
          {/* Upload ID Picture */}
          <Col span={18} push={6}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                ID Picture: <br />
                <Image
                  width={150}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </Typography.Text>
              <Typography.Text type="secondary">
                Scanned Documents: <br />
                <Space style={{ display: "flex" }}>
                  <Image
                    width={150}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" //documents
                  />
                  <Image
                    width={150}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" //documents
                  />
                  <Image
                    width={150}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" //documents
                  />
                </Space>
              </Typography.Text>{" "}
              <br />
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>ID Picture and Scanned Documents</strong>
          </Col>
        </Row>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Space>
          {current > 0 && (
            <Button onClick={handlePrev}>
              {current > 0 ? "Previous" : null}
            </Button>
          )}
          {current < 2 && (
            <Button type="primary" onClick={handleNext}>
              {current < 2 ? "Next Page" : null}
            </Button>
          )}
          {current == 2 && (
            <Button type="primary" htmlType="submit">
              Finish
            </Button>
          )}
        </Space>
      </div>
    </Modal>
  );
};
