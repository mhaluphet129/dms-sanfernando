import { Row, Col, Form, Input } from "antd";

export default () => {
  return (
    <div style={{ padding: 10 }}>
      <Form>
        <Row justify='space-between' title='test'>
          <Col span={12}>
            <Form.Item label='firstname'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
