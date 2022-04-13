import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Card,
  Select,
  Divider,
  Button,
  Space,
} from "antd";
import FloatLabel from "../../assets/js/FloatLabel";

export default () => {
  return (
    <Card
      style={{
        padding: 10,
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
      hoverable
    >
      <Form>
        {/* area1 */}
        <Row style={{ width: "40vw", float: "left" }}>
          <Input.Group>
            <h2>Name and Gender</h2>
            <Form.Item label='Surname' style={{ float: "right" }}>
              <Input
                placeholder='Surname'
                style={{ width: "32vw" }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                allowClear
              />
            </Form.Item>
            <Form.Item label='Firstname' style={{ float: "right" }}>
              <Input
                placeholder='Surname'
                style={{ width: "32vw" }}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                allowClear
              />
            </Form.Item>
            <Form.Item label='Middle Name' style={{ float: "right" }}>
              <Input
                placeholder='Surname'
                style={{ width: "32vw" }}
                allowClear
              />
            </Form.Item>
          </Input.Group>
          <Input.Group compact>
            <Form.Item label='Extension Name'>
              <Select placeholder='Extension'>
                <Select.Option value='sr'>Sr.</Select.Option>
                <Select.Option value='jr'>Jr.</Select.Option>
                <Select.Option value='others'>Others</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Gender' style={{ marginLeft: 10 }}>
              <Select value='male'>
                <Select.Option value='male'>Male</Select.Option>
                <Select.Option value='female'>Female</Select.Option>
              </Select>
            </Form.Item>
          </Input.Group>
          <Input.Group>
            <h2>Address</h2>
            <Form.Item label='Surname'>
              <Input placeholder='Surname' allowClear />
            </Form.Item>
          </Input.Group>
        </Row>
        <Divider type='vertical' style={{ height: "100vh" }} />
        <Row style={{ backgroundColor: "red", float: "right" }}></Row>
        {/* end 1 */}
      </Form>
    </Card>
  );
};
