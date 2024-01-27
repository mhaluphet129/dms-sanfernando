import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Empty,
  Table,
  message,
  Modal,
  Button,
  Avatar,
  Alert,
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
import { tableTitleInjector } from "../../assets/js/text_injector";
import ProfilerModal from "../ProfilerModal";

import axios from "axios";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default () => {
  const [loader, setLoader] = useState("");
  const [data, setData] = useState();
  const [newData, setNewData] = useState();
  const [barData, setBarData] = useState([]);
  const [totalLandArea, setTotalLandArea] = useState(0);
  const [openFarmLandInfo, setOpenFarmlandInfo] = useState(false);
  const [loc, setLoc] = useState();
  const [farmInfo, setFarmInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const [max, setMax] = useState(10);
  const [weatherData, setWeatherData] = useState();
  const [modalData, setModalData] = useState();
  const [openModal, setOpenModal] = useState(false);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Profile Registered per Barangay - San Fernando",
        font: {
          size: "25px",
          family: "Sans-Serif",
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max,
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
          href="#"
          type="link"
          onClick={() => {
            setOpenFarmlandInfo(true);
            setLoc(row?._id);
          }}
          style={{
            fontSize: "1.25em",
          }}
        >
          {row?._id}
        </Typography.Link>
      ),
    },
    {
      title: "Hectare(s)",
      align: "start",
      render: (_, row) => (
        <span
          style={{
            fontSize: "1.25em",
          }}
        >
          {row?.total}
        </span>
      ),
    },
    {
      title: "% ratio",
      render: (_, row) => (
        <span
          style={{
            fontSize: "1.25em",
          }}
        >{`${((row?.total / totalLandArea) * 100).toFixed(2)}%`}</span>
      ),
    },
  ].map((e) => tableTitleInjector(e));

  const colums2 = [
    {
      title: "Name",
      render: (_, row) => (
        <Typography.Link>
          {titleText(`${row?._id.name} ${row?._id.lastname}`)}
        </Typography.Link>
      ),
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

  const cropsData = {
    labels: Object.keys(data?.cropsData || {}),
    datasets: [
      {
        label: "Crops",
        data: Object.values(data?.cropsData || {}),
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
          backgroundColor: "rgba(0, 255, 0, 0.65)",
          data: Array(jason.barangays.length).fill(0),
        };
        let farmworker = {
          label: data?.res?.bar[1]?._id,
          backgroundColor: "rgba(0, 255, 255, 0.65)",
          data: Array(jason.barangays.length).fill(0),
        };
        let fisherfolk = {
          label: data?.res?.bar[2]?._id,
          backgroundColor: "rgba(0, 0, 255, 0.65)",
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

        //finding max value, minimum of 10
        if (Math.max(...farmer.data) > max) setMax(Math.max(...farmer.data));
        if (Math.max(...farmworker.data) > max)
          setMax(Math.max(...farmworker.data));
        if (Math.max(...fisherfolk.data) > max)
          setMax(Math.max(...fisherfolk.data));

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
            pie: {
              livestock: {
                label: Object.keys(data?.res.livestockData || {}),
                value: Object.values(data?.res.livestockData || {}),
              },
              poultry: {
                label: Object.keys(data?.res.poultryData || {}),
                value: Object.values(data?.res.poultryData || {}),
              },
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

  //my favourite, weather api
  useEffect(async () => {
    try {
      let resp = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=7.8464&lon=125.3466&appid=84effa33cf13ed6c17415671c6ce7b54"
      );
      setWeatherData(resp.data);
    } catch {}
  }, []);

  return (
    <>
      <ProfilerModal
        data={modalData}
        visible={openModal}
        setVisible={setOpenModal}
        callback={() => null}
      />
      <Modal
        visible={openFarmLandInfo}
        onCancel={() => setOpenFarmlandInfo(false)}
        closable={false}
        footer={
          <Button onClick={() => setOpenFarmlandInfo(false)}>Close</Button>
        }
      >
        <Card
          loading={loader == "load-farm"}
          title={<Typography.Text>{loc} Farmland Information</Typography.Text>}
        >
          <Table
            columns={colums2}
            dataSource={farmInfo}
            pagination={false}
            rowKey={(row) => row._id.name}
            onRow={(data, index) => {
              return {
                onClick: async () => {
                  let res = await axios.get("/api/main", {
                    params: {
                      mode: "qr",
                      id: data._id._id,
                    },
                  });

                  if (res?.data.success) {
                    setModalData(res?.data.data[0]);
                    setOpenModal(true);
                  }
                },
              };
            }}
            summary={(_) => {
              let total = _.reduce((p, n) => p + n.farmobj?.totalArea, 0);
              return (
                <>
                  <Table.Summary.Row
                    style={{ background: "rgba(100,100,100,0.05)" }}
                  >
                    <Table.Summary.Cell index={0} align="center">
                      <strong>Total</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="center">
                      <Typography.Text style={{ fontWeight: 900 }}>
                        {total}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="center">
                      <Typography.Text style={{ fontWeight: 900 }}>
                        {_.length > 0 ? "100%" : "0%"}
                      </Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
            bordered
          />
        </Card>
      </Modal>
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card style={{ height: 150, backgroundColor: "#bcd2d6" }}>
                    <Typography.Title level={2}>
                      {loader == "fetch" ? "-" : data?.visitToday}
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: "1.25em" }}>
                      No. of Visitor Today
                    </Typography.Text>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    style={{
                      height: 150,
                      backgroundColor: "rgb(132,129,113,0.5)",
                    }}
                  >
                    <Typography.Title level={2}>
                      {loader == "fetch" ? "-" : data?.totalLivelihood}
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: "1.25em" }}>
                      Total no. of Registered Profiles
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      <strong style={{ fontSize: "1.25em" }}>
                        {loader == "fetch" ? 0 : data?.totalLivelihood}{" "}
                      </strong>
                      New Profile Registered Today
                    </Typography.Text>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    style={{
                      height: 210,
                      backgroundColor: "rgb(128,172,199,0.5)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Title level={1}>
                      {loader == "fetch" ? "-" : data?.totalPrograms}
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: "1.25em" }}>
                      Total no. of Programs
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      <strong>
                        {loader == "fetch" ? 0 : data?.totalProgramsActive}
                      </strong>{" "}
                      Active Programs
                    </Typography.Text>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card style={{ height: 210 }}>
                    <Row>
                      <Col
                        span={12}
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                        }}
                      >
                        <Avatar
                          src={`http://openweathermap.org/img/wn/${
                            weatherData && weatherData?.weather[0].icon
                          }.png`}
                          size={100}
                          shape="square"
                        />
                      </Col>
                      <Col span={12}>
                        <Typography.Text style={{ fontSize: "1.5rem" }} strong>
                          Today
                        </Typography.Text>
                        <br />
                        <Typography.Text strong>
                          {moment().format("dddd DD MMM")}{" "}
                        </Typography.Text>
                        <br />
                        <Typography.Text>
                          {weatherData ? weatherData?.weather[0].main : "-"}
                        </Typography.Text>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography.Text
                        style={{
                          marginTop: 20,
                          fontSize: "3.5rem",
                          fontWeight: "bold",
                          lineHeight: 0.3,
                        }}
                      >
                        {weatherData
                          ? `${(weatherData?.main.temp - 273.15).toFixed(2)}°C`
                          : "-°C"}
                        <Typography.Text
                          style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                        >
                          <br />

                          {weatherData
                            ? `Humidity ${weatherData?.main.humidity}%`
                            : "Humidity: -%"}
                        </Typography.Text>
                      </Typography.Text>
                    </Row>
                    {weatherData == undefined ? (
                      <Alert
                        message="No Internet Connection"
                        type="error"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          bottom: -10,
                        }}
                      />
                    ) : null}
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 425 }}>
              <Table
                size="small"
                scroll={{ y: 300 }}
                columns={columns}
                pagination={false}
                dataSource={data?.farmlandSummary}
                rowKey={(row) => row._id}
                title={() => (
                  <strong
                    style={{
                      fontSize: "1.25em",
                    }}
                  >
                    Farmlands Information
                  </strong>
                )}
                summary={(_) => {
                  let total = _.reduce((p, n) => p + n.total, 0);
                  setTotalLandArea(total);
                  return (
                    <>
                      <Table.Summary.Row
                        style={{ background: "rgba(100,100,100,0.05)" }}
                      >
                        <Table.Summary.Cell index={0}>
                          <strong> Total</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          <Typography.Text style={{ fontWeight: 900 }}>
                            {total}
                          </Typography.Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <Typography.Text style={{ fontWeight: 900 }}>
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
        </Row>
        <Divider />

        {/* For Farmer */}
        <Row>
          {/* For Farmer Bargraph */}
          <Col span={24}>
            <Card>
              <Bar options={options} data={farmerdata} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
          {/* For Farmer Total hectares */}
          <Col span={8}>
            <Card style={{ height: 400 }}>
              {cropsData?.labels.length > 0 ? (
                <Pie
                  data={cropsData}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      title: {
                        display: true,
                        text: "Farmers Crop Information",
                        font: {
                          size: "18px",
                          family: "Sans-Serif",
                        },
                      },
                    },
                    responsive: true,
                  }}
                />
              ) : (
                <Empty
                  description={<span>There are no crops information</span>}
                />
              )}

              {cropsData?.labels.map((el, i) => (
                <>
                  <Typography.Text
                    style={{
                      marginLeft: i % 2 == 1 ? 50 : 0,
                    }}
                  >
                    {`${el}: ${(
                      (cropsData?.datasets[0].data[i] /
                        cropsData?.datasets[0].data.reduce(
                          (p, n) => p + n,
                          0
                        )) *
                      100
                    ).toFixed(2)}%`}
                  </Typography.Text>
                  {i % 2 == 1 ? <br /> : null}
                </>
              ))}
            </Card>
          </Col>
          {/*for pie chart crops */}
          <Col span={8}>
            <Card style={{ height: 400 }}>
              {newData?.pie?.livestock?.label.length > 0 ? (
                <Pie
                  data={livestockdata}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      title: {
                        display: true,
                        text: "Farmers Livestock Information",
                        font: {
                          size: "18px",
                          family: "Sans-Serif",
                        },
                      },
                    },
                    responsive: true,
                  }}
                />
              ) : (
                <Empty
                  description={<span>There are no livestock information</span>}
                />
              )}
              {livestockdata?.labels?.map((el, i) => (
                <>
                  <Typography.Text
                    style={{
                      marginLeft: i % 2 == 1 ? 50 : 0,
                    }}
                  >
                    {`${el}: ${(
                      (livestockdata.datasets[0].data[i] /
                        livestockdata.datasets[0].data.reduce(
                          (p, n) => p + n,
                          0
                        )) *
                      100
                    ).toFixed(2)}%`}
                  </Typography.Text>
                  {i % 2 == 1 ? <br /> : null}
                </>
              ))}
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: 400 }}>
              {newData?.pie?.poultry?.label.length > 0 ? (
                <Pie
                  data={poultrydata}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      title: {
                        display: true,
                        text: "Farmers Poultry Information",
                        font: {
                          size: "18px",
                          family: "Sans-Serif",
                        },
                      },
                    },
                    responsive: true,
                  }}
                />
              ) : (
                <Empty
                  description={<span>There are no poultry information</span>}
                />
              )}
              {poultrydata?.labels?.map((el, i) => (
                <>
                  <Typography.Text
                    style={{
                      marginLeft: i % 2 == 1 ? 50 : 0,
                    }}
                  >
                    {`${el}: ${(
                      (poultrydata.datasets[0].data[i] /
                        poultrydata.datasets[0].data.reduce(
                          (p, n) => p + n,
                          0
                        )) *
                      100
                    ).toFixed(2)}%`}
                  </Typography.Text>
                  {i % 2 == 1 ? <br /> : null}
                </>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
