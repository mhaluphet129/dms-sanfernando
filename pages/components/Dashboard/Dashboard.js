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
  Modal,
  Button,
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
import jason from "../../assets/json/index";
import titleText from "../../assets/js/TitleText";

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
  const [barData, setBarData] = useState([]);
  const [totalLandArea, setTotalLandArea] = useState(0);
  const [totalarea, setTotalArea] = useState(0);
  const [openFarmLandInfo, setOpenFarmlandInfo] = useState(false);
  const [loc, setLoc] = useState();
  const [farmInfo, setFarmInfo] = useState([]);
  const [total, setTotal] = useState(0);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total livelihood per barangay - San Fernando",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      },
    },
  };

  const farmerdata = {
    labels: jason.barangays,
    datasets: barData,
  };

  const columns = [
    {
      title: "Barangay",
      render: (_, row) => (
        <Typography.Link
          href='#'
          type='link'
          onClick={() => {
            setOpenFarmlandInfo(true);
            setLoc(row?._id);
          }}
        >
          {row?._id}
        </Typography.Link>
      ),
    },
    { title: "Hectare(s)", dataIndex: "total", key: "hectare", align: "start" },
    {
      title: "% ratio",
      render: (_, row) => `${((row?.total / totalLandArea) * 100).toFixed(2)}%`,
    },
  ];

  const colums2 = [
    {
      title: "Name",
      render: (_, row) => titleText(`${row?._id.name} ${row?._id.lastname}`),
    },
    {
      title: "Land area (HA)",
      render: (_, row) => row?.farmobj.totalArea,
    },
    {
      title: "% ratio",
      align: "center",
      render: (_, row) =>
        `${((row?.farmobj.totalArea / total) * 100).toFixed(2)}%`,
    },
  ];

  //here
  const cropsdata = {
    labels: [...(data?.multipieData?.labels || [])],
    datasets: [...(data?.multipieData?.datasets || [])],
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

        let farmer = {
          label: data?.res?.bar[0]?._id,
          backgroundColor: "rgba(53, 162, 235, 1)",
          data: Array(jason.barangays.length).fill(0),
        };
        let farmworker = {
          label: data?.res?.bar[1]?._id,
          backgroundColor: "rgba(255, 0, 0, 1)",
          data: Array(jason.barangays.length).fill(0),
        };
        let fisherfolk = {
          label: data?.res?.bar[2]?._id,
          backgroundColor: "rgba(0, 255, 0, 1)",
          data: Array(jason.barangays.length).fill(0),
        };

        data?.res?.bar[0]?.barangay.forEach((el) => {
          if (jason.barangays.includes(el))
            farmer.data[jason.barangays.indexOf(el)]++;
        });
        data?.res?.bar[1]?.barangay.forEach((el) => {
          if (jason.barangays.includes(el))
            farmworker.data[jason.barangays.indexOf(el)]++;
        });
        data?.res?.bar[2]?.barangay.forEach((el) => {
          if (jason.barangays.includes(el))
            fisherfolk.data[jason.barangays.indexOf(el)]++;
        });

        let _data = [];
        if (farmer.data.some((el) => el > 0)) _data.push(farmer);
        if (farmworker.data.some((el) => el > 0)) _data.push(farmworker);
        if (fisherfolk.data.some((el) => el > 0)) _data.push(fisherfolk);
        setBarData(_data);

        setNewData(() => {
          let label2 = [];
          let value2 = [];
          let label3 = [];
          let value3 = [];

          data?.res?.farmworkers?.forEach((el) => {
            label2.push(el._id);
            value2.push(el.count);
          });
          data?.res?.fisherfolk?.forEach((el) => {
            label3.push(el._id);
            value3.push(el.count);
          });

          return {
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
          };
        });
      }
    } catch {
      message.error("There is an error on the server");
    }
  }, []);

  useEffect(async () => {
    if (openFarmLandInfo) {
      setLoader("load-farm");

      let res = await axios.get("/api/livelihood", {
        params: {
          location: loc,
          mode: "get-land-info",
        },
      });
      if (res?.data?.success) {
        setLoader("");
        setFarmInfo(res?.data?.data);

        setTotal(res?.data?.data.reduce((p, n) => p + n.farmobj?.totalArea, 0));
      }
    }
  }, [openFarmLandInfo]);

  return (
    <>
      <Modal
        visible={openFarmLandInfo}
        onCancel={() => setOpenFarmlandInfo(false)}
        closable={false}
        footer={
          <Button onClick={() => setOpenFarmlandInfo(false)}>Close</Button>
        }
      >
        <Card loading={loader == "load-farm"} title={loc}>
          <Table
            columns={colums2}
            dataSource={farmInfo}
            pagination={false}
            rowKey={(row) => row._id.name}
            summary={(_) => {
              let total = _.reduce((p, n) => p + n.farmobj?.totalArea, 0);
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} align='center'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align='center'>
                      <Typography.Text>{total}</Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align='center'>
                      <Typography.Text>
                        {_.length > 0 ? "100%" : "0%"}
                      </Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </Card>
      </Modal>
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card
                style={{ height: 150 }}
                onClick={() => console.log(data?.multipieData)}
              >
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

        {/* For Farmer */}
        <Row>
          {/* For Farmer Bargraph */}
          <Col span={24}>
            <Card>
              <Button>View Table List of barangay</Button>
              <Bar options={options} data={farmerdata} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
          {/* For Farmer Total hectares */}
          <Col span={8}>
            <Card style={{ height: 375 }}>
              <Table
                size='small'
                scroll={{ y: 300 }}
                columns={columns}
                pagination={false}
                dataSource={data?.farmlandSummary}
                rowKey={(row) => row._id}
                title={() => <strong>Farmlands Information</strong>}
                summary={(_) => {
                  let total = _.reduce((p, n) => p + n.total, 0);
                  setTotalLandArea(total);
                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align='center'>
                          Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} align='center'>
                          <Typography.Text>{total}</Typography.Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} align='center'>
                          <Typography.Text>
                            {data?.farmlandSummary.length > 0 ? "100%" : "0%"}
                          </Typography.Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Card>
          </Col>

          {/*for pie chart crops */}
          <Col span={8}>
            <Card>
              <Pie
                data={cropsdata}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Farmer's crops, livestocks, and poultry summary",
                    },
                    legend: {
                      position: "right",
                      labels: {
                        generateLabels: function (chart) {
                          const original =
                            ChartJS.overrides.pie.plugins.legend.labels
                              .generateLabels;
                          const labelsOriginal = original.call(this, chart);

                          let datasetColors = chart.data.datasets.map(function (
                            e
                          ) {
                            return e.backgroundColor;
                          });
                          datasetColors = datasetColors.flat();

                          labelsOriginal.forEach((label) => {
                            label.datasetIndex =
                              (label.index - (label.index % 2)) / 2;

                            label.hidden = !chart.isDatasetVisible(
                              label.datasetIndex
                            );

                            label.fillStyle = datasetColors[label.index];
                          });

                          return labelsOriginal;
                        },
                      },
                      onClick: function (mouseEvent, legendItem, legend) {
                        legend.chart.getDatasetMeta(
                          legendItem.datasetIndex
                        ).hidden = legend.chart.isDatasetVisible(
                          legendItem.datasetIndex
                        );
                        legend.chart.update();
                      },
                    },
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
