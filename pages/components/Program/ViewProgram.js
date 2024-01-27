import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Badge,
  Button,
  Typography,
  Divider,
} from "antd";
import moment from "moment";

import TitleText from "../../../utilities/TitleText";
import EditProgram from "./EditProgram";

export default ({ viewModal, setViewModal, modalData, cb }) => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      <EditProgram
        viewModal={openEdit}
        setViewModal={setOpenEdit}
        modalData={modalData}
        cb={() => {
          cb();
          setViewModal(false);
        }}
      />
      <Modal
        visible={viewModal}
        width={700}
        closable={false}
        footer={null}
        onCancel={() => {
          setViewModal(false);
        }}
        title={
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {TitleText(`${modalData?.name}`)}
            <div>
              <Button
                style={{ width: "100%", marginBottom: 5 }}
                onClick={() => setOpenEdit(true)}
              >
                Update
              </Button>
            </div>
          </span>
        }
      >
        <Form style={{ lineHeight: 3 }}>
          <Typography.Text type="secondary">Name of Program: </Typography.Text>
          <Typography.Text strong>
            {TitleText(`${modalData?.name}`)}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">Date Created: </Typography.Text>
          <Typography.Text strong>
            {moment(modalData?.createdAt).format("MMMM DD, YYYY")}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">Status: </Typography.Text>
          <Typography.Text strong>
            <Badge status={modalData?.status ? "success" : "error"} />
            {modalData?.status ? "Active" : "Inactive"}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">
            Program In-charge:{" "}
          </Typography.Text>
          <Typography.Text strong>{modalData?.inCharge}</Typography.Text>
          <br />
          <Typography.Text type="secondary">Description: </Typography.Text>
          <br />
          <Row style={{ lineHeight: 2 }}>
            <Col span={22} offset={1}>
              <Typography.Text>{modalData?.description}</Typography.Text>
            </Col>
          </Row>
          <Divider />
        </Form>
      </Modal>
    </>
  );
};
