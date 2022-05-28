import { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Image,
  Form,
  Input,
  Spin,
  DatePicker,
  Upload,
  Empty,
  notification,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";

import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

import TimelineDisplay from "../assets/js/TimelineDisplay";
import ViewProfile from "./Livelihood/ViewProfile";
import TitleText from "../assets/js/TitleText";

import QRCode from "qrcode";
import parse from "html-react-parser";

import { getBase64 } from "../assets/js/utilities";

export default ({ data, visible, setVisible, callback }) => {
  const [profileVisible, setProfileVisible] = useState();
  const [loader, setLoader] = useState();
  const [trigger, setTrigger] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [loggerModal, setLoggerModal] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [openModalPicture, setOpenModalPicture] = useState(false);

  const [viewQRVisible, setViewQRVisible] = useState(false);
  const [qr, setQr] = useState();
  const [openBrgyModal, setOpenBrgyModal] = useState(false);
  const [brgyFile, setBrgyFile] = useState();

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleUpload = async () => {
    let formData = new FormData();
    formData.append("id", data?._id);
    files.forEach((file) => {
      formData.append("photos", file.originFileObj);
    });

    const res = await axios.post("/api/uploadfiles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res?.data.success) {
      let filenames = [];
      res?.data?.files.forEach((el) => {
        filenames.push(el.filename);
      });

      let res2 = await axios.post("/api/livelihood", {
        payload: {
          id: data?._id,
          filenames,
        },
        mode: "push-photo",
      });

      if (res2?.data.success) message.success(res?.data.message);
    }
  };

  const handleUpload2 = async () => {
    let formData = new FormData();
    formData.append("id", data?._id);
    formData.append("photo", profile.originFileObj);

    const res = await axios.post("/api/upload2", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res?.data.success) {
      let path = res.data?.path.replace("public", "");
      let res2 = await axios.post("/api/livelihood", {
        payload: {
          id: data?._id,
          path,
        },
        mode: "profile-update",
      });

      if (res2?.data.success) message.success(res2?.data.message);
    }
  };

  const handleUploadBrgy = async () => {
    let formData = new FormData();
    formData.append("id", data?._id);
    formData.append("photo", brgyFile.originFileObj);

    const res = await axios.post("/api/uploadbrgy", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res?.data.success) {
      let path = res.data?.path.replace("public", "");
      let res2 = await axios.put("/api/livelihood", {
        payload: {
          mode: "change-profile",
          id: data?._id,
          path,
        },
      });

      if (res2?.data.success) {
        callback();
        setOpenBrgyModal(false);
        setVisible(false);
        setBrgyFile();
        message.success(res2?.data.message);
      }
    }
  };

  useEffect(async () => {
    if (visible) {
      setLoader("fetch");
      let res = await axios.get("/api/programs", {
        params: {
          mode: "fetch-programs",
          _id: data?._id,
        },
      });

      let res2 = await axios.get("/api/livelihood", {
        params: {
          mode: "fetch-history",
          id: data?._id,
        },
      });

      if (res.data.success && res2.data.success) {
        setLoader("");
        setPrograms(res?.data?.data[0]?.programsObj);
        setTimeline(res2.data.data);
      }
    }
  }, [visible, trigger]);

  useEffect(() => {
    QRCode.toString(data?._id?.toString(), function (err, url) {
      setQr(parse(url || ""));
    });
  }, [viewQRVisible]);

  return (
    <>
      <Modal
        visible={openBrgyModal}
        onCancel={() => setOpenBrgyModal(false)}
        closable={false}
        title='Barangay Clearance'
        footer={null}
        destroyOnClose
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data?.brgyImage ? (
            <Image src={data?.brgyImage} width='100%' />
          ) : (
            <Empty />
          )}

          <Upload
            onChange={(e) => setBrgyFile(e.file)}
            disabled={brgyFile != undefined}
            accept='image/*'
          >
            <Button
              style={{ width: 200, marginTop: 5 }}
              onClick={() => {
                if (brgyFile != undefined) {
                  handleUploadBrgy();
                }
              }}
            >
              {brgyFile != undefined ? "Save" : "Update Barangay Clearance"}
            </Button>
          </Upload>
        </div>
      </Modal>
      <Modal
        visible={openModalPicture}
        onCancel={() => setOpenModalPicture(false)}
        closable={false}
        okText='Upload'
        onOk={handleUpload2}
      >
        <Upload
          onChange={(e) => setProfile(e.file)}
          listType='picture-card'
          onPreview={handlePreview}
          accept='image/*'
        >
          {!profile ? uploadButton : null}
        </Upload>
      </Modal>
      <Modal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        closable={false}
        okText='Upload'
        onOk={handleUpload}
      >
        <Upload
          fileList={files}
          onPreview={handlePreview}
          listType='picture-card'
          onChange={(e) => {
            setFiles(e.fileList);
            setOpenModal(true);
          }}
          accept='image/*'
          multiple
        >
          {files.length > 10 ? null : uploadButton}
        </Upload>
      </Modal>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt='example'
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <Modal
        visible={viewQRVisible}
        title='View QR'
        footer={null}
        onCancel={() => setViewQRVisible(false)}
        width={200}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: 250 }}>{qr}</div>
        <small style={{ color: "#aaa", textAlign: "center", width: "100%" }}>
          id: {data?._id}
        </small>
        <br />
        <Typography.Text strong>
          {TitleText(
            `${data?.name?.name} ${
              data?.name?.middleName?.length > 0
                ? data?.name?.middleName[0] + "."
                : ""
            } ${data?.name?.lastName}`
          )}
        </Typography.Text>
      </Modal>
      <Modal
        title='Logs'
        visible={loggerModal}
        onCancel={() => setLoggerModal(false)}
        closable={false}
        okText='Add'
        onOk={form.submit}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          onFinish={async (val) => {
            const { message, date } = val;

            let res = await axios.post("/api/livelihood", {
              payload: {
                id: data?._id,
                message,
                date,
              },
              mode: "add-to-logs",
            });

            if (res.data.success) {
              notification["success"]({
                placement: "bottomRight",
                message: res.data.message,
              });
              setTrigger(trigger + 1);
              setLoggerModal(false);
            }
          }}
        >
          <Form.Item label='Message' name='message'>
            <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
          </Form.Item>
          <Form.Item label='Date' initialValue={moment()} name='date'>
            <DatePicker defaultValue={moment()} format='MM-DD-YYYY' />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visible}
        width={1000}
        closable={false}
        footer={null}
        title={
          <>
            <Tag color={data?.isActive ? "#87d068" : "#f50"}>
              {data?.isActive ? (
                <span>
                  <CheckCircleOutlined /> Active
                </span>
              ) : (
                <span>
                  <CloseCircleOutlined /> Inactive
                </span>
              )}
            </Tag>

            <div style={{ float: "right" }}>
              <Space direction='horizontal'>
                <Button
                  style={{ width: "100%", marginBottom: 5 }}
                  onClick={() => setOpenModal(true)}
                >
                  Upload File
                </Button>
                <Button
                  type='primary'
                  style={{ width: "100%", marginBottom: 5 }}
                  onClick={() => setLoggerModal(true)}
                >
                  Add to Logs
                </Button>
              </Space>
            </div>
          </>
        }
        onCancel={() => {
          setVisible(false);
        }}
      >
        {/* full details */}
        <ViewProfile
          profileVisible={profileVisible}
          setProfileVisible={setProfileVisible}
          info={data}
          programs={programs}
        />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data?.profileImage ? (
                <Image width={250} src={data?.profileImage} />
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
            </div>
            <div style={{ textAlign: "center", marginBottom: 5 }}>
              <small style={{ color: "#aaa" }}>id: {data?._id}</small>
              <br />
              {data?.profile?.type.map((el, i) => (
                <Tag color={color[el]} key={i}>
                  {el}
                </Tag>
              ))}
            </div>
            {/* <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => setOpenModalPicture(true)}
            >
              Change profile picture
            </Button> */}
            <Button style={{ width: "100%", marginBottom: 5 }}>
              Edit Profile
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => {
                setProfileVisible(true);
              }}
            >
              View Full Profile
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => {
                setViewQRVisible(true);
              }}
            >
              View QR
            </Button>
            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={() => {
                setOpenBrgyModal(true);
              }}
            >
              View / Update BARANGAY CLEARANCE
            </Button>
            <Button
              type='dashed'
              size='large'
              style={{
                backgroundColor: "#70e040",
                color: "#fff",
                width: "100%",
              }}
              onClick={async () => {
                let res = await axios.get("/api/livelihood", {
                  params: {
                    mode: "log",
                    type: "visit",
                    id: data?._id,
                    barangay: data?.address?.barangay || "",
                    name: TitleText(
                      `${data?.name.lastName}, ${data?.name.name} ${data?.name.middleName[0]}.`
                    ),
                  },
                });

                if (res.data.success) {
                  notification["success"]({
                    placement: "bottomRight",
                    message: res.data.message,
                  });
                  setVisible(false);
                }
              }}
            >
              VISIT TODAY
            </Button>
          </Col>
          <Col span={8}>
            <Space
              direction='vertical'
              size='small'
              style={{ display: "flex" }}
            >
              <Typography.Text type='secondary'>
                Name: <br />
                <Typography.Text strong>
                  {TitleText(
                    `${data?.name?.name} ${
                      data?.name?.middleName?.length > 0
                        ? data?.name?.middleName[0] + "."
                        : ""
                    } ${data?.name?.lastName}`
                  )}
                </Typography.Text>
              </Typography.Text>

              <Typography.Text type='secondary'>
                Address: <br />
                <Typography.Text strong>
                  {TitleText(
                    `${data?.address?.street}, ${data?.address?.barangay}`
                  )}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                Contact Number: <br />
                <Typography.Text strong>0{data?.contactNum}</Typography.Text>
              </Typography.Text>
              <Typography.Text type='secondary'>
                In case of emergency: <br />
                <Typography.Text strong>
                  {data?.emergency?.name || "Not set"}
                </Typography.Text>
                <br />
                <Typography.Text strong>
                  {data?.emergency?.number
                    ? "0" + data?.emergency?.number
                    : "Not set"}
                </Typography.Text>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={8}>
            {loader == "fetch" ? (
              <Spin style={{ textAlign: "center", width: "100%" }} />
            ) : (
              <TimelineDisplay data={timeline} />
            )}
            <Button
              style={{
                marginLeft: "50%",
                marginTop: 10,
                transform: "translateX(-50%)",
              }}
            >
              View full logs
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
