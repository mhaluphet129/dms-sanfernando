import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Badge,
  Button,
  notification,
} from "antd";
import moment from "moment";
import axios from "axios";

export default ({ viewModal, setViewModal, modalData, cb }) => {
  const [date, setDate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  return (
    /* view/edit program modal */
    <Modal
      visible={viewModal}
      width={700}
      closable={false}
      footer={null}
      onCancel={() => {
        setViewModal(false);
        setIsEditing(false);
      }}
      title={
        <span
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {`${modalData?.name} `}
          <div>
            <Badge status={modalData?.status ? "success" : "error"} />{" "}
            {`${modalData?.status ? "Active" : "Inactive"}`}
          </div>
        </span>
      }
      destroyOnClose
    >
      <Form
        onFinish={async (val) => {
          let obj = {
            ...val,
            createdAt: val?.dateCreated ? date : modalData?.createdAt,
          };
          let { data } = await axios.post("/api/programs", {
            payload: {
              data: obj,
              mode: "update",
              id: modalData?._id,
            },
          });

          if (data.success) {
            notification["success"]({
              placement: "bottomRight",
              description: data.message,
            });
            setViewModal(false);
            setIsEditing(false);
            cb();
          }
        }}
        layout='vertical'
      >
        <Form.Item
          label='Name of Program'
          name='name'
          initialValue={modalData?.name}
          required={[{ required: true }]}
        >
          <Input
            onChange={() => setIsEditing(true)}
            style={{ width: 650 }}
            allowClear
          />
        </Form.Item>
        <Row>
          <Col span={7}>
            <Form.Item
              label='Date Created'
              name='dateCreated'
              required={[{ required: true }]}
            >
              <DatePicker
                defaultValue={moment(
                  moment(modalData?.createdAt).format("MMMM DD, YYYY"),
                  "MMMM DD, YYYY"
                )}
                onChange={(_, row) => {
                  setIsEditing(true);
                  setDate(_._d);
                }}
                format='MMMM DD, YYYY'
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={5} offset={1}>
            <Form.Item
              label=' Status'
              name='status'
              initialValue={modalData?.status}
              required={[{ required: true }]}
            >
              <Select onChange={() => setIsEditing(true)}>
                <Select.Option value={true}>
                  <Badge status='success' /> Active
                </Select.Option>
                <Select.Option value={false}>
                  <Badge status='error' /> Expired
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item
              label='Program In-charge'
              name='inCharge'
              initialValue={modalData?.inCharge}
              required={[{ required: true }]}
            >
              <Input
                onChange={() => setIsEditing(true)}
                style={{ width: "100%" }}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label='Description'
          name='description'
          initialValue={modalData?.description}
          required={[{ required: true }]}
        >
          <Input.TextArea
            rows={8}
            style={{ width: "100%", resize: "none!important" }}
            autoSize={{ minRows: 7, maxRows: 7 }}
            maxLength={1000}
            onChange={() => setIsEditing(true)}
            allowClear
            showCount
          />
        </Form.Item>
        <Form.Item className='submit' wrapperCol={{ offset: 22 }}>
          <Button type='primary' htmlType='submit' disabled={!isEditing}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
