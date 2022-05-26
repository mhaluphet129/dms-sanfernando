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
  message,
} from "antd";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import Profiler from "../ProfilerModal";
import titleText from "../../assets/js/TitleText";

ChartJS.register(ArcElement, Tooltip, Legend);

export default ({ data, type, loader, setTrigger }) => {
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
            `${row?.name.name} ${
              row?.name.middleName?.length > 0
                ? row?.name.middleName[0] + "."
                : ""
            } ${row?.name.lastName}`
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
    labels: modifiedData[activeTab]?.label,
    datasets: [
      {
        label: "crops",
        data: modifiedData[activeTab]?.value,
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

  useEffect(async () => {
    let res = await axios.get("/api/main", {
      params: {
        mode: "dashboard-data",
      },
    });

    if (res?.data.success) {
      setModifiedData(() => {
        let cropsLabel = [];
        let cropsTotal = [];
        let livestockLabel = [];
        let livestockTotal = [];
        let poultryLabel = [];
        let poultryTotal = [];
        let farmworkerLabel = [];
        let farmworkerTotal = [];
        let fisherfolkLabel = [];
        let fisherfolkTotal = [];

        Object.keys(res?.data?.res?.cropsData).forEach((el) => {
          cropsLabel.push(el);
        });
        Object.values(res?.data?.res?.cropsData).forEach((el) => {
          cropsTotal.push(el);
        });
        Object.keys(res?.data?.res?.livestockData).forEach((el) => {
          livestockLabel.push(el);
        });
        Object.values(res?.data?.res?.livestockData).forEach((el) => {
          livestockTotal.push(el);
        });
        Object.keys(res?.data?.res?.poultryData).forEach((el) => {
          poultryLabel.push(el);
        });
        Object.values(res?.data?.res?.poultryData).forEach((el) => {
          poultryTotal.push(el);
        });

        // res?.data?.cropsData?.forEach((el) => {
        //   cropsLabel.push(el?.name);
        //   cropsTotal.push(el?.total);
        // });
        // res?.data?.res?.livestockData.forEach((el) => {
        //   livestockLabel.push(el?.name);
        //   livestockTotal.push(el?.total);
        // });
        // res?.data?.res?.poultryData.forEach((el) => {
        //   poultryLabel.push(el?.name);
        //   poultryTotal.push(el?.total);
        // });
        // res?.data?.res?.farmworkerData?.forEach((el) => {
        //   farmworkerLabel.push(el.name);
        //   farmworkerTotal.push(el.total);
        // });
        // res?.data?.res?.fisherfolkdata?.forEach((el) => {
        //   fisherfolkLabel.push(el.name);
        //   fisherfolkTotal.push(el.total);
        // });

        return {
          crops: {
            label: cropsLabel,
            value: cropsTotal,
          },
          livestock: {
            label: livestockLabel,
            value: livestockTotal,
          },
          poultry: {
            label: poultryLabel,
            value: poultryTotal,
          },
          farmworker: {
            label: farmworkerLabel,
            value: farmworkerTotal,
          },
          fisherfolk: {
            label: fisherfolkLabel,
            value: fisherfolkTotal,
          },
        };
      });
    }
  }, [type]);

  return (
    <>
      <Profiler
        data={rowData}
        visible={openModal}
        setVisible={setOpenModal}
        callback={() => setTrigger(Math.random() * 100)}
      />
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
                    title={<span>{titleText(`${activeTab}`)}</span>}
                    style={{ width: 325 }}
                    tabList={[
                      {
                        key: "crops",
                        tab: "Crops",
                      },
                      {
                        key: "livestock",
                        tab: "Livestocks",
                      },
                      { key: "poultry", tab: "Poultry" },
                    ]}
                    activeTabKey={activeTab}
                    onTabChange={(k) => {
                      setActiveTab(k);
                    }}
                  >
                    {_data.labels?.length > 0 ? (
                      <Pie
                        data={_data}
                        options={{
                          plugins: {
                            legend: {
                              position: "right",
                            },
                          },
                        }}
                      />
                    ) : (
                      <Empty />
                    )}
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
