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
  Typography,
  Divider,
} from "antd";
import moment from "moment";
import axios from "axios";
import ViewProgam from "./ViewProgam";

export default ({ modalData, cb }) => {
  const [editModal, setEditModal] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  return (
    /* view program modal */
    <Modal
      visible={editModal}
      width={700}
      closable={false}
      footer={null}
      onCancel={() => {
        setEditModal(false);
      }}
      title={
        <span
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Poor Peace Program
          {/*{`${modalData?.name} `}*/}
          <div>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => setViewModal(true)}
            >
              Update
            </Button>
          </div>
        </span>
      }
      destroyOnClose
    >
      {/*Edit Program */}
      <ViewProgam
        viewModal={viewModal}
        setViewModal={setViewModal}
        //modalData={modalData}
        //cb={() => setTrigger(trigger + 1)}
      />

      <Form style={{ lineHeight: 3 }}>
        <Typography.Text type="secondary">Name of Program: </Typography.Text>
        <Typography.Text strong>Poor Peace Program</Typography.Text>
        <br />
        <Typography.Text type="secondary">Date Created: </Typography.Text>
        <Typography.Text strong>May 25, 2022</Typography.Text>
        <br />
        <Typography.Text type="secondary">Status: </Typography.Text>
        <Typography.Text strong>
          <Badge status="error" />
          Inactive
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">Program In-charge: </Typography.Text>
        <Typography.Text strong>Juan Dela Cruz</Typography.Text>
        <br />
        <Typography.Text type="secondary">Description: </Typography.Text>
        <br />
        <Row style={{ lineHeight: 2 }}>
          <Col span={22} offset={1}>
            <Typography.Text>
              This is just a dummy data. This is just a dummy data. This is just
              a dummy data. This is just a dummy data. This is just a dummy
              data. This is just a dummy data. This is just a dummy data. This
              is just a dummy data. This is just a dummy data. This is just a
              dummy data. This is just a dummy data. This is just a dummy data.
            </Typography.Text>
          </Col>
        </Row>
        <Divider />
      </Form>
    </Modal>
  );
};
