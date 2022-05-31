import { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  Input,
  Badge,
  Typography,
  Popconfirm,
  notification,
  Upload,
  Image,
  message,
} from "antd";
import Cookie from "js-cookie";
import moment from "moment";
import axios from "axios";

import FloatLabel from "../../assets/js/FloatLabel";
import Label01 from "../../assets/js/Labels";
import TimelineDisplay from "../../assets/js/TimelineDisplay";

import { UserOutlined } from "@ant-design/icons";

export default ({ visibility, setVisible, onClose, data, callback }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [viewModalPass, setViewModalPass] = useState(false);
  const [viewTimeline, setViewTimeline] = useState(false);

  //for passwords
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [newPass2, setNewPass2] = useState();

  //uploads
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [file, setFile] = useState();

  const handleSave = async () => {
    let flag = [false, false, false, false];
    let obj = { id: data?._id, mode: "edit" };
    if (name.length != 0) {
      obj.name = name;
      flag[0] = true;
    }
    if (lastname.length != 0) {
      obj.lastname = lastname;
      flag[1] = true;
    }
    if (username.length != 0) {
      obj.username = username;
      flag[2] = true;
    }
    if (email.length != 0) {
      obj.email = email;
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
    console.log(resp);
    if (resp.success) {
      notification["success"]({
        message: resp.message,
      });
      Cookie.set("user", JSON.stringify(resp.user));
      window.location.href = "/";
    } else message.error(resp.message);
  };

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

    let res2 = await axios.put("api/admin", {
      payload: {
        mode: "changepassword",
        id: data?._id,
        password: newPass,
        addtimeline: {
          time: moment(),
          label: data?.hasOwnProperty("password")
            ? "Password is changed."
            : "Password is set",
        },
      },
    });

    if (res2?.data.success) {
      message.success(res2?.data.message);
      setViewModalPass(false);
      setVisible(false);
      Cookie.set("user", JSON.stringify(res2?.data.user));
    }
  };

  const changeToSuperadmin = async () => {
    let res = await axios.put("/api/admin", {
      payload: {
        mode: "tosuperadmin",
        id: data?._id,
        saID: JSON.parse(Cookie.get("user"))._id,
        addtimeline: { time: moment(), label: "Upgraded to Superadmin" },
      },
    });
    let resp = res.data;
    if (resp.success) {
      notification["success"]({
        message: resp.message,
      });
      window.location.href = "/";
    } else message.error(resp.message);
  };

  const handleUpload = async () => {
    let formData = new FormData();
    formData.append("id", data?._id);
    formData.append("photo", file.originFileObj);

    const res = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res?.data.success) {
      let path = res.data?.path.replace("public", "");
      let res2 = await axios.put("/api/admin", {
        payload: {
          mode: "change-profile",
          id: data?._id,
          path,
        },
      });

      if (res2?.data.success) {
        // callback(); no working, no other choice :(
        setOpenUploadModal(false);
        message.success(res2?.data.message);
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    setName(data?.name);
    setLastname(data?.lastname);
    setUsername(data?.username);
    setEmail(data?.email);
  }, [data, visibility]);

  return (
    <>
      <Modal
        visible={openUploadModal}
        onCancel={() => setOpenUploadModal(false)}
        onOk={handleUpload}
      >
        <Upload onChange={({ file }) => setFile(file)} accept='image/*'>
          <Button>UPLOAD</Button>
        </Upload>
      </Modal>
      <Modal
        visible={visibility}
        onCancel={() => {
          onClose();
          setIsEditing(false);
        }}
        onOk={handleSave}
        okButtonProps={{
          disabled: !isEditing,
        }}
        width={700}
        title='View Admin'
        okText='Save'
        destroyOnClose
      >
        <Row justify='space-around' gutter={[16, 16]}>
          <Col span={10}>
            <Badge.Ribbon
              text={data?.role == "superadmin" ? "Super Admin" : "admin"}
              color={data?.role == "superadmin" ? "green" : "blue"}
            >
              {data?.profile ? (
                <Image width={250} src={data?.profile} />
              ) : (
                <UserOutlined
                  style={{
                    fontSize: 150,
                    color: "#aaa",
                    width: "100%",
                    textAlign: "center",
                  }}
                />
              )}
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

            <>
              <Button
                style={{ width: "100%", marginBottom: 5 }}
                onClick={() => setOpenUploadModal(true)}
              >
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
            </>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => {
                setViewTimeline(true);
              }}
            >
              Timeline
            </Button>

            <Popconfirm
              icon={null}
              title='Proceed to the operation?'
              okText='Yes'
              onConfirm={() => changeToSuperadmin()}
            >
              <Button style={{ width: "100%" }}>
                Grant Super Admin access
              </Button>
            </Popconfirm>
          </Col>
          <Col span={14}>
            <Form>
              <Form.Item name='name'>
                <FloatLabel label='name' bool={name?.length != 0}>
                  <Input
                    onChange={(e) => {
                      setName(e.target.value);
                      setIsEditing(true);
                    }}
                    value={name}
                    className='customInput'
                  />
                </FloatLabel>
              </Form.Item>
              <Form.Item name='lastname'>
                <FloatLabel label='lastname' bool={lastname?.length != 0}>
                  <Input
                    onChange={(e) => {
                      setLastname(e.target.value);
                      setIsEditing(true);
                    }}
                    value={lastname}
                    className='customInput'
                  />
                </FloatLabel>
              </Form.Item>
            </Form>
            <Form.Item name='username'>
              <FloatLabel label='username' bool={username?.length != 0}>
                <Input
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsEditing(true);
                  }}
                  value={username}
                  className='customInput'
                />
              </FloatLabel>
            </Form.Item>
            <Form.Item name='email'>
              <FloatLabel label='Email' bool={email?.length != 0}>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEditing(true);
                  }}
                  value={email}
                  className='customInput'
                />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
      </Modal>

      {/* will separate this soon hehehe */}
      <Modal
        title='Admins Timeline/History'
        visible={viewTimeline}
        onCancel={() => setViewTimeline(false)}
        footer={<Button onClick={() => setViewTimeline(false)}>Close</Button>}
        closable={false}
        bodyStyle={{ height: 500, overflowY: "scroll" }}
        destroyOnClose
      >
        <TimelineDisplay data={data?.timeline} />
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
              className='customInput'
            />
          </FloatLabel>
        ) : null}
        <FloatLabel label='New Password' value={newPass}>
          <Input
            type='password'
            onChange={(el) => setNewPass(el.target.value)}
            className='customInput'
          />
        </FloatLabel>
        <FloatLabel label='Repeat New Password' value={newPass2}>
          <Input
            type='password'
            onChange={(el) => setNewPass2(el.target.value)}
            className='customInput'
          />
        </FloatLabel>
      </Modal>
    </>
  );
};
