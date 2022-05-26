import React, { useState, useEffect, useRef } from "react";
import Clock from "react-digital-clock";
import {
  Layout,
  Typography,
  Avatar,
  Dropdown,
  Menu,
  AutoComplete,
  Tag,
  Input,
  Row,
  Col,
  Table,
  Drawer,
  Spin,
  message,
} from "antd";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axios from "axios";

import Page from "../components/Page";
import ProfilerModal from "../components/ProfilerModal";
import SidePane from "../components/Sider";
import Profiler from "../components/ProfilerModal";
import ViewProgam from "../components/Program/ViewProgam";

import { UserOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;
let socket;

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

export default () => {
  const [page, setPage] = useState();
  const [data, setData] = useState({});
  const [keyData, setKeyData] = useState();
  const [openProfiler, setOpenProfiler] = useState(false);
  const [profilerData, setProfilerData] = useState();
  const [names, setSearchNames] = useState([]);
  const timerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [loader, setLoader] = useState("");
  const [drawerData, setDrawerData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [typeSearch, setTypeSearch] = useState("");

  const [total, setTotal] = useState({
    farmer: 0,
    farmworker: 0,
    fisherfolk: 0,
  });

  const options = [
    {
      label: "Power Search",
      options: [
        renderItem("Farmer", total.farmer),
        renderItem("Farmworker", total.farmworker),
        renderItem("Fisherfolk", total.fisherfolk),
      ],
    },
  ];

  const handleSelect = async (e, i) => {
    if (typeSearch == "program") {
      let id = i.id;

      let res = await axios.get("/api/main", {
        params: {
          mode: "get-program",
          id,
        },
      });

      if (res?.data.success) {
        setModalData(res?.data.data[0]);
        setViewModal(true);
      }
    } else if (typeSearch == "brgy") {
    } else if (typeSearch == "") {
      setSelectedName(e);
      setOpenDrawer(true);
    } else {
      let id = i.id;

      let res = await axios.get("/api/main", {
        params: {
          mode: "qr",
          id,
        },
      });

      if (res?.data.success) {
        setRowData(res?.data.data[0]);
        setOpenModal(true);
      }
    }
  };

  const searchName = async (searchKeyword) => {
    let wordKey = searchKeyword.split(":")[0];
    let { data } = await axios.get("/api/main", {
      params: {
        mode: "fetch-search",
        searchWord: searchKeyword,
        pattern: wordKey,
      },
    });

    if (data.success) {
      setTypeSearch(wordKey.trim());
      if (wordKey.trim() == "program") {
        let obj = { label: "Programs", options: [] };

        data?.data.forEach((el) => {
          obj["options"].push({
            value: el.name,
            id: el?._id,
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {el.name}
              </div>
            ),
          });
        });
        setSearchNames((el2) => [...el2, obj]);
      } else if (wordKey.trim() == "brgy") {
      } else {
        let obj = { label: "Profile", options: [] };

        data?.data.forEach((el) => {
          obj["options"].push({
            value: `${el.name.name} ${el.name.lastName}`,
            id: el?._id,
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {`${el.name.name} ${el.name.lastName}`}
              </div>
            ),
          });
        });
        setSearchNames((el2) => [...el2, obj]);
      }
    } else console.log(data.message);
  };

  const runTimer = (searchKeyword) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(function () {
      searchName(searchKeyword);
    }, 500);
  };

  const menu = () => (
    <Menu>
      <Menu.Item style={{ marginTop: 10, marginBottom: 10 }}>
        <div>
          <ul style={{ listStyle: "none" }}>
            <li>
              <Typography.Text
                type='secondary'
                onClick={() => console.log(keyData)}
              >
                System Key:{" "}
                <Typography.Text keyboard>
                  {keyData?.length > 0 ? keyData[0].systemID : ""}
                </Typography.Text>
              </Typography.Text>
            </li>
            <li>
              <Typography.Text type='secondary'>
                Device ID:
                <Typography.Text keyboard>
                  {keyData?.length > 0 ? keyData[0].deviceID : ""}
                </Typography.Text>
              </Typography.Text>
            </li>
            <li>
              <Typography.Text type='secondary'>
                Status:{" "}
                {keyData?.length > 0 && (
                  <Tag
                    color={
                      keyData[0].connected
                        ? "green"
                        : keyData[0].deviceID == null
                        ? "orange"
                        : "red"
                    }
                  >
                    {keyData?.length > 0 && keyData[0].connected
                      ? "Connected"
                      : keyData[0].deviceID == null
                      ? "No connection"
                      : "Not Connected"}
                  </Tag>
                )}
              </Typography.Text>
            </li>
          </ul>
        </div>
      </Menu.Item>
      <Menu.Item style={{ marginTop: 10, marginBottom: 10 }}>
        <Typography.Text type='secondary'>
          {data.name && data.name.charAt(0).toUpperCase() + data.name.slice(1)}{" "}
          {data.lastname &&
            data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1)}{" "}
          {`(${data?.role})`}
        </Typography.Text>
      </Menu.Item>
      <Menu.Item key='2'>
        <Typography.Text>Account Settings</Typography.Text>
      </Menu.Item>
      <Menu.Item
        key='3'
        onClick={() => {
          socket.emit("remove-system", Cookies.get("key"));
          Cookies.remove("user");
          Cookies.remove("key");
          Cookies.set("loggedIn", "false");

          window.location.href = "/user/login";
        }}
      >
        <Typography.Text type='danger'>Logout</Typography.Text>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setData(JSON.parse(Cookies.get("user")));
  }, []);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.emit("get-key", { systemID: Cookies.get("key") });
      socket.on("on-get-key", (_key) => {
        if (_key.length == 0) message.error("Relogin");
        else setKeyData(_key);
      });

      socket.on("push-notify", (_key) => {
        if (Cookies.get("key") == _key)
          message.success("A new device is connected to this pc.");
      });

      socket.on("connected-to-system", (key, updatedKey) => {
        if (Cookies.get("key") == key) setKeyData(updatedKey);
      });

      socket.on("on-remove-device", ({ data }) => {
        if (data) setKeyData(data);
      });

      socket.on("on-open-profile", async ({ data, id }) => {
        if (
          data &&
          data[0].connected &&
          data[0].systemID == Cookies.get("key")
        ) {
          let { data } = await axios.get("/api/main", {
            params: { id, mode: "qr" },
          });
          if (data.success) {
            setProfilerData(data.data[0]);
            setOpenProfiler(true);
          }
        }
      });

      socket.on("update-connection", ({ data }) => {
        if (data.length > 0 && data[0].systemID == Cookies.get("key"))
          setKeyData(data);
      });
    });
  }, []);

  //search api call
  useEffect(async () => {
    if (!isTyping) {
      let res = await axios.get("/api/main", {
        params: {
          mode: "get-total",
        },
      });
      if (res?.data.success) setTotal(res?.data.data);
    }
  }, [isTyping]);

  //drawer api call
  useEffect(async () => {
    if (selectedName != "") {
      setLoader("fetch-drawer");
      let res = await axios.get("/api/main", {
        params: {
          mode: "get-specific",
          name: selectedName,
        },
      });

      if (res?.data.success) {
        setLoader("");
        setDrawerData(res?.data.data);
      }
    }
  }, [selectedName]);

  return (
    <>
      <ViewProgam
        viewModal={viewModal}
        setViewModal={setViewModal}
        modalData={modalData}
        cb={() => setTrigger(trigger + 1)}
      />
      <Profiler data={rowData} visible={openModal} setVisible={setOpenModal} />
      <Drawer
        visible={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={`${selectedName} List`}
      >
        <Spin spinning={loader == "fetch-drawer"}>
          <Table
            dataSource={drawerData}
            pagination={{
              pageSize: 10,
            }}
            columns={[
              {
                title: "Full Name",
                render: (_, row) => (
                  <Typography.Link
                    onClick={() => {
                      setOpenModal(true);
                      setRowData(row);
                    }}
                  >
                    {`${row?.name.name} ${row?.name.lastName}`}
                  </Typography.Link>
                ),
              },
            ]}
          />
        </Spin>
      </Drawer>
      <ProfilerModal
        data={profilerData}
        visible={openProfiler}
        setVisible={setOpenProfiler}
      />
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#eee",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "#44ac5c",
          }}
        >
          <Row style={{ width: "100%" }}>
            <Col
              span={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography.Title
                style={{ marginTop: 15, marginLeft: -40 }}
                className='clock'
                level={3}
              >
                <Clock />
              </Typography.Title>
            </Col>
            <Col
              span={15}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoComplete
                style={{
                  width: 450,
                }}
                options={isTyping ? names : options}
                filterOption={(inputValue, option) =>
                  option.value
                    ?.toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                onChange={(_, e) => {
                  setSearchNames([]);
                  runTimer(_);
                  setIsTyping(_.length != 0);
                }}
                onSelect={handleSelect}
                autoFocus
              >
                <Input.Search size='large' placeholder='Search profile here' />
              </AutoComplete>
            </Col>
            <Col
              span={1}
              offset={5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Dropdown overlay={menu}>
                <Avatar
                  size='large'
                  style={{ marginLeft: "auto", cursor: "pointer" }}
                >
                  {data.name && data.name[0].toUpperCase()}
                  {data.lastname && data.lastname[0].toUpperCase()}
                </Avatar>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <SidePane setPage={setPage} />
        <Content style={{ overflowY: "scroll", marginTop: 65 }}>
          <Page {...page} />
        </Content>
      </Layout>
    </>
  );
};
