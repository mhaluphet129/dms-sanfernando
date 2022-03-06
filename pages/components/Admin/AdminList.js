import { useState, useEffect } from "react";
import {
  Table,
  Space,
  Popconfirm,
  Typography,
  Spin,
  notification,
  message,
} from "antd";
import { UpdateModal } from "./AdminForm";
import axios from "axios";

export default () => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [modalData, setModalData] = useState();
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);

  const fetch = async (params) => {
    setIsFetching(true);
    let { data } = await axios.get("/api/admin", {
      params: { ...params },
    });
    if (data.success) {
      setData(data.users);
      setTotal(data.total);
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

  const columns = [
    {
      title: "Email",
      render: (_, row) => (
        <Typography.Text type='link'>{row.email}</Typography.Text>
      ),
    },
    {
      title: "Username",
      render: (_, row) => {
        return row.username ? (
          <Typography.Text>{row.username}</Typography.Text>
        ) : (
          <Typography.Text type='secondary' italic>
            No data
          </Typography.Text>
        );
      },
    },
    {
      title: "Full Name",
      render: (_, row) => {
        return row.name ? (
          <Typography.Text>
            {row.name} {row.lastname}
          </Typography.Text>
        ) : (
          <Typography.Text type='secondary' italic>
            No data
          </Typography.Text>
        );
      },
    },
    {
      title: "Action",
      align: "center",
      render: (_, row) => (
        <Space>
          <Popconfirm
            title='Are you sure ?'
            okText='delete'
            okButtonProps={{ type: "danger" }}
            onConfirm={() => handleDelete(row._id)}
          >
            <Typography.Link type='link' style={{ color: "#df4759" }}>
              Remove
            </Typography.Link>
          </Popconfirm>
          <Typography.Link
            type='text'
            onClick={() => {
              setOpenModal(true);
              setModalData(row);
            }}
          >
            Update
          </Typography.Link>
        </Space>
      ),
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
      <Spin spinning={isFetching}>
        <h4>Admin Lists</h4>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            total,
          }}
          onChange={(params) => fetch({ ...params, mode: "fetch" })}
        />
      </Spin>
    </>
  );
};
