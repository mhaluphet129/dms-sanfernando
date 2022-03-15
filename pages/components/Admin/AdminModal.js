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
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import FloatLabel from "../../assets/js/FloatLabel";
import { Label01 } from "../../assets/js/Labels";
import moment from "moment";
import axios from "axios";

export default ({ type, visibility, onClose, data }) => {
  const [_name, setName] = useState("");
  const [_lastname, setLastname] = useState("");
  const [_username, setUsername] = useState("");
  const [_email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [viewModalPass, setViewModalPass] = useState(false);

  //for passwords
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [newPass2, setNewPass2] = useState();

  const handleChangePass = async () => {
    let res = await axios.get("/api/admin", {
      params: {
        mode: "changepass",
        _id: data?._id,
      },
    });
    let resp = res?.data;
    if (!resp.success) {
      notification["warn"]({
        placement: "bottomLeft",
        description: data?.message,
      });
      return;
    }

    if (
      resp.user[0].password != currentPass &&
      data?.hasOwnProperty("password")
    ) {
      message.error("Current password is wrong");
      return;
    }

    if (newPass != newPass2) {
      message.error("New passwords didn't match");
      return;
    }

    await axios
      .put("api/admin", {
        payload: {
          id: data?._id,
          password: newPass,
          addtimeline: {
            time: moment(),
            label: data?.hasOwnProperty("password")
              ? "Password is changed."
              : "Password is set",
          },
        },
      })
      .then(() => message.success("Successfully change the password"));
  };

  const handleSave = async () => {
    let flag = [false, false, false, false];
    let obj = { id: data?._id };
    if (_name.length != 0) {
      obj.name = _name;
      flag[0] = true;
    }
    if (_lastname.length != 0) {
      obj.lastname = _lastname;
      flag[1] = true;
    }
    if (_username.length != 0) {
      obj.username = _username;
      flag[2] = true;
    }
    if (_email.length != 0) {
      obj.email = _email;
      flag[3] = true;
    }
    const editTimeline = Label01(flag);
    if (editTimeline.length > 0) {
      obj.addtimeline = {
        time: moment(),
        label: editTimeline,
      };
    }

    let res = await axios.put("/api/admin", {
      payload: obj,
    });
    let resp = res.data;
    if (resp.success) {
      notification["success"]({
        message: resp.message,
      });
    } else message.error(resp.message);
  };

  return (
    <>
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
        onOk={() => handleSave()}
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
                  fontSize: 150,
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
              Upload/Change Picture
            </Button>

            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => setViewModalPass(true)}
            >
              {data?.hasOwnProperty("password")
                ? "Change Password"
                : "Set Password"}
            </Button>
            <Button style={{ width: "100%", marginBottom: 5 }}>Timeline</Button>

            {type == "superadmin" && data?.role != "superadmin" && (
              <Button style={{ width: "100%" }}>
                Grant Super Admin access
              </Button>
            )}
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
                  value={
                    (_username != undefined && _username) || data?.username
                  }
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
      <Modal
        title='Change your password'
        visible={viewModalPass}
        onCancel={() => setViewModalPass(false)}
        okText='Change'
        okButtonProps={{ disabled: !currentPass && !newPass && !newPass2 }}
        onOk={handleChangePass}
        destroyOnClose
      >
        {data?.hasOwnProperty("password") ? (
          <FloatLabel label='Current Password' value={currentPass}>
            <Input
              type='password'
              onChange={(el) => setCurrentPass(el.target.value)}
            />
          </FloatLabel>
        ) : null}
        <FloatLabel label='New Password' value={newPass}>
          <Input
            type='password'
            onChange={(el) => setNewPass(el.target.value)}
          />
        </FloatLabel>
        <FloatLabel label='Repeat New Password' value={newPass2}>
          <Input
            type='password'
            onChange={(el) => setNewPass2(el.target.value)}
          />
        </FloatLabel>
      </Modal>
    </>
  );
};
