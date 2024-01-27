import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Typography,
  Tooltip,
  Row,
  Col,
  Card,
  notification,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";
import ProfilerModal from "./ProfilerModal";

export default () => {
  const [loader, setLoader] = useState("");
  const [logs, setLogs] = useState();
  const [totalToday, setTotalToday] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const [profileData, setProfileData] = useState();

  const columns = [
    {
      title: "Date and Time",
      render: (_, row) =>
        `${moment(row?.createdAt).format("MMM DD, YYYY | hh:mm a")}`,
    },
    {
      title: "Name",
      render: (_, row) => (
        <Tooltip title="Click to view full profile.">
          <Button
            type="link"
            onClick={async () => {
              let res = await axios.get("/api/main", {
                params: {
                  mode: "qr",
                  id: row.userId,
                },
              });

              if (res?.data.success) {
                setProfileData(res?.data.data[0]);
                setOpenProfile(true);
              }
            }}
          >
            {row?.name}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
    },
  ];

  useEffect(async () => {
    setLoader("fetch-log");
    try {
      let { data } = await axios.get("/api/history", {
        params: {
          type: "visit",
        },
      });

      if (data.success) {
        setLogs(data.data);
        setTotalToday(data.countToday);
        setLoader("");
        notification["success"]({
          placement: "bottomRight",
          description: data.message,
        });
      }
    } catch {
      message.error("There is an error on the server");
    }
  }, []);

  return (
    <>
      <ProfilerModal
        visible={openProfile}
        setVisible={setOpenProfile}
        data={profileData}
        callback={() => null}
      />
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Table
            columns={columns}
            dataSource={logs}
            scroll={{ y: 500 }}
            loading={loader == "fetch-log"}
            rowKey={(row) => row._id}
            title={() => (
              <Typography.Title level={4}>Visit History</Typography.Title>
            )}
            bordered
          />
        </Col>
        <Col span={6}>
          <Card style={{ height: 150 }}>
            <Typography.Title level={2}>
              {loader == "fetch-log" ? "-" : totalToday}
            </Typography.Title>
            <Typography.Text
              style={{
                fontSize: "1.25em",
              }}
            >
              No. of Visits Today
            </Typography.Text>
          </Card>
          <Card style={{ height: 150, marginTop: 10 }}>
            <Typography.Title level={2}>
              {loader == "fetch-log" ? "-" : logs?.length}
            </Typography.Title>
            <Typography.Text
              style={{
                fontSize: "1.25em",
              }}
            >
              Total visits
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </>
  );
};
