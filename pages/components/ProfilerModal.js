import { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Image,
  Form,
  Input,
  Spin,
  DatePicker,
  Timeline,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";

import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import TimelineDisplay from "../assets/js/TimelineDisplay";
import ViewProfile from "./Livelihood/ViewProfile";
import TitleText from "../assets/js/TitleText";

export default ({ data, visible, setVisible }) => {
  const [profileVisible, setProfileVisible] = useState();
  const [loader, setLoader] = useState();
  const [trigger, setTrigger] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [loggerModal, setLoggerModal] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [form] = Form.useForm();

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  useEffect(async () => {
    if (visible) {
      setLoader("fetch");
      let res = await axios.get("/api/programs", {
        params: {
          mode: "fetch-programs",
          _id: data?._id,
        },
      });

      let res2 = await axios.get("/api/livelihood", {
        params: {
          mode: "fetch-history",
          id: data?._id,
        },
      });

      if (res.data.success && res2.data.success) {
        setLoader("");
        setPrograms(res?.data?.data[0]?.programsObj);
        setTimeline(res2.data.data);
      }
    }
  }, [visible, trigger]);

  return (
    <>
      <Modal
        title='Logs'
        visible={loggerModal}
        onCancel={() => setLoggerModal(false)}
        closable={false}
        okText='Add'
        onOk={form.submit}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          onFinish={async (val) => {
            const { message, date } = val;

            let res = await axios.post("/api/livelihood", {
              payload: {
                id: data?._id,
                message,
                date,
              },
              mode: "add-to-logs",
            });

            if (res.data.success) {
              notification["success"]({
                placement: "bottomRight",
                message: res.data.message,
              });
              setTrigger(trigger + 1);
              setLoggerModal(false);
            }
          }}
        >
          <Form.Item label='Message' name='message'>
            <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
          </Form.Item>
          <Form.Item label='Date' initialValue={moment()} name='date'>
            <DatePicker defaultValue={moment()} format='MM-DD-YYYY' />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visible}
        width={1000}
        closable={false}
        footer={null}
        title={
          <>
            <Tag color={data?.isActive ? "#87d068" : "#f50"}>
              {data?.isActive ? (
                <span>
                  <CheckCircleOutlined /> Active
                </span>
              ) : (
                <span>
                  <CloseCircleOutlined /> Inactive
                </span>
              )}
            </Tag>

            <div style={{ float: "right" }}>
              <Space direction='horizontal'>
                <Button style={{ width: "100%", marginBottom: 5 }}>
                  Upload File
                </Button>
                <Button
                  type='primary'
                  style={{ width: "100%", marginBottom: 5 }}
                  onClick={() => setLoggerModal(true)}
                >
                  Add to Logs
                </Button>
              </Space>
            </div>
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
          programs={programs}
        />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                width={200}
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' //QR code ni sya
              />
            </div>
            <div style={{ textAlign: "center", marginBottom: 5 }}>
              <small style={{ color: "#aaa" }}>id: {data?._id}</small>
              <br />
              {data?.profile?.type.map((el, i) => (
                <Tag color={color[el]} key={i}>
                  {el}
                </Tag>
              ))}
            </div>
            <Button style={{ width: "100%", marginBottom: 5 }}>
              Edit Profile
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => {
                setProfileVisible(true);
              }}
            >
              View Full Profile
            </Button>
            <Button style={{ width: "100%", marginBottom: 5 }}>View QR</Button>
            <Button
              type='dashed'
              size='large'
              style={{
                backgroundColor: "#70e040",
                color: "#fff",
                width: "100%",
              }}
              onClick={async () => {
                let res = await axios.get("/api/livelihood", {
                  params: {
                    mode: "log",
                    type: "visit",
                    id: data?._id,
                    barangay: data?.address?.barangay || "",
                    name: TitleText(
                      `${data?.name.lastName}, ${data?.name.name} ${data?.name.middleName[0]}.`
                    ),
                  },
                });

                if (res.data.success) {
                  notification["success"]({
                    placement: "bottomRight",
                    message: res.data.message,
                  });
                  setVisible(false);
                }
              }}
            >
              VISIT TODAY
            </Button>
          </Col>
          <Col span={8}>
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
                Contact Number: <br />
                <Typography.Text strong>{data?.contactNum}</Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                In case of emergency: <br />
                <Typography.Text strong>
                  {data?.emergency?.name || "Not set"}
                </Typography.Text>
                <br />
                <Typography.Text strong>
                  {data?.emergency?.number || "Not set"}
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={8}>
            {loader == "fetch" ? (
              <Spin style={{ textAlign: "center", width: "100%" }} />
            ) : (
              <TimelineDisplay data={timeline} />
            )}
            <Button
              style={{
                marginLeft: "50%",
                marginTop: 10,
                transform: "translateX(-50%)",
              }}
            >
              View full logs
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
