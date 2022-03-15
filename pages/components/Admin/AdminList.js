import { useState, useEffect } from "react";
import {
  Table,
  Space,
  Popconfirm,
  Typography,
  Spin,
  Tag,
  Card,
  Dropdown,
  Menu,
  notification,
  message,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { UpdateModal } from "./AdminForm";
import AdminModal from "./AdminModal";
import axios from "axios";

export default ({ setTotalAdmin, setTotalSuperAdmin, setFetching }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [modalData, setModalData] = useState();
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);

  const fetch = async (params) => {
    setIsFetching(true);
    setFetching(true);
    let { data } = await axios.get("/api/admin", {
      params: { ...params },
    });
    if (data.success) {
      setData(data.users);
      setTotal(data.total);
      setTotalAdmin(data.total);
      setTotalSuperAdmin(data.totalSA);
      notification["success"]({
        placement: "bottomRight",
        description: data.message,
      });
    } else message.error(data.message);
    setIsFetching(false);
    setFetching(false);
  };

  const handleDelete = async (id) => {
    setIsFetching(true);
    let { data } = await axios.get("/api/admin", {
      params: { mode: "delete", id },
    });

    if (data.success) {
      notification["success"]({
        description: data.message,
      });
    } else message.error(data.message);
    setIsFetching(false);
  };

  const openAdminModal = (data) => {
    setModalVisible(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "Username",
      render: (_, row) => {
        return row.username ? (
          <Typography.Text onClick={() => openAdminModal(row)}>
            {row.username}
          </Typography.Text>
        ) : (
          <Typography.Text
            onClick={() => openAdminModal(row)}
            type='secondary'
            italic
          >
            Not set yet
          </Typography.Text>
        );
      },
    },
    {
      title: "Email",
      render: (_, row) =>
        row?.role == "admin" ? (
          <Typography.Text onClick={() => openAdminModal(row)} type='link'>
            {row.email}
          </Typography.Text>
        ) : (
          <Typography.Text
            onClick={() => openAdminModal(row)}
            type='secondary'
            italic
          >
            Superadmin email can only be viewed on settings
          </Typography.Text>
        ),
    },
    {
      title: "role",
      align: "center",
      render: (_, row) => (
        <Tag
          onClick={() => openAdminModal(row)}
          color={row?.role == "admin" ? "blue" : "green"}
        >
          {row?.role == "admin" ? "Admin" : "Super Admin"}
        </Tag>
      ),
    },
    {
      title: "Full Name",
      render: (_, row) => {
        return row.name ? (
          <Typography.Text onClick={() => openAdminModal(row)}>
            {row.name} {row.lastname}
          </Typography.Text>
        ) : (
          <Typography.Text
            onClick={() => openAdminModal(row)}
            type='secondary'
            italic
          >
            Not set yet
          </Typography.Text>
        );
      },
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Dropdown
              placement='topRight'
              overlay={
                <Menu>
                  <Menu.Item>
                    <Typography.Link
                      type='link'
                      style={{ color: "#df4759" }}
                      onClick={() => handleDelete(row._id)}
                    >
                      Remove
                    </Typography.Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Typography.Link
                      type='text'
                      onClick={() => {
                        setOpenModal(true);
                        setModalData(row);
                      }}
                    >
                      Update
                    </Typography.Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <EllipsisOutlined />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetch({
      current: 1,
      pageSize: 5,
      mode: "fetch",
    });
  }, []);

  return (
    <>
      <UpdateModal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        datas={modalData}
      />
      <AdminModal
        visibility={modalVisible}
        onClose={() => setModalVisible(false)}
        data={modalData}
      />
      <Spin spinning={isFetching}>
        <Card hoverable>
          <h3>List of all Admins</h3>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 5,
              total,
            }}
            onChange={(params) => fetch({ ...params, mode: "fetch" })}
          />
        </Card>
      </Spin>
    </>
  );
};
