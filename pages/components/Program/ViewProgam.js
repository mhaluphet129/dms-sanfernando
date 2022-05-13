import { react, useState } from "react";
import { Modal, Row, Col, Typography, Badge, Space } from "antd";

export default () => {
  const [viewModal, setViewModal] = useState(true);

  return (
    <Modal
      visible={viewModal}
      width={700}
      closable={false}
      title="Trabahong Tapat, Angat Buhay Lahat"
      onCancel={() => {
        setViewModal(false);
      }}
    >
      <Space direction="vertical">
        <Row>
          <Typography.Text type="secondary">
            Name:{" "}
            <Typography.Text strong>
              Trabahong Tapat, Angat Buhay Lahat
            </Typography.Text>
          </Typography.Text>{" "}
        </Row>
        <Row>
          <Col span={14}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Date of Release:
                <Typography.Text>January 29, 2022</Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                Program In-charge:{" "}
                <Typography.Text>Leni Robredo</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={10}>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                Status:{" "}
                <Typography.Text type="success">
                  <Badge status="success" />
                  Active
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type="secondary">
                No. of Beneficiaries:{" "}
                <Typography.Text>14,822,051</Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
        </Row>
        <Row>
          <Typography.Text type="secondary">
            Description: <br />
            <Typography.Text>
              &nbsp; &nbsp; &nbsp; Karapatan nating magkaroon ng kinabukasang
              may dignidad, at tungkulin natin na ipaglaban ito. Natutunan
              natin, walang imposible,' the presidential candidate says in her
              final campaign speech. Karapatan nating magkaroon ng kinabukasang
              may dignidad, at tungkulin natin na ipaglaban ito. Natutunan
              natin, walang imposible,' the presidential candidate says in her
              final campaign speech. Karapatan nating magkaroon ng kinabukasang
              may dignidad, at tungkulin natin na ipaglaban ito. Natutunan
              natin, walang imposible,' the presidential candidate says in her
              final campaign speech.
            </Typography.Text>
          </Typography.Text>{" "}
        </Row>
      </Space>
    </Modal>
  );
};
