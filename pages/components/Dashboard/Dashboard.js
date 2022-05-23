import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Tabs,
  Table,
  message,
} from "antd";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default () => {
  const [type, setType] = useState("Farmer");
  const [loader, setLoader] = useState("");
  const [data, setData] = useState();
  const [newData, setNewData] = useState();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const farmerdata = {
    labels: newData?.bar?.label,
    datasets: [
      {
        label: "Total number of farmers",
        data: newData?.bar?.value,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  const columns = [
    {
      title: "Barangay",
      dataIndex: "_id",
      key: "barangay",
    },
    { title: "Hectares", dataIndex: "total", key: "hectare" },
  ];

  const cropsdata = {
    labels: newData?.pie?.crops?.label,
    datasets: [
      {
        label: "crops",
        data: newData?.pie?.crops?.value,
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

  //for livestock pie graph data
  const livestockdata = {
    labels: newData?.pie?.livestock?.label,
    datasets: [
      {
        label: "livestock",
        data: newData?.pie?.livestock?.value,
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

  //for poultry pie graph data
  const poultrydata = {
    labels: newData?.pie?.poultry?.label,
    datasets: [
      {
        label: "poultry",
        data: newData?.pie?.poultry?.value,
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

  const farmworkerdata = {
    labels: newData?.farmworker?.label,
    datasets: [
      {
        label: "Total no. of farmworkers",
        data: newData?.farmworker?.value,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  const workdata = {
    labels: newData?.pie?.farmworker?.label,
    datasets: [
      {
        label: "Farmworkers",
        data: newData?.pie?.farmworker?.value,
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
  /* end */

  /* dummy data for fisherfolk */
  //for bargraph dummy fisherfolk data
  const fisherfolkdata = {
    labels: newData?.fisherfolk?.label,
    datasets: [
      {
        label: "Total no. per Barangay",
        data: newData?.fisherfolk?.value,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };
  //for type of fishing activity pie graph data
  const fishingdata = {
    labels: newData?.pie?.fisherfolk?.label,
    datasets: [
      {
        label: "crops",
        data: newData?.pie?.fisherfolk?.value,
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
    setLoader("fetch");
    try {
      let { data } = await axios.get("/api/main", {
        params: {
          mode: "dashboard-data",
        },
      });

      if (data.success) {
        setData(data.res);
        setLoader("");

        setNewData(() => {
          let label = [];
          let value = [];
          let label2 = [];
          let value2 = [];
          let label3 = [];
          let value3 = [];
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

          data?.res?.farmlandSummary?.forEach((el) => {
            label.push(el._id);
            value.push(el.count);
          });
          data?.res?.farmworkers?.forEach((el) => {
            label2.push(el._id);
            value2.push(el.count);
          });
          data?.res?.fisherfolk?.forEach((el) => {
            label3.push(el._id);
            value3.push(el.count);
          });
          data?.res?.cropsData?.forEach((el) => {
            cropsLabel.push(el?.name);
            cropsTotal.push(el?.total);
          });
          data?.res?.livestockData.forEach((el) => {
            livestockLabel.push(el?.name);
            livestockTotal.push(el?.total);
          });
          data?.res?.poultryData.forEach((el) => {
            poultryLabel.push(el?.name);
            poultryTotal.push(el?.total);
          });
          data?.res?.farmworkerData?.forEach((el) => {
            farmworkerLabel.push(el.name);
            farmworkerTotal.push(el.total);
          });
          data?.res?.fisherfolkdata?.forEach((el) => {
            fisherfolkLabel.push(el.name);
            fisherfolkTotal.push(el.total);
          });

          return {
            bar: {
              label,
              value,
              total: value.reduce((_, __) => _ + __, 0),
            },
            farmworker: {
              label: label2,
              value: value2,
              total: value2.reduce((_, __) => _ + __, 0),
            },
            fisherfolk: {
              label: label3,
              value: value3,
              total: value3.reduce((_, __) => _ + __, 0),
            },
            pie: {
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
            },
          };
        });
      }
    } catch {
      message.error("There is an error on the server");
    }
  }, []);

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>
                {loader == "fetch" ? "-" : data?.visitToday}
              </Typography.Title>
              <Typography.Text>No. of Visitor Today</Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>
                {" "}
                {loader == "fetch" ? "-" : data?.totalLivelihood}
              </Typography.Title>
              <Typography.Text>
                Total no. of registered livelihood
              </Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>
                  {loader == "fetch" ? 0 : data?.totalLivelihood}
                </Typography.Text>{" "}
                Livelihood Registered Today
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>
                {loader == "fetch" ? "-" : data?.totalPrograms}
              </Typography.Title>
              <Typography.Text>Total no. of Programs</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>
                  {loader == "fetch" ? 0 : data?.totalProgramsActive}
                </Typography.Text>{" "}
                Active Programs
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>
                {loader == "fetch" ? "-" : data?.totalFarmers}
              </Typography.Title>
              <Typography.Text>Total no. of Farmers</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>
                  {loader == "fetch" ? 0 : data?.totalFarmersToday}
                </Typography.Text>{" "}
                Newly Added Today
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>
                {loader == "fetch" ? "-" : data?.totalFarmworkers}
              </Typography.Title>
              <Typography.Text>Total no. of Farmworkers</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>
                  {loader == "fetch" ? 0 : data?.totalFarmworkersToday}
                </Typography.Text>{" "}
                Newly Added Today
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>
                {loader == "fetch" ? "-" : data?.totalFisherfolks}
              </Typography.Title>
              <Typography.Text>Total no. of Fisherfolks</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>
                  {loader == "fetch" ? 0 : data?.totalFisherfolksToday}
                </Typography.Text>{" "}
                Newly Added Today
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </Card>
      <Divider />

      {/*  TAbs*/}
      <Tabs
        defaultActiveKey='1'
        size='large'
        tabBarGutter={24}
        onChange={(e) => setType(e)}
        destroyInactiveTabPane
      >
        {/* For Farmer */}
        <Tabs.TabPane tab='Farmer' key='Farmer'>
          <Card>
            <Row gutter={[16, 16]}>
              {/* For Farmer Bargraph */}
              <Col span={16}>
                <Card
                  style={{ height: 450 }}
                  title={
                    <>
                      <span style={{ float: "left" }}>
                        Total no. of Farmers per Barangay
                      </span>
                      <span style={{ float: "right" }}>
                        total: {newData?.bar?.total}
                      </span>
                    </>
                  }
                >
                  <Bar options={options} data={farmerdata} />
                </Card>
              </Col>

              {/* For Farmer Total hectares */}
              <Col span={8}>
                <Card
                  style={{ height: 450 }}
                  title={"Total Farm Hectares per Barangay"}
                >
                  <Table
                    size='small'
                    scroll={{ y: 300 }}
                    columns={columns}
                    pagination={false}
                    dataSource={data?.farmlandSummary}
                  />
                </Card>
              </Col>

              {/*for pie chart crops */}
              <Col span={8}>
                <Card style={{ height: 450 }} title={"Crops"}>
                  <Pie data={cropsdata} />
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ height: 450 }} title={"Livestock"}>
                  <Pie data={livestockdata} />
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ height: 450 }} title={"Poultry"}>
                  <Pie data={poultrydata} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Tabs.TabPane>

        {/* FARMWORKER */}
        <Tabs.TabPane tab='Farmworker' key='Farmworker'>
          <Card>
            <Row gutter={[16, 16]}>
              {/* For Farmer Bargraph */}
              <Col span={16}>
                <Card
                  style={{ height: 450 }}
                  title={
                    <>
                      <span style={{ float: "left" }}>
                        Total no. of Farmworkers per Barangay
                      </span>
                      <span style={{ float: "right" }}>
                        total: {newData?.farmworker?.total}
                      </span>
                    </>
                  }
                >
                  <Bar options={options} data={farmworkerdata} />
                </Card>
              </Col>

              {/* For Farmworker pie graph */}
              <Col span={8}>
                <Card style={{ height: 450 }} title={"Kind of Work"}>
                  <Pie data={workdata} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab='Fisherfolk' key='Fisherfolk'>
          <Card>
            <Row gutter={[16, 16]}>
              {/* For Farmer Bargraph */}
              <Col span={16}>
                <Card
                  style={{ height: 450 }}
                  title={
                    <>
                      <span style={{ float: "left" }}>
                        Total no. of Fisherfolks per Barangay
                      </span>
                      <span style={{ float: "right" }}>
                        total: {newData?.fisherfolk?.total}
                      </span>
                    </>
                  }
                >
                  <Bar options={options} data={fisherfolkdata} />
                </Card>
              </Col>

              {/* For Fisherfolk pie graph */}
              <Col span={8}>
                <Card
                  style={{ height: 450 }}
                  title={"Type of Fishing Activity"}
                >
                  <Pie data={fishingdata} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
