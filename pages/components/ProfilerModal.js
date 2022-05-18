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
  Table,
  Badge,
} from "antd";
import axios from "axios";
import QRCode from "qrcode";
import parse from "html-react-parser";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import TimelineDisplay from "../assets/js/TimelineDisplay";
import ViewProfile from "./Livelihood/ViewProfile";
import TitleText from "../assets/js/TitleText";

export default ({ data, visible, setVisible }) => {
  const [profileVisible, setProfileVisible] = useState();
  const [qr, setQr] = useState();
  const [loader, setLoader] = useState();
  const [trigger, setTrigger] = useState(0);
  const [programs, setPrograms] = useState([]);

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
      render: (_, row) => <Badge status={row?.status ? "success" : "error"} />,
    },
    {
      title: "Program",
      render: (_, row) => row?.name,
    },
  ];

  // useEffect(() => {
  //   QRCode.toString(data?._id?.toString(), function (err, url) {
  //     setQr(parse(url || ""));
  //   });
  // }, [visible]);

  useEffect(async () => {
    if (visible) {
      setLoader("fetch-programs");
      let res = await axios.get("/api/programs", {
        params: {
          mode: "fetch-programs",
          _id: data?._id,
        },
      });

      if (res.data.success) {
        setLoader("");
        setPrograms(res?.data?.data[0]?.programsObj);
        console.log(res?.data?.data[0]?.programsObj);
      }
    }
  }, [visible]);

  return (
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
              <Button type='primary' style={{ width: "100%", marginBottom: 5 }}>
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
            <Typography.Text
              type='secondary'
              style={{
                fontSize: 13,
              }}
            >
              id: {data?._id}
            </Typography.Text>
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
          <Button style={{ width: "100%", marginBottom: 5 }}>
            View Program
          </Button>
          <Button style={{ width: "100%", marginBottom: 5 }}>View QR</Button>
          <div>{qr}</div>
        </Col>
        <Col span={8}>
          <Space direction='vertical' size='small' style={{ display: "flex" }}>
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
          <Typography.Title
            level={5}
            style={{
              textAlign: "center",
            }}
          >
            Log History
          </Typography.Title>{" "}
          <TimelineDisplay data={data?.timeline} />
        </Col>
      </Row>
    </Modal>
  );
};
