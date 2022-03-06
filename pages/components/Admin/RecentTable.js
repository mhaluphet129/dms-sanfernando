import { useState, useEffect } from "react";
import { Table, Typography, notification } from "antd";
import axios from "axios";
export default () => {
  const [recentData, setRecentData] = useState();

  useEffect(async () => {
    let { data } = await axios.get("/api/admin", {
      params: { mode: "recent" },
    });
    if (data.success) setRecentData(data.users);
    else
      notification["danger"]({
        description: "Error in the server",
      });
  }, []);
  const columns = [
    {
      title: "Email",
      align: "center",
      render: (_, row) => (
        <Typography.Text type='link'>{row.email}</Typography.Text>
      ),
    },
    {
      title: "Username",
      align: "center",
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
  ];
  return (
    <>
      <h4>Recent add admin</h4>
      <Table columns={columns} dataSource={recentData} />
    </>
  );
};
