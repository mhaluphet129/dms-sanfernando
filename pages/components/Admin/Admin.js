import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag, Typography, message } from "antd";

import axios from "axios";
import Cookie from "js-cookie";

import AdminTable from "./AdminTable";
import AdminAddForm from "./AdminForm";
import AdminList from "./AdminList";
import AdminModal from "./AdminModal";

const Admin = () => {
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [trigger, setTrigger] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [SAData, setSAData] = useState();
  const [type, setType] = useState();

  const fetch = async (role) => {
    const { data } = await axios.get("/api/admin", {
      params: { mode: "fetchall", role },
    });
    if (data.success) {
      setData2(data.users);
      setVisible(true);
    } else
      notification["warn"]({
        description: "Error on fetching the data",
      });
  };

  useEffect(() => {
    setType(JSON.parse(Cookie.get("user")).role);
  }, []);

  return (
    <>
      <AdminModal
        visibility={modalVisible}
        onClose={() => setModalVisible(false)}
        setVisible={setModalVisible}
        data={SAData}
        type={type}
        callback={() => setTrigger(trigger + 1)}
      />
      <AdminList
        type={type}
        data={data2}
        visible={visible}
        onClose={() => setVisible(false)}
        cb={() => {
          setTrigger(trigger + 1);
          setVisible(false);
        }}
      />
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <AdminTable
            setTotalAdmin={setTotalAdmin}
            data={data}
            setData={setData}
            type={type}
            trigger={trigger}
            cb={() => setTrigger(trigger + 1)}
            setSA={setSAData}
          />
        </Col>
        <Col span={8}>
          <Row justify="space-around" gutter={[16, 16]}>
            <Col span={23}>
              <Card
                onClick={() => {
                  fetch("admin");
                }}
                hoverable
              >
                <Card.Meta
                  title="Admin"
                  description={
                    <Typography.Text type="secondary">
                      Total: <Tag color="volcano">{totalAdmin}</Tag>
                    </Typography.Text>
                  }
                />
              </Card>
            </Col>
            <Col span={23}>
              <AdminAddForm cb={() => setTrigger(trigger + 1)} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Admin;
