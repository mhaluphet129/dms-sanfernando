import React, { useState } from "react";
import { Modal, Form, Input, Button, Spin, notification } from "antd";
import axios from "axios";

export default ({ visible, setVisible, cb }) => {
  const [loader, setLoader] = useState("");
  return (
    <Modal
      visible={visible}
      closable={false}
      title='Add Program'
      onCancel={() => {
        setVisible(false);
      }}
      footer={false}
      destroyOnClose
    >
      <Spin spinning={loader == "adding"}>
        <Form
          layout='vertical'
          onFinish={async (val) => {
            let { data } = await axios.post("/api/programs", {
              payload: { ...val, mode: "add" },
            });

            if (data.success) {
              notification["success"]({
                placement: "bottomRight",
                description: data.message,
              });
              setVisible(false);
              cb();
            }
          }}
        >
          <Form.Item
            label='Name of Program'
            name='name'
            rules={[{ required: true, message: "This field is empty." }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label='Program In-charge'
            name='inCharge'
            rules={[{ required: true, message: "This field is empty." }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: "This field is empty." }]}
          >
            <Input.TextArea rows={6} allowClear />
          </Form.Item>
          <Form.Item
            className='submit'
            wrapperCol={{ offset: loader == "adding" ? 17 : 18 }}
          >
            <Button
              type='primary'
              htmlType='submit'
              loading={loader == "adding"}
            >
              Add Program
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
