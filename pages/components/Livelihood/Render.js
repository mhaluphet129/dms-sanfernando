import React, { useState, useEffect, useRef } from "react";
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
  Input,
} from "antd";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { SearchOutlined } from "@ant-design/icons";

import Profiler from "../ProfilerModal";
import AddForm from "./AddForm";

import titleText from "../../../utilities/TitleText";

ChartJS.register(ArcElement, Tooltip, Legend);

export default ({ data, loader, setTrigger }) => {
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [modifiedData, setModifiedData] = useState({});
  const [activeTab, setActiveTab] = useState("crops");
  const [visible, setVisible] = useState(false);

  const searchInput = useRef(null);

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const columns = [
    {
      title: "Name",
      width: 150,
      render: (_, row) => (
        <Button
          type="link"
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
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search Name`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{
                width: 110,
              }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record.name.name.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    {
      title: "Brgy",
      width: 150,
      render: (_, row) => row?.address.barangay,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder="Search barangay"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onBlur={() => setSelectedKeys([])}
            onPressEnter={() => confirm()}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{
                width: 110,
              }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record.address.barangay
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    {
      title: "Contact No.",
      width: 150,
      render: (_, row) => row?.contactNum,
    },
    {
      title: "Livelihood",
      render: (_, row) => (
        <Space>
          {row?.profile?.type.map((el, i) => (
            <Tag key={i} color={color[el]}>
              {el}
            </Tag>
          ))}
        </Space>
      ),
      filters: [
        {
          text: "Farmer",
          value: "Farmer",
        },
        {
          text: "Farmworker",
          value: "Farmworker",
        },
        {
          text: "Fisherfolk",
          value: "Fisherfolk",
        },
      ],
      onFilter: (_, row) => row?.profile.type.includes(_),
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
  }, []);

  return (
    <>
      <AddForm
        visible={visible}
        setVisible={setVisible}
        cb={() => setTrigger(Math.random() * 100)}
      />
      <Profiler
        data={rowData}
        visible={openModal}
        setVisible={setOpenModal}
        callback={() => setTrigger(Math.random() * 100)}
      />
      <Row>
        <Col span={16}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 500 }}
            title={() => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography.Text>Profiles</Typography.Text>
                <Button style={{ width: 150 }} onClick={() => setVisible(true)}>
                  Add
                </Button>
              </div>
            )}
            rowKey={(_) => _._id}
            loading={loader == "fetch-livelihood"}
            pagination={{
              pageSize: 10,
            }}
          />
        </Col>
        <Col span={7} offset={1}>
          <Card>
            <Space>
              <Space direction="vertical">
                <Card
                  title={
                    <span
                      style={{
                        fontSize: "1.25em",
                      }}
                    >
                      {titleText(`${activeTab}`)}
                    </span>
                  }
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
                            position: "bottom",
                          },
                        },
                        responsive: true,
                      }}
                    />
                  ) : (
                    <Empty />
                  )}
                </Card>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};
