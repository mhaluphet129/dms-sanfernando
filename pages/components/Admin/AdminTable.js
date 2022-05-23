import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Spin,
  Tag,
  Card,
  Button,
  Popconfirm,
  notification,
  message,
} from "antd";
import AdminModal from "./AdminModal";
import axios from "axios";

export default ({ setTotalAdmin, data, setData, type, trigger, cb, setSA }) => {
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
      setTotal(data.total);
      setTotalAdmin(data.total);
      setSA(data.superadmin);
    } else message.error(data.message);
    setIsFetching(false);
  };

  const handleDelete = async (id) => {
    setIsFetching(true);
    let { data } = await axios.get("/api/admin", {
      params: { mode: "delete", id },
    });

    if (data.success) {
      cb();
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
          <Typography.Text onClick={() => openAdminModal(row)} type='link'>
            {row.email}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "role",
      align: "center",
      render: (_, row) => (
        <Tag onClick={() => openAdminModal(row)} color='blue'>
          Admin
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
      render: (_, row) => (
        <Popconfirm
          title='Are you sure to delete this admin?'
          onConfirm={() => handleDelete(row._id)}
          okText='Yes'
          cancelText='No'
        >
          <Button type='danger' disabled={type != "superadmin"}>
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    fetch({
      current: 1,
      pageSize: 10,
      mode: "fetch",
    });
  }, [trigger]);

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
            scroll={{ y: 530 }}
            pagination={{
              pageSize: 10,
              total,
            }}
            rowKey={(row) => row?._id}
            onChange={(params) => fetch({ ...params, mode: "fetch" })}
          />
        </Card>
      </Spin>
    </>
  );
};
