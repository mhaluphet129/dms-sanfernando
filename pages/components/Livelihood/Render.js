import React, { useState } from "react";
import { Row, Col, Table, Button, Tag, Space } from "antd";
import Profiler from "../ProfilerModal";
import titleText from "../../assets/js/TitleText";

export default ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const columns = [
    {
      title: "Name",
      width: 200,
      render: (_, row) => (
        <Button
          type='text'
          onClick={() => {
            setOpenModal(true);
            setRowData(row);
          }}
        >
          {titleText(
            `${row?.name.name} ${row?.name.middleName[0] || ""}. ${
              row?.name.lastName
            } ${
              row?.name.extensionName?.length != 0 &&
              row?.name.extensionName != undefined
                ? row?.name.extensionName
                : ""
            }`
          )}
        </Button>
      ),
    },
    {
      title: "Brgy",
      width: 150,
      render: (_, row) => row?.address.barangay,
    },
    {
      title: "Contact No.",
      width: 150,
      render: (_, row) => row?.contactNum,
    },
    {
      title: "Livelihood",
      width: 150,
      render: (_, row) => (
        <Space direction='vertical'>
          {row?.profile?.type.map((el, i) => (
            <Tag key={i} color={color[el]}>
              {el}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Functions",
      align: "center",
      render: () => <Button>Full View</Button>,
    },
  ];
  return (
    <>
      <Profiler data={rowData} visible={openModal} setVisible={setOpenModal} />
      <Row>
        <Col span={17}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 500 }}
            pagination={{
              pageSize: 10,
              total: 999,
            }}
          />
        </Col>
        <Col span={7}>naolism</Col>
      </Row>
    </>
  );
};
