import React, { useRef } from "react";
import {
  Drawer,
  Button,
  Row,
  Col,
  Table,
  Typography,
  Space,
  Image,
  Divider,
} from "antd";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

import TitleText from "../../../utilities/TitleText";

class PDF extends React.Component {
  render() {
    return { ...this.props.children };
  }
}

export default ({ visible, setVisible, data, barangay, name }) => {
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const columns = [
    {
      title: "Farmers Name",
      align: "center",
      render: (_, row) =>
        TitleText(
          `${row?.name.lastName}, ${row?.name.name} ${
            row?.name.middleName.length > 0 ? row?.name.middleName : ""
          }`
        ),
    },
    {
      title: "Farmer Address",
      render: (_, row) => (
        <Typography.Text>
          {row?.address?.street}
          <br />
          {row?.address?.barangay}, SAN FERNANDO
          <br />
          PROVINCE OF BUKIDNON
        </Typography.Text>
      ),
    },
    {
      title: "Date of Birth",
      align: "center",
      render: (_, row) =>
        moment(row?.birth.dateOfBirth).format("MMMM DD, YYYY"),
    },
    {
      title: "Gender",
      align: "center",
      render: (_, row) => row?.gender[0].toUpperCase(),
    },
  ];

  return (
    <>
      {visible && (
        <>
          <Drawer
            visible={visible}
            onClose={() => setVisible("")}
            height="100%"
            placement="bottom"
            style={{
              width: 900,
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
            extra={[
              <Button onClick={handlePrint} key="btn-1">
                Print
              </Button>,
            ]}
          >
            <Row className="pagebreak">
              <Col span={24}>
                <PDF
                  ref={ref}
                  children={
                    <>
                      <Row>
                        <Col span={7}>
                          <Row justify="space-around">
                            <Col>
                              <Image
                                preview={false}
                                src="/logo.png"
                                alt="logo"
                                width={150}
                                style={{
                                  marginTop: 50,
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          span={10}
                          style={{
                            marginTop: 20,
                          }}
                        >
                          <Space
                            style={{
                              width: "100%",
                              alignItems: "center",
                              fontWeight: 900,
                            }}
                            direction="vertical"
                          >
                            <Typography.Text style={{ color: "#757575" }}>
                              Republic of the Philippines
                            </Typography.Text>
                            <Typography.Text style={{ color: "#757575" }}>
                              San Fernando
                            </Typography.Text>
                            <Typography.Text
                              style={{ marginBottom: 10, color: "#757575" }}
                            >
                              PROVINCE OF BUKIDNON
                            </Typography.Text>
                            <Typography.Text
                              style={{ marginBottom: 15, color: "#757575" }}
                            >
                              PROVINCIAL AGRICULTURE OFFICE
                            </Typography.Text>
                            <Typography.Text
                              style={{
                                marginBottom: 20,
                                fontWeight: 900,
                                color: "#000",
                                fontSize: "1.5em",
                              }}
                            >
                              Masterlist of Farmers
                            </Typography.Text>
                          </Space>
                        </Col>
                        <Col span={7}>
                          <Row justify="space-around">
                            <Col>
                              <Image
                                preview={false}
                                src="/imgs/DA_LOGO.png"
                                width={150}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          offset={3}
                          span={3}
                          style={{
                            marginTop: 35,
                          }}
                        >
                          <strong>MUNICIPALITY</strong>
                        </Col>
                        <Col
                          offset={2}
                          span={15}
                          style={{
                            marginTop: 35,
                          }}
                        >
                          SAN FERNANDO
                        </Col>
                        <Col offset={3} span={3}>
                          <strong>BARANGAY</strong>
                        </Col>
                        <Col offset={2} span={15}>
                          {barangay?.toUpperCase()}
                        </Col>
                        <Col span={22} offset={1}>
                          <Table
                            dataSource={data}
                            columns={columns}
                            pagination={false}
                            bordered
                          />
                        </Col>
                        <Col span={8} offset={2}>
                          <Typography.Text
                            style={{
                              marginTop: 10,
                              fontWeight: 900,
                              color: "#757575",
                            }}
                          >
                            TOTAL NUMBER OF FARMERS
                          </Typography.Text>
                        </Col>
                        <Col span={14}>{data?.length}</Col>
                        <Col span={8} offset={2}>
                          <Typography.Text
                            style={{
                              marginTop: 10,
                              fontWeight: 900,
                              color: "#757575",
                            }}
                          >
                            MALE
                          </Typography.Text>
                        </Col>
                        <Col span={14}>
                          {data?.filter((el) => el?.gender == "male").length}
                        </Col>
                        <Col span={8} offset={2}>
                          <Typography.Text
                            style={{
                              marginTop: 10,
                              fontWeight: 900,
                              color: "#757575",
                            }}
                          >
                            FEMALE
                          </Typography.Text>
                        </Col>
                        <Col span={14}>
                          {data?.filter((el) => el?.gender == "female").length}
                        </Col>
                        <Col span={12} offset={3} style={{ marginTop: 100 }}>
                          <Typography.Text>{name}</Typography.Text>
                          <br />
                          <Typography.Text
                            style={{ borderTop: "1px solid #000" }}
                          >
                            Agriculture Technician
                          </Typography.Text>
                        </Col>
                        <Col span={9} style={{ marginTop: 100 }}>
                          <Typography.Text>Coleen C. Ambos</Typography.Text>
                          <br />
                          <Typography.Text
                            style={{ borderTop: "1px solid #000" }}
                          >
                            Municipal Agriculturist
                          </Typography.Text>
                        </Col>
                      </Row>
                    </>
                  }
                />
              </Col>
            </Row>
          </Drawer>
        </>
      )}
    </>
  );
};
