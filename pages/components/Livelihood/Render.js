import React, { useState } from "react";
import { Row, Col, Table, Button, Tag, Space, Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Profiler from "../ProfilerModal";
import titleText from "../../assets/js/TitleText";

ChartJS.register(ArcElement, Tooltip, Legend);

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
      render: () => <Button icon={<SettingOutlined />}>Settings</Button>,
    },
  ];

  //for crops pie graph data
  const cropsdata = {
    labels: ["Corn", "Rice", "Sugarcane", "Watermelon", "Petchay"],
    datasets: [
      {
        label: "crops",
        data: [12564, 19456, 3234, 5246, 399],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Profiler data={rowData} visible={openModal} setVisible={setOpenModal} />
      <Row>
        <Col span={15}>
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
        <Col span={8} offset={1}>
          <Card>
            <Space>
              <Space direction='vertical'>
                <Card title='Crops' style={{ width: 325 }}>
                  <Pie data={cropsdata} />
                </Card>{" "}
                {/* gicard type ra nako arun dali ra madugangan if morethan 1 ang need sa pie graph ex. farmer = crops, livelihood, poultry piegraph */}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};
