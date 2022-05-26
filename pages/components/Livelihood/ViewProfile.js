import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Divider,
  Button,
  Space,
  Modal,
  Steps,
  Table,
  Typography,
  Tag,
  Image,
  List,
  Badge,
} from "antd";
import moment from "moment";
import QRCode from "qrcode";
import parse from "html-react-parser";

import TitleText from "../../assets/js/TitleText";

const { Step } = Steps;

export default ({ profileVisible, setProfileVisible, info, programs }) => {
  const [current, setCurrent] = useState(0);
  const [qr, setQr] = useState();

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

  let columns2 = [
    {
      title: "status",
      align: "center",
      width: 80,
      render: (_, row) => <Badge status={row?.status ? "success" : "error"} />,
    },
    {
      title: "Program",
      render: (_, row) => row?.name,
    },
  ];

  const data = [
    {
      key: "1",
      Question: "Person With Disability (PWD)?",
      YesNo: (
        <Tag color={info?.isDisabledPerson ? "success" : "error"}>
          {info?.isDisabledPerson ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      key: "2",
      Question: "4P's Beneficiary?",
      YesNo: (
        <Tag color={info?.is4Ps ? "success" : "error"}>
          {info?.is4Ps ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      key: "3",
      Question: "Member of Indigenous Group?",
      YesNo: (
        <Tag color={info?.ethnicity?.isIp ? "success" : "error"}>
          {info?.ethnicity?.isIp ? "Yes" : "No"}
        </Tag>
      ),
      Specify: info?.ethnicity?.isIp ? info?.ethnicity?.nameOfEthnicity : "",
    },
    {
      key: "4",
      Question: "With Government ID?",
      YesNo: (
        <Tag color={info?.government?.hasId ? "success" : "error"}>
          {info?.government?.hasId ? "Yes" : "No"}
        </Tag>
      ),
      Specify: info?.government?.hasId ? info?.government?.idNum : "",
    },
    {
      key: "5",
      Question: "Member of any Farmer Association/Cooperation?",
      YesNo: (
        <Tag color={info?.hasCoopOrAssoc?.status ? "success" : "error"}>
          {info?.hasCoopOrAssoc?.status ? "Yes" : "No"}
        </Tag>
      ),
      Specify: info?.hasCoopOrAssoc?.status ? info?.hasCoopOrAssoc?.name : "",
    },
  ];

  //data for Type of farmer Activity
  const farmerActivity = [
    <Typography.Text>
      Crops:{" "}
      {info?.profile?.crops.map((el, i) => (
        <Tag key={i}>{el}</Tag>
      ))}
    </Typography.Text>,
    <Typography.Text>
      Livestock:{" "}
      {info?.profile?.livestock.map((el, i) => (
        <Tag key={i}>{el}</Tag>
      ))}
    </Typography.Text>,
    <Typography.Text>
      Poultry:{" "}
      {info?.profile?.poultry.map((el, i) => (
        <Tag key={i}>{el}</Tag>
      ))}
    </Typography.Text>,
  ];

  // data for Kind of Work (farmworker)
  const farmworkerActivity = info?.profile?.farmWorker
    ? [...info?.profile?.farmWorker]
    : [];

  //data for Type of Fishing Activity
  const fishingActivity = info?.profile?.fisherFolks
    ? [...info?.profile?.fisherFolks]
    : [];

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  //HANDLERS NI BEBE *mwah*
  const handleChange = (current) => {
    setCurrent(current);
  };

  const handleNext = () => {
    if (current < 2) setCurrent(current + 1);
    else alert("add me");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  useEffect(() => {
    QRCode.toString(info?._id?.toString(), function (err, url) {
      setQr(parse(url || ""));
    });
  }, [profileVisible]);

  return (
    <Modal
      visible={profileVisible}
      width={800}
      onCancel={() => {
        setProfileVisible(false);
        setCurrent(0);
      }}
      footer={null}
      closable={false}
    >
      <div>
        <Row>
          <Col span={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Image
                width={150}
                height={150}
                style={{
                  borderRadius: "50%",
                }}
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              />
              <Space
                direction='vertical'
                size='small'
                style={{ display: "flex" }}
              >
                <Typography.Text strong>
                  {TitleText(
                    `${info?.name?.name} ${
                      info?.name?.middleName?.length > 0
                        ? info?.name?.middleName[0] + "."
                        : ""
                    } ${info?.name?.lastName}`
                  )}
                </Typography.Text>
                <Typography.Text strong>
                  <Space direction='vertical'>
                    {info?.profile?.type.map((el, i) => (
                      <Tag key={i} color={color[el]}>
                        {el}
                      </Tag>
                    ))}
                  </Space>
                </Typography.Text>
              </Space>
            </div>
          </Col>

          <Col span={11}>
            <Table
              columns={columns2}
              dataSource={programs}
              pagination={false}
              scroll={{ y: 200 }}
              rowKey={(row) => row._id}
            />
          </Col>
          <Col span={7}>
            <div style={{ width: 200 }}>{qr}</div>
            <small
              style={{ color: "#aaa", textAlign: "center", width: "100%" }}
            >
              id: {info?._id}
            </small>
          </Col>
        </Row>
        <Divider />
      </div>
      <Steps size='small' current={current} progressDot onChange={handleChange}>
        <Step title='Part I' description='Personal Information' />
        <Step title='Part II' description='Farm Profile' />
        <Step title='Part III' description='Scanned Documents' />
      </Steps>
      <Divider />

      <div style={{ display: current != 0 ? "none" : null }}>
        <Row>
          {/* Name and Gender */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                Full Name: <br />
                <Typography.Text strong>
                  {TitleText(
                    `${info?.name?.lastName}, ${info?.name.name} ${info?.name?.middleName}`
                  )}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Gender: <br />
                <Typography.Text strong>
                  {TitleText(`${info?.gender}`)}
                </Typography.Text>
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
            <Typography.Text type='secondary'>
              Address: <br />
              <Typography.Text strong>
                {TitleText(
                  `${info?.address.street}, ${info?.address.barangay}`
                )}
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
            <Typography.Text type='secondary'>
              Contact Number: <br />
              <Typography.Text strong>{info?.contactNum}</Typography.Text>
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
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                Date of Birth: <br />
                <Typography.Text strong>
                  {moment(info?.birth?.dateOfBirth).format("MMMM DD, YYYY")}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Place of Birth: <br />
                <Typography.Text strong>
                  {TitleText(`${info?.birth.placeOfBirth}`)}
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
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                Civil Status: <br />
                <Typography.Text strong>{info?.civil}</Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Name of Spouse: <br />
                <Typography.Text
                  type={info?.civil != "Married" ? "secondary" : null}
                  strong={info?.civil != "Married"}
                >
                  {info?.civil == "Married" ? "SPOUSENAME" : "Not Applicable"}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Religion: <br />
                <Typography.Text strong>
                  {info?.religion ? (
                    TitleText(`${info?.religion}`)
                  ) : (
                    <span style={{ color: "#aaa", fontStyle: "italic" }}>
                      not set
                    </span>
                  )}
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Status</strong>
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Education */}
          <Col span={18} push={6}>
            <Space>
              <Typography.Text type='secondary'>
                Highest Formal Education <br />
                <Typography.Text strong>
                  {info?.highestEducation}
                </Typography.Text>
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
                rowKey={(row) => row._id}
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
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                Person to Contact <br />
                <Typography.Text strong>
                  {TitleText(`${info?.emergency?.name}`)}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Contact Number <br />
                <Typography.Text strong>
                  {info?.emergency?.number}
                </Typography.Text>
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
          {/* For farmer */}
          <Col span={18} push={6}>
            <Space direction='horizontal'>
              <List
                size='small'
                header={
                  <Typography.Text type='secondary'>
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
            <Space direction='horizontal'>
              <List
                size='small'
                header={
                  <Typography.Text type='secondary'>
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
            <Space direction='horizontal'>
              <List
                size='small'
                header={
                  <Typography.Text type='secondary'>
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
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                No. of Farm Parcel:
                <Typography.Text strong>0</Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Agrarian Reform Beneficiary (ARB) ?{" "}
                <Tag color={info?.profile?.isARB ? "success" : "error"}>
                  {info?.profile?.isARB ? "Yes" : "No"}
                </Tag>
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
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                ID Picture: <br />
                <Image
                  width={150}
                  src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                />
              </Typography.Text>
              <Typography.Text type='secondary'>
                {/* here */}
                Scanned Documents: <br />
                <Space style={{ display: "flex" }}>
                  {info?.personalfiles &&
                    info?.personalfiles.map((el) => (
                      <Image
                        width={150}
                        src={`/uploads/livelihood/${info?._id}/${el}`}
                      />
                    ))}
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
            <Button type='primary' onClick={handleNext}>
              {current < 2 ? "Next Page" : null}
            </Button>
          )}
          {current == 2 && (
            <Button type='primary' htmlType='submit'>
              Finish
            </Button>
          )}
        </Space>
      </div>
    </Modal>
  );
};
