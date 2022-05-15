import { react, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Badge,
  Space,
  Form,
  Input,
  Select,
} from "antd";

export default ({ viewModal, setViewModal, mode, setMode }) => {
  const [content, setContent] = useState("");
  const [contentNotEditing, setContentNotEditing] = useState(false);
  //const [mode, setMode] = useState("edit");
  const { TextArea } = Input;

  const data = {
    programname: "Poor Peace Program",
    dateCreated: "May 09, 2022",
    incharge: "Leni Robredo",
    status: "Active",
    noOfBenificiaries: "9,053",
    description:
      "Karapatan nating magkaroon ng kinabukasang may dignidad, at tungkulin natin na ipaglaban ito. Natutunan natin, walang imposible,' the presidential candidate says in her final campaign speech. Karapatan nating magkaroon na kinabukasang may dignidad, at tungkulin natin na ipaglaban ito. Natutunan natin, walang imposible,' the presidential candidate says in her final campaign speech. Karapatan nating magkaroon na kinabukasang may dignidad, at tungkulin natin na ipaglaban ito. Natutunan natin, walang imposible,' the presidential candidate says in her final campaign speech.",
  };

  return (
    /* view/edit program modal */
    <Modal
      visible={viewModal}
      width={700}
      closable={false}
      title={`${mode == "edit" ? "Edit " : ""}*Put title here*`} // di ko kabalo sumpay hahahha
      okText={mode == "edit" ? "Save " : ""}
      okButtonProps={mode == "edit" ? "" : { style: { display: "none" } }}
      onCancel={() => {
        setViewModal(false);
        setMode("");
        setContent("");
        setContentNotEditing(false);
      }}
      destroyOnClose={true}
    >
      <Form layout="vertical">
        <Row>
          {/*value={mode == 'edit' ? data?.title : ''} */}
          <Form.Item
            label="Name of Program"
            name="programname"
            required={[{ required: true }]}
          >
            <Input
              value={mode == "edit" ? data?.programname : ""}
              placeholder={mode == "edit" ? data?.programname : ""}
              allowClear
              style={{ width: 625 }}
            />
          </Form.Item>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Date Created"
              name="dateCreated"
              required={[{ required: true }]}
            >
              <Input
                value={mode == "edit" ? data?.dateCreated : ""}
                placeholder={mode == "edit" ? data?.dateCreated : ""}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Program In-charge"
              name="incharge"
              required={[{ required: true }]}
            >
              <Input
                value={mode == "edit" ? data?.incharge : ""}
                placeholder={mode == "edit" ? data?.incharge : ""}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item
              label=" Status"
              name="status"
              required={[{ required: true }]}
            >
              <Select
                value={mode == "edit" ? data?.status : ""}
                placeholder={mode == "edit" ? data?.status : ""}
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="expired">Expired</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="No. of Beneficiaries"
              name="noOfBenificiaries"
              required={[{ required: true }]}
            >
              <Input
                value={mode == "edit" ? data?.noOfBenificiaries : ""}
                placeholder={mode == "edit" ? data?.noOfBenificiaries : ""}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            label="Description"
            name="description"
            required={[{ required: true }]}
          >
            <TextArea
              value={mode == "edit" ? data?.description : ""}
              placeholder={mode == "edit" ? data?.description : ""}
              rows={8}
              allowClear
              style={{ width: 625 }}
            />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};
