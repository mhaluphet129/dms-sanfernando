import { useEffect, useState } from "react";
import { Table, Typography, notification } from "antd";

export default () => {
  const [fetching, setFetching] = useState(false);

  const columns = [
    {
      title: "Name",
      align: "center",
      render: (_, row) => (
        <Typography.Text type='link'>{row.name}</Typography.Text>
      ),
    },
  ];

  useEffect(() => {
    setFetching(true);
    notification["success"]({
      placement: "bottomLeft",
      description: "Fetching list of farmers",
    });
    setFetching(false);
  }, []);
  return (
    <>
      <h4>List of all farmer</h4>
      <Table columns={columns} />
    </>
  );
};
