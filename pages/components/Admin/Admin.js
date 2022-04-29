import { useState } from "react";
import { Row, Col, Card, Tag, Typography } from "antd";
import AdminTable from "./AdminTable";
import { AdminAddForm } from "./AdminForm";
import AdminList from "./AdminList";
import axios from "axios";
import Cookie from "js-cookie";
export default () => {
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalSuperAdmin, setTotalSuperAdmin] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [data2, setData2] = useState();

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

  const type = JSON.parse(Cookie.get("user"))[0].role;

  return (
    <>
      <AdminList
        type={type}
        data={data2}
        visible={visible}
        onClose={() => setVisible(false)}
      />
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <AdminTable
            setTotalAdmin={setTotalAdmin}
            setTotalSuperAdmin={setTotalSuperAdmin}
            data={data}
            setData={setData}
            type={type}
          />
        </Col>
        <Col span={8}>
          <Row justify='space-around' gutter={[16, 16]}>
            <Col span={9}>
              <Card
                onClick={() => {
                  fetch("admin");
                }}
                hoverable
              >
                <Card.Meta
                  title='Admin'
                  description={
                    <Typography.Text type='secondary'>
                      Total: <Tag color='volcano'>{totalAdmin}</Tag>
                    </Typography.Text>
                  }
                />
              </Card>
            </Col>
            <Col span={13}>
              <Card
                onClick={() => {
                  fetch("superadmin");
                }}
                hoverable
              >
                <Card.Meta
                  title='Super Admin'
                  description={
                    <Typography.Text type='secondary'>
                      Total: <Tag color='magenta'>{totalSuperAdmin}</Tag>
                    </Typography.Text>
                  }
                />
              </Card>
            </Col>
            <Col span={23}>
              <AdminAddForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};