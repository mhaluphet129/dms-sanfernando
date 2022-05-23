import {
  Typography,
  Button,
  Table,
  Modal,
  Popconfirm,
  Tooltip,
  notification,
} from "antd";
import axios from "axios";

export default ({ type, data, visible, onClose, cb }) => {
  const columns = [
    {
      title: "Email",
      render: (_, row) => <Typography.Text>{row?.email}</Typography.Text>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, row) => (
        <Tooltip
          title={type == "admin" ? "Only a superadmin can remove this" : null}
        >
          <Popconfirm
            okText='delete'
            okButtonProps={{
              type: "danger",
            }}
            icon={null}
            onConfirm={() => handleDelete(row?._id)}
            disabled={type == "admin"}
          >
            <Button type='danger' disabled={type == "admin"}>
              Remove
            </Button>
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  const handleDelete = async (id) => {
    let { data } = await axios.get("/api/admin", {
      params: { mode: "delete", id },
    });

    if (data.success) {
      cb();
      notification["success"]({
        description: data.message,
      });
    } else message.error(data.message);
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} closable={false}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(row) => row._id}
      />
    </Modal>
  );
};
