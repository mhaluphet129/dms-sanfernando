import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Spin,
  Tag,
  Card,
  Button,
  notification,
  message,
} from "antd";
import AdminModal from "./AdminModal";
import axios from "axios";

export default ({ setTotalAdmin, setTotalSuperAdmin, data, setData, type }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [modalData, setModalData] = useState();
  const [total, setTotal] = useState(0);

  const fetch = async (params) => {
    setIsFetching(true);
    let { data } = await axios.get("/api/admin", {
      params: { ...params },
    });
    if (data.success) {
      setData(data.users);
      setTotal(data.total + data.totalSA);
      setTotalAdmin(data.total);
      setTotalSuperAdmin(data.totalSA);
      notification["success"]({
        placement: "bottomRight",
        description: data.message,
      });
    } else message.error(data.message);
    setIsFetching(false);
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
      align: "center",
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
      ellipsis: true,
      render: (_, row) => (
        <div style={{ width: 220 }}>
          {row?.role == "admin" ? (
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
          )}
        </div>
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
      align: "center",
      render: (_, row) => {
        return (
          <Button type='danger' onClick={() => handleDelete(row._id)}>
            Remove
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    fetch({
      current: 1,
      pageSize: 8,
      mode: "fetch",
    });
  }, []);

  return (
    <>
      <AdminModal
        visibility={modalVisible}
        onClose={() => setModalVisible(false)}
        data={modalData}
        type={type}
      />
      <Spin spinning={isFetching}>
        <Card hoverable>
          <h3>List of all Admins</h3>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 500 }}
            pagination={{
              pageSize: 8,
              position: ["bottomCenter"],
              total,
            }}
            onChange={(params) => fetch({ ...params, mode: "fetch" })}
          />
        </Card>
      </Spin>
    </>
  );
};
