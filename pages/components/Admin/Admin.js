import { useState } from "react";
import { Row, Col, Card, Tag, Typography } from "antd";
import AdminList from "./AdminList";
import { AdminAddForm } from "./AdminForm";
export default () => {
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalSuperAdmin, setTotalSuperAdmin] = useState(0);
  const [fetching, setFetching] = useState(false);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Row justify='space-around' gutter={[16, 16]}>
            <Col span={9}>
              <Card loading={fetching} hoverable>
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
              <Card loading={fetching} hoverable>
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
        <Col span={16}>
          <AdminList
            setTotalAdmin={setTotalAdmin}
            setTotalSuperAdmin={setTotalSuperAdmin}
            setFetching={setFetching}
          />
        </Col>
      </Row>
    </>
  );
};
