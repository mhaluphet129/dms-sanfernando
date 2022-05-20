import React, { useState } from "react";
import { Card, Row, Col, Space, Typography, Divider, Tabs, Table } from "antd";
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

  // For bargraph responsiveness
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  //bargraph per barangay labels
  const labels = [
    "Bonacao",
    "Cabuling",
    "Kawayan",
    "Cayaga",
    "Dao",
    "Durian",
    "Iglugsad",
    "Kalagangan",
    "Kibongcog",
    "Little Baguio",
    "Nacabuklad",
    "Namnam",
    "Palacpacan",
    "Halapitan",
    "San Jose",
    "Santo Domingo",
    "Tugop",
    "Matupe",
    "Bulalang",
    "Candelaria",
    "Mabuhay",
    "Magkalungay",
    "Malayanan",
    "Sacramento Valley",
  ];

  /* dummy data for farmer */
  //for bargraph dummy farmer data
  const farmerdata = {
    labels,
    datasets: [
      {
        label: "Total no. per Barangay",
        data: [
          156, 989, 836, 641, 778, 167, 292, 452, 343, 644, 75, 435, 64, 564,
          756, 765, 345, 653, 456, 123, 422, 231, 321, 323,
        ],
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  //   for total hectares per barangay
  const columns = [
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
    },
    { title: "Hectares", dataIndex: "hectare", key: "hectare" },
  ];

  const hectaredata = [
    {
      key: "1",
      barangay: "Bonacao",
      hectare: "156",
    },
    {
      key: "2",
      barangay: "Cabuling",
      hectare: "156",
    },
    {
      key: "3",
      barangay: "Kawayan",
      hectare: "989",
    },
    {
      key: "4",
      barangay: "Cayaga",
      hectare: "836",
    },
    {
      key: "5",
      barangay: "Dao",
      hectare: "641",
    },
    {
      key: "6",
      barangay: "Durian",
      hectare: "321",
    },
    {
      key: "7",
      barangay: "Iglugsad",
      hectare: "778",
    },
    {
      key: "8",
      barangay: "Kalagangan",
      hectare: "167",
    },
    {
      key: "9",
      barangay: "Kibongcog",
      hectare: "292",
    },
    {
      key: "10",
      barangay: "Little Baguio",
      hectare: "452",
    },
    {
      key: "11",
      barangay: "Nacabuklad",
      hectare: "343",
    },
    {
      key: "12",
      barangay: "Namnam",
      hectare: "644",
    },
    {
      key: "13",
      barangay: "Palacpacan",
      hectare: "75",
    },
    {
      key: "14",
      barangay: "Halapitan",
      hectare: "435",
    },
    {
      key: "15",
      barangay: "San Jose",
      hectare: "64",
    },
    {
      key: "16",
      barangay: "Santo Domingo",
      hectare: "564",
    },
    {
      key: "17",
      barangay: "Tugop",
      hectare: "756",
    },
    {
      key: "18",
      barangay: "Matupe",
      hectare: "765",
    },
    {
      key: "19",
      barangay: "Bulalang",
      hectare: "345",
    },
    {
      key: "20",
      barangay: "Candelaria",
      hectare: "653",
    },
    {
      key: "21",
      barangay: "Mabuhay",
      hectare: "456",
    },
    {
      key: "22",
      barangay: "Magkalungay",
      hectare: "123",
    },
    {
      key: "23",
      barangay: "Malayanan",
      hectare: "422",
    },
    {
      key: "24",
      barangay: "Sacramento Valley",
      hectare: "231",
    },
  ];
  //for crops pie graph data
  const cropsdata = {
    labels: ["corn", "rice", "sugracane", "others"],
    datasets: [
      {
        label: "crops",
        data: [321, 230, 123, 235],
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

  //for livestock pie graph data
  const livestockdata = {
    labels: ["cow", "carabao", "pig", "others"],
    datasets: [
      {
        label: "crops",
        data: [321, 230, 1355, 235],
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

  //for poultry pie graph data
  const poultrydata = {
    labels: ["chicken", "duck", "goose", "others"],
    datasets: [
      {
        label: "crops",
        data: [321, 230, 123, 235],
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
  /* end */

  /* dummy data for farmworker */
  //for bargraph dummy farmworker data
  const farmworkerdata = {
    labels,
    datasets: [
      {
        label: "Total no. per Barangay",
        data: [
          156, 989, 836, 641, 778, 167, 292, 452, 343, 644, 75, 435, 64, 564,
          756, 765, 345, 653, 456, 123, 422, 231, 321, 323,
        ],
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };
  //for kind of work pie graph data
  const workdata = {
    labels: [
      "Land Preparation",
      "Planting/Transplanting",
      "Cultivation",
      "Harvesting",
      "Others",
    ],
    datasets: [
      {
        label: "crops",
        data: [351, 130, 143, 235, 78],
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
  /* end */

  /* dummy data for fisherfolk */
  //for bargraph dummy fisherfolk data
  const fisherfolkdata = {
    labels,
    datasets: [
      {
        label: "Total no. per Barangay",
        data: [
          156, 989, 836, 641, 778, 167, 292, 452, 343, 644, 75, 435, 64, 564,
          756, 765, 345, 653, 456, 123, 422, 231, 321, 323,
        ],
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };
  //for type of fishing activity pie graph data
  const fishingdata = {
    labels: [
      "Fish Capture",
      "Fish Processing",
      "Fish Vending",
      "Aquaculture",
      "Gleaning",
      "Others",
    ],
    datasets: [
      {
        label: "crops",
        data: [351, 530, 223, 335, 143, 265],
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
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>574</Typography.Title>
              <Typography.Text>No. of Visitor Today</Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>10,099</Typography.Title>
              <Typography.Text>Total no. of registered client</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>500</Typography.Text> Client Registered
                Today
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>10,099</Typography.Title>
              <Typography.Text>Total no. of Programs</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>5000</Typography.Text> Active Programs
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>10,099</Typography.Title>
              <Typography.Text>Total no. of Farmers</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>500</Typography.Text> Newly Added Today
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>10,099</Typography.Title>
              <Typography.Text>Total no. of Farmworkers</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>500</Typography.Text> Newly Added Today
              </Typography.Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 150 }}>
              <Typography.Title level={2}>10,099</Typography.Title>
              <Typography.Text>Total no. of Fisherfolks</Typography.Text>
              <br />
              <Typography.Text>
                <Typography.Text strong>500</Typography.Text> Newly Added Today
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </Card>
      <Divider />

      {/*  TAbs*/}
      <Tabs
        defaultActiveKey="1"
        size="large"
        tabBarGutter={24}
        onChange={(e) => setType(e)}
        destroyInactiveTabPane
      >
        {/* For Farmer */}
        <Tabs.TabPane tab="Farmer" key="Farmer">
          <Card>
            <Row gutter={[16, 16]}>
              {/* For Farmer Bargraph */}
              <Col span={16}>
                <Card
                  style={{ height: 450 }}
                  title="Total no. of Farmers per Barangay "
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
                    size="small"
                    scroll={{ y: 300 }}
                    columns={columns}
                    pagination={false}
                    dataSource={hectaredata}
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

        <Tabs.TabPane tab="Farmworker" key="Farmworker">
          <Card>
            <Row gutter={[16, 16]}>
              {/* For Farmer Bargraph */}
              <Col span={16}>
                <Card
                  style={{ height: 450 }}
                  title="Total no. of Farmworkers per Barangay "
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

        <Tabs.TabPane tab="Fisherfolk" key="Fisherfolk">
          <Card>
            <Row gutter={[16, 16]}>
              {/* For Farmer Bargraph */}
              <Col span={16}>
                <Card
                  style={{ height: 450 }}
                  title="Total no. of Fisherfolks per Barangay "
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
