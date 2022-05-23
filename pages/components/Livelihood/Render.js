import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Tag,
  Space,
  Card,
  Typography,
  Empty,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import Profiler from "../ProfilerModal";
import titleText from "../../assets/js/TitleText";

ChartJS.register(ArcElement, Tooltip, Legend);

export default ({ data, pieData, type, loader }) => {
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [modifiedData, setModifiedData] = useState({});
  const [activeTab, setActiveTab] = useState("crops");

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const columns = [
    {
      title: "Name",
      width: 180,
      render: (_, row) => (
        <Button
          type='link'
          onClick={async () => {
            setOpenModal(true);
            setRowData(row);
          }}
        >
          {titleText(
            `${row?.name.name} ${row?.name.middleName[0] || ""}. ${
              row?.name.lastName
            } `
          )}
          {`${
            row?.name.extensionName?.length != 0 &&
            row?.name.extensionName != undefined
              ? row?.name.extensionName
              : ""
          }`}
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
      width: 100,
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
  ];

  //for crops pie graph data
  const _data = {
    labels: [...Object.keys(modifiedData[activeTab] || {})],
    datasets: [
      {
        label: "crops",
        data: [...Object.values(modifiedData[activeTab] || {})],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const tabContent = {
    crops:
      Object.keys(pieData?.crops || {})?.length > 0 ? (
        <Pie data={_data} />
      ) : (
        <Empty />
      ),
    livestocks:
      Object.keys(pieData?.livestocks || {})?.length > 0 ? (
        <Pie data={_data} />
      ) : (
        <Empty />
      ),
    poultry:
      Object.keys(pieData?.poultry || {})?.length > 0 ? (
        <Pie data={_data} />
      ) : (
        <Empty />
      ),
  };

  useEffect(() => {
    setModifiedData((el) => {
      let _ = {
        crops: {},
        livestocks: {},
        poultry: {},
      };

      for (let k in pieData) {
        let data = Object.fromEntries(
          Object.entries(pieData[k]).sort(([, a], [, b]) => b - a)
        );

        if (k == "crops") {
          if (Object.keys(data).length > 2) {
            _.crops[Object.keys(data)[0]] = Object.values(data)[0];
            _.crops[Object.keys(data)[1]] = Object.values(data)[1];
            _.crops[Object.keys(data)[2]] = Object.values(data)[2];
          } else {
            for (let i = 0; i < Object.keys(data).length; i++)
              _.crops[Object.keys(data)[i]] = Object.values(data)[i];
          }

          if (Object.keys(data).length > 2) _.crops.others = 0;
          Object.entries(data).forEach(([], index) => {
            if (index > 2) _.crops["others"]++;
          });
        } else if (k == "livestocks") {
          if (Object.keys(data).length > 2) {
            _.livestocks[Object.keys(data)[0]] = Object.values(data)[0];
            _.livestocks[Object.keys(data)[1]] = Object.values(data)[1];
            _.livestocks[Object.keys(data)[2]] = Object.values(data)[2];
          } else {
            for (let i = 0; i < Object.keys(data).length; i++)
              _.livestocks[Object.keys(data)[i]] = Object.values(data)[i];
          }

          if (Object.keys(data).length > 2) _.livestocks.others = 0;
          Object.entries(data).forEach(([], index) => {
            if (index > 2) _.livestocks["others"]++;
          });
        } else if (k == "poultry") {
          if (Object.keys(data).length > 2) {
            _.poultry[Object.keys(data)[0]] = Object.values(data)[0];
            _.poultry[Object.keys(data)[1]] = Object.values(data)[1];
            _.poultry[Object.keys(data)[2]] = Object.values(data)[2];
          } else {
            for (let i = 0; i < Object.keys(data).length; i++)
              _.poultry[Object.keys(data)[i]] = Object.values(data)[i];
          }

          if (Object.keys(data).length > 2) _.poultry.others = 0;
          Object.entries(data).forEach(([], index) => {
            if (index > 2) _.poultry["others"]++;
          });
        }
      }

      return _;
    });
  }, [pieData]);

  return (
    <>
      <Profiler data={rowData} visible={openModal} setVisible={setOpenModal} />
      <Row>
        <Col span={15}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 500 }}
            title={() => "Livelihood"}
            rowKey={(_) => _._id}
            loading={loader == "fetch-livelihood"}
            pagination={{
              pageSize: 10,
            }}
          />
        </Col>
        <Col span={8} offset={1}>
          <Card>
            <Space>
              <Space direction='vertical'>
                {type == "Farmer" && (
                  <Card
                    title={
                      <span>
                        {titleText(`${activeTab} `)}
                        <Typography.Text type='secondary'>{`total: ${Object.values(
                          modifiedData[activeTab] || {}
                        ).reduce(
                          (prev, curr) => prev + curr,
                          0
                        )}`}</Typography.Text>
                      </span>
                    }
                    style={{ width: 325 }}
                    tabList={[
                      {
                        key: "crops",
                        tab: "Crops",
                      },
                      {
                        key: "livestocks",
                        tab: "Livestocks",
                      },
                      { key: "poultry", tab: "Poultry" },
                    ]}
                    activeTabKey={activeTab}
                    onTabChange={(k) => {
                      setActiveTab(k);
                    }}
                  >
                    {tabContent[activeTab]}
                  </Card>
                )}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};
