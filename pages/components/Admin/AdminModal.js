import { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  Input,
  Badge,
  Typography,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import FloatLabel from "../../assets/js/FloatLabel";
import axios from "axios";

export default ({ visibility, onClose, data }) => {
  const [_name, setName] = useState("");
  const [_lastname, setLastname] = useState("");
  const [_username, setUsername] = useState("");
  const [_email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Modal
      visible={visibility}
      onCancel={() => {
        onClose();
        setName("");
        setLastname("");
        setUsername("");
        setEmail("");
        setIsEditing(false);
      }}
      onOk={async () => {
        let obj = { id: data?._id };
        if (_name.length != 0) obj.name = _name;
        if (_lastname.length != 0) obj.lastname = _lastname;
        if (_username.length != 0) obj.username = _username;
        if (_email.length != 0) obj.email = _email;

        let { data } = await axios.put("/api/admin", {
          payload: obj,
        });
        if (data.success) {
          notification["success"]({
            message: data.message,
          });
        } else message.error(data.message);
      }}
      okButtonProps={{
        disabled: !isEditing,
      }}
      width={700}
      title='View Admin'
      okText='Save'
      destroyOnClose
    >
      <Row justify='space-around'>
        <Col span={10}>
          <Badge.Ribbon
            text={data?.role == "superadmin" ? "Super Admin" : "admin"}
            color={data?.role == "superadmin" ? "green" : "blue"}
          >
            <UserOutlined
              style={{
                fontSize: 200,
                color: "#aaa",
                width: "100%",
                textAlign: "center",
              }}
            />
          </Badge.Ribbon>
          <div style={{ textAlign: "center" }}>
            <Typography.Text
              type='secondary'
              style={{
                fontSize: 13,
              }}
            >
              id: {data?._id}
            </Typography.Text>
          </div>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Change Picture
          </Button>
          <Button style={{ width: "100%" }}>Change Password</Button>
        </Col>
        <Col span={13}>
          <Form>
            <Form.Item name='name'>
              <FloatLabel
                label='name'
                bool={
                  (_name && _name.length != 0) ||
                  (data?.name && data.name.length != 0)
                }
              >
                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsEditing(true);
                  }}
                  value={(_name != undefined && _name) || data?.name}
                />
              </FloatLabel>
            </Form.Item>
            <Form.Item name='lastname'>
              <FloatLabel
                label='lastname'
                bool={
                  (_lastname && _lastname.length != 0) ||
                  (data?.lastname && data.lastname.length != 0)
                }
              >
                <Input
                  onChange={(e) => {
                    setLastname(e.target.value);
                    setIsEditing(true);
                  }}
                  value={
                    (_lastname != undefined && _lastname) || data?.lastname
                  }
                />
              </FloatLabel>
            </Form.Item>
          </Form>
          <Form.Item name='username'>
            <FloatLabel
              label='username'
              bool={
                (_username && _username.length != 0) ||
                (data?.username && data.username.length != 0)
              }
            >
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsEditing(true);
                }}
                value={(_username != undefined && _username) || data?.username}
              />
            </FloatLabel>
          </Form.Item>
          <Form.Item name='email'>
            <FloatLabel
              label='Email'
              bool={
                data?.role == "superadmin"
                  ? true
                  : (_email && _email.length != 0) ||
                    (data?.email && data.email.length != 0)
              }
            >
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEditing(true);
                }}
                value={
                  data?.role == "superadmin"
                    ? "Email can only be viewed on settings"
                    : (_email != undefined && _email) || data?.email
                }
                disabled={data?.role == "superadmin" ? true : false}
              />
            </FloatLabel>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};
