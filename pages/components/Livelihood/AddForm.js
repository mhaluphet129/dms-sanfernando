import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Divider,
  Button,
  Space,
  Modal,
  Steps,
  DatePicker,
  Radio,
  Table,
  Checkbox,
  InputNumber,
  Typography,
  Card,
  Progress,
  message,
} from "antd";

import { WarningOutlined } from "@ant-design/icons";

import axios from "axios";
import moment from "moment";
import jason from "../../assets/json";

import FarmCustomTable from "./FarmCustomTable";

export default ({ visible, setVisible, cb }) => {
  const [current, setCurrent] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [farmlandData, setFarmlandData] = useState([]);
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState({});
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [sitio, setSitio] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [contactEmergency, setContactEmergency] = useState("");
  const [emergencyName, setEmergencyName] = useState("");

  const [spouseName, setSpouseName] = useState("");
  const [spouseSurname, setSpouseLastname] = useState("");
  const [spouseMiddlename, setSpouseMiddlename] = useState("");
  const [openScanModal, setOpenScanModal] = useState(false);

  const [mainAnalysic, setMainAnalysis] = useState({});
  const [spouseAnalysic, setSpouseAnalysis] = useState({});
  const [anaylizing, setAnalyzing] = useState(false);
  const [name, setName] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [analysisType, setAnalysisType] = useState("");

  const [otherInfo, setOtherInfo] = useState({
    isPWD: false,
    is4Ps: false,
    isIP: {
      status: false,
      name: "",
    },
    hasID: {
      status: false,
      name: "",
    },
    isMember: {
      status: false,
      name: "",
    },
    farmer: {
      status: false,
      crops: {
        status: false,
        data: [],
      },
      livestock: {
        status: false,
        data: [],
      },
      poultry: {
        status: false,
        data: [],
      },
    },
    farmworker: {
      status: false,
      data: [],
    },
    fisherfolk: {
      status: false,
      data: [],
    },
  });

  const { Step } = Steps;

  // columns and data for other info.
  const columns = [
    {
      dataIndex: "Question",
      key: "Question",
    },
    {
      dataIndex: "YesNo",
      key: "YesNo",
    },
    {
      dataIndex: "Specify",
      key: "Specify",
    },
  ];
  const data = [
    {
      key: "1",
      Question: "Person With Disability (PWD)?",

      YesNo: (
        <Radio.Group
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              isPWD: e.target.value,
            }))
          }
        >
          <Space>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "2",
      Question: "4P's Beneficiary?",
      YesNo: (
        <Radio.Group
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              is4Ps: e.target.value,
            }))
          }
        >
          <Space>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "3",
      Question: "Member of Indigenous Group?",
      YesNo: (
        <Radio.Group
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              isIP: {
                status: e.target.value,
                name: "",
              },
            }))
          }
        >
          <Space>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Space>
        </Radio.Group>
      ),
      Specify: (
        <Input
          placeholder="Indigenous Group"
          disabled={!otherInfo.isIP.status}
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              isIP: {
                status: true,
                name: e.target.value,
              },
            }))
          }
          allowClear
        />
      ),
    },
    {
      key: "4",
      Question: "With Government ID?",
      YesNo: (
        <Radio.Group
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              hasID: {
                status: e.target.value,
                name: "",
              },
            }))
          }
        >
          <Space>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Space>
        </Radio.Group>
      ),
      Specify: (
        <Input
          placeholder="ID number"
          disabled={!otherInfo.hasID.status}
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              hasID: {
                status: true,
                name: e.target.value,
              },
            }))
          }
          allowClear
        />
      ),
    },
    {
      key: "5",
      Question: "Member of any Farmer Association/Cooperation?",
      YesNo: (
        <Radio.Group
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              isMember: {
                status: e.target.value,
                name: "",
              },
            }))
          }
        >
          <Space>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Space>
        </Radio.Group>
      ),
      Specify: (
        <Input
          placeholder="Specify"
          disabled={!otherInfo.isMember.status}
          onChange={(e) =>
            setOtherInfo((el) => ({
              ...el,
              isMember: {
                status: true,
                name: e.target.value,
              },
            }))
          }
          allowClear
        />
      ),
    },
  ];

  //HANDLERS NI BEBE *mwah*
  const handleChange = (current) => {
    setCurrent(current);
  };

  const handleNext = () => {
    if (current == 0) {
      if (
        [
          name,
          lastname,
          selectedBarangay,
          sitio,
          contactNum,
          dateOfBirth,
          maritalStatus,
          contactEmergency,
          emergencyName,
        ].some((e) => [null, ""].includes(e))
      ) {
        message.error("Please check your form. Some required input is blank.");
        return;
      }
    }

    if (current < 2) {
      setCurrent(current + 1);
    } else alert("add me");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  useEffect(async () => {
    if (openScanModal) {
      setAnalyzing(true);
      let res = await axios.get("/api/main", {
        params: {
          mode: "analysis",
          name: analysisType == "spouse" ? spouseName : name,
          middlename: analysisType == "spouse" ? spouseMiddlename : middlename,
          lastname: analysisType == "spouse" ? spouseSurname : lastname,
        },
      });

      if (res?.data.success) {
        setAnalyzing(false);
        setMainAnalysis(res?.data.analysis.main);
        setSpouseAnalysis(res?.data.analysis.spouse);
      } else message.error(res?.data.message);
    }
  }, [openScanModal]);

  return (
    <>
      <Modal
        visible={openScanModal}
        onCancel={() => setOpenScanModal(false)}
        width={700}
        closable={false}
        footer={null}
      >
        <Card loading={anaylizing} title="Main">
          <Row gutter={[16, 16]}>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <span>{`${analysisType == "main" ? name : spouseName} ${
                analysisType == "main" ? middlename : spouseMiddlename
              }. ${analysisType == "main" ? lastname : spouseSurname}`}</span>
              <Progress
                type="dashboard"
                percent={(
                  (mainAnalysic.exact / mainAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={60}
                status={
                  (mainAnalysic.exact / mainAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if ((mainAnalysic.exact / mainAnalysic.total) * 100 > 0)
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small>
                {mainAnalysic.exact} out of {mainAnalysic.total} having exact
                full name
              </small>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Progress
                type="dashboard"
                percent={(
                  (mainAnalysic.name / mainAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={50}
                status={
                  (mainAnalysic.name / mainAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if ((mainAnalysic.name / mainAnalysic.total) * 100 > 0)
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small>
                {mainAnalysic.name} out of {mainAnalysic.total} having exact
                name
              </small>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Progress
                type="dashboard"
                percent={(
                  (mainAnalysic.middlename / mainAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={50}
                status={
                  (mainAnalysic.middlename / mainAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if ((mainAnalysic.middlename / mainAnalysic.total) * 100 > 0)
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small style={{ textAlign: "center" }}>
                {mainAnalysic.middlename} out of {mainAnalysic.total} having
                exact middlename
              </small>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Progress
                type="dashboard"
                percent={(
                  (mainAnalysic.lastname / mainAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={50}
                status={
                  (mainAnalysic.lastname / mainAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if ((mainAnalysic.lastname / mainAnalysic.total) * 100 > 0)
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small>
                {mainAnalysic.lastname} out of {mainAnalysic.total} having exact
                lastname
              </small>
            </Col>
          </Row>
        </Card>
        <Card loading={anaylizing} title="Spouse" style={{ marginTop: 10 }}>
          <Row gutter={[16, 16]}>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <span>{`${analysisType == "main" ? name : spouseName} ${
                analysisType == "main" ? middlename : spouseMiddlename
              }. ${analysisType == "main" ? lastname : spouseSurname}`}</span>
              <Progress
                type="dashboard"
                percent={(
                  (spouseAnalysic.exact / spouseAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={60}
                status={
                  (spouseAnalysic.exact / spouseAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if ((spouseAnalysic.exact / spouseAnalysic.total) * 100 > 0)
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small>
                {spouseAnalysic.exact} out of {spouseAnalysic.total} having
                exact full name
              </small>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Progress
                type="dashboard"
                percent={(
                  (spouseAnalysic.name / spouseAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={50}
                status={
                  (spouseAnalysic.name / spouseAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if ((spouseAnalysic.name / spouseAnalysic.total) * 100 > 0)
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small>
                {spouseAnalysic.name} out of {spouseAnalysic.total} having exact
                name
              </small>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Progress
                type="dashboard"
                percent={(
                  (spouseAnalysic.middlename / spouseAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={50}
                status={
                  (spouseAnalysic.middlename / spouseAnalysic.total) * 100 ==
                  100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if (
                    (spouseAnalysic.middlename / spouseAnalysic.total) * 100 >
                    0
                  )
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small style={{ textAlign: "center" }}>
                {spouseAnalysic.middlename} out of {spouseAnalysic.total} having
                exact middlename
              </small>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Progress
                type="dashboard"
                percent={(
                  (spouseAnalysic.lastname / spouseAnalysic.total) *
                  100
                ).toFixed(2)}
                gapDegree={30}
                width={50}
                status={
                  (spouseAnalysic.lastname / spouseAnalysic.total) * 100 == 100
                    ? "exception"
                    : "normal"
                }
                format={() => {
                  if (
                    (spouseAnalysic.lastname / spouseAnalysic.total) * 100 >
                    0
                  )
                    return (
                      <Typography.Text style={{ color: "#ffcc00" }}>
                        <WarningOutlined />
                      </Typography.Text>
                    );
                }}
              />
              <small>
                {spouseAnalysic.lastname} out of {spouseAnalysic.total} having
                exact lastname
              </small>
            </Col>
          </Row>
        </Card>
      </Modal>
      <Modal
        visible={visible}
        width={1000}
        onCancel={() => {
          setVisible(false);
          setCurrent(0);
        }}
        footer={null}
        destroyOnClose
      >
        <Steps
          size="small"
          current={current}
          type="navigation"
          onChange={handleChange}
        >
          <Step title="Part I" description="Personal Information" />
          <Step title="Part II" description="Farm Profile" />
        </Steps>
        <Divider />
        <Form
          layout="vertical"
          onFinish={async (val) => {
            let flagError = 0;

            // restricts
            const arr = [
              "surname",
              "firstname",
              "street",
              "barangay",
              "contactnum",
              "dateofbirth",
              "status",
              "personToContact",
              "emergencyContact",
            ];

            if (
              otherInfo.farmer.status == false &&
              otherInfo.farmworker.status == false &&
              otherInfo.fisherfolk.status == false
            )
              flagError = 1;

            arr.forEach((el) => {
              if (val[el] == undefined || val[el].length == 0) flagError = 1;
            });

            if (val.status == "Married") {
              if (val.spousename?.length == 0 || val.spousename == undefined)
                flagError = 1;
            }

            // if (
            //   !/^(09|\+639)\d{9}$/.test(val.contactnum) ||
            //   !/^(09|\+639)\d{9}$/.test(val.emergencyContact)
            // ) {
            //   message.warn("Please input valid phone number");
            //   return;
            // }

            if (flagError) {
              message.warning("Please input all required fields");
              return;
            }

            // end of restrictions

            let nameObj = {
              name: val.firstname,
              middleName: val.middlename,
              lastName: val.surname,
            };

            let addressObj = {
              barangay: val.barangay,
              street: val.street,
            };

            let birthObj = {
              dateOfBirth: val.dateofbirth,
              placeOfBirth: val.placeofbirth,
            };

            let civilObj = {
              civilStatus: val.status,
              spouseName: val.spousename || "",
            };

            let ethnicObj = {
              isIp: otherInfo.isIP.status,
              nameOfEthnicity: otherInfo.isIP.name,
            };

            let governObj = {
              hasId: otherInfo.hasID.status,
              idNum: otherInfo.hasID.name,
            };

            let emergencyObj = {
              name: val.personToContact,
              number: val.emergencyContact,
            };

            let hasCoopOrAssocObj = {
              status: otherInfo.isMember.status,
              name: otherInfo.isMember.name,
            };

            let profileObj = {
              type: val.type,
              crops: val.type?.includes("Farmer")
                ? otherInfo.farmer.crops?.data || []
                : [],
              livestock: val.type?.includes("Farmer")
                ? otherInfo.farmer.livestock?.data || []
                : [],
              poultry: val.type?.includes("Farmer")
                ? otherInfo.farmer.poultry?.data || []
                : [],
              farmWorker: otherInfo.farmworker.status
                ? otherInfo.farmworker.data
                : [],
              fisherFolks: otherInfo.fisherfolk.status
                ? otherInfo.fisherfolk.data
                : [],
            };
            // end

            // Farm description
            let arrayFarm = farmlandData.map((el) => ({
              location: el.loc != "" ? el.loc : selectedBarangay,
              ownershipDocument: el.docType,
              ownerType: el.owner.type,
              ownerName: el.owner.data,
              totalArea: el.totalArea,
              documentNumber: el.docNum,
              crops: [...el.arr1],
              livestock: [...el.arr2],
            }));

            let spouseObj = {
              name: val.spousename || "",
              middleName: val.spousemiddlename || "",
              lastName: val.spousesurname || "",
            };

            // FORM data
            let obj = {
              gender: val.gender,
              contactNum: val.contactnum,
              religion: val.religion,
              highestEducation: val.education,
              isDisabledPerson: otherInfo.isPWD,
              is4Ps: otherInfo.is4Ps,
              education: val.education,
            };

            const newLivelihood = {
              ...obj,
              name: nameObj,
              profile: profileObj,
              hasCoopOrAssoc: hasCoopOrAssocObj,
              address: addressObj,
              birth: birthObj,
              civil: val.status,
              ethnicity: ethnicObj,
              government: governObj,
              emergency: emergencyObj,
              spouse: spouseObj,
            };

            let res3 = await axios.post("/api/livelihood", {
              payload: {
                newLivelihood,
                arrayFarm,
              },
              mode: "add",
            });

            if (res3?.data.success) {
              let formData = new FormData();
              let formData2 = new FormData();
              let _obj = { filenames: [], profile: "" };
              formData.append("id", res3?.data?.id);
              formData2.append("id", res3?.data?.id);
              files.forEach((el) =>
                formData.append("photos", el.originFileObj)
              );
              formData2.append("photo", profile.originFileObj);

              if (files.length > 0) {
                const res = await axios.post("/api/uploadfiles", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });

                if (res?.data.success) {
                  res?.data.files.forEach((el) => {
                    _obj.filenames.push(el.originalname);
                  });
                }
              }

              if (Object.keys(profile).length > 0) {
                const res2 = await axios.post(
                  "/api/livelihoodprofile",
                  formData2,
                  {
                    headers: { "Content-Type": "multipart/form-data" },
                  }
                );
                if (res2?.data.success) {
                  _obj.profile = res2?.data.path.replace("public", "");
                }
              }

              let _res = await axios.put("/api/livelihood", {
                payload: {
                  mode: "set-imgs",
                  images: _obj,
                  id: res3?.data?.id,
                },
              });

              if (_res?.data.success) {
                message.success(data.message);
                cb();
                setVisible(false);
              }
            } else message.error(data.message);
          }}
        >
          <div style={{ display: current != 0 ? "none" : null }}>
            <Row>
              {/* Name and Gender */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Surname"
                      name="surname"
                      required={[{ required: true }]}
                    >
                      <Input
                        placeholder="Surname"
                        onChange={(e) => setLastname(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      label="Firstname"
                      name="firstname"
                      required={[{ required: true }]}
                    >
                      <Input
                        placeholder="Firstname"
                        onChange={(e) => setName(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item label="Middle Name" name="middlename">
                      <Input
                        placeholder="Middle Name"
                        onChange={(e) => setMiddlename(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item label=" ">
                      <Button
                        disabled={name == "" || lastname == ""}
                        onClick={() => {
                          if (name == "" || lastname == "") {
                            message.warning(
                              "Complete the name before scanning."
                            );
                            return;
                          }
                          setAnalysisType("main");
                          setOpenScanModal(true);
                        }}
                        type="primary"
                      >
                        Analyze Name
                      </Button>
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Gender"
                      style={{ marginLeft: 5, width: 150 }}
                      name="gender"
                      initialValue="male"
                    >
                      <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Name and Gender</strong>
                <br />
                <Typography.Text type="secondary">
                  <span style={{ color: "#ff0a0a" }}>*</span> means this field
                  is required.
                </Typography.Text>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* Address Details */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Barangay"
                      name="barangay"
                      required={[{ required: true }]}
                    >
                      <Select
                        style={{ width: 200 }}
                        onChange={(e) => setSelectedBarangay(e)}
                      >
                        {jason.barangays.map((el) => (
                          <Select.Option value={el}>{el}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Street/Sitio/Subdv."
                      name="street"
                      required={[{ required: true }]}
                    >
                      <Input
                        onChange={(e) => setSitio(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Address Details</strong>
              </Col>
            </Row>

            <Divider />

            <Row>
              {/* Contact */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Contact Number"
                      name="contactnum"
                      required={[{ required: true }]}
                    >
                      <InputNumber
                        addonBefore="+63"
                        maxLength={10}
                        controls={false}
                        onChange={(e) => setContactNum(e)}
                      />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Contact</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* Birth */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Date of Birth"
                      name="dateofbirth"
                      required={[{ required: true }]}
                    >
                      <DatePicker
                        format="MMMM DD, YYYY"
                        disabledDate={(_) => _ && _ > moment().endOf("day")}
                        style={{ marginRight: 5 }}
                        onChange={(e) => setDateOfBirth(e)}
                      />
                    </Form.Item>
                    <Form.Item label="Place of Birth" name="placeofbirth">
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Birth</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* Status */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Civil Status"
                      style={{ marginRight: 5 }}
                      name="status"
                      required={[{ required: true }]}
                    >
                      <Select
                        value={maritalStatus}
                        style={{ width: 150 }}
                        onChange={(e) => setMaritalStatus(e)}
                      >
                        <Select.Option value="Single">Single</Select.Option>
                        <Select.Option value="Married">Married</Select.Option>
                        <Select.Option value="Widowed">Widowed</Select.Option>
                        <Select.Option value="Separated">
                          Separated
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Religion" name="religion">
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item label="Spouse Name" name="spousesurname">
                      <Input
                        disabled={maritalStatus.toLowerCase() != "married"}
                        placeholder="Surname"
                        onChange={(e) => setSpouseLastname(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item name="spousename" label=" ">
                      <Input
                        disabled={maritalStatus.toLowerCase() != "married"}
                        placeholder="Name"
                        onChange={(e) => setSpouseName(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item name="spousemiddlename" label=" ">
                      <Input
                        disabled={maritalStatus.toLowerCase() != "married"}
                        placeholder="Middlename"
                        onChange={(e) => setSpouseMiddlename(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Form.Item>
                    <Button
                      disabled={maritalStatus.toLowerCase() != "married"}
                      onClick={() => {
                        if (
                          spouseName == "" ||
                          spouseMiddlename == "" ||
                          spouseSurname == " "
                        ) {
                          message.warning("Complete the name before scanning.");
                          return;
                        }
                        setAnalysisType("spouse");
                        setOpenScanModal(true);
                      }}
                      type="primary"
                    >
                      Analyze Name
                    </Button>
                  </Form.Item>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Status</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* Education */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Highest Formal Education"
                      style={{ marginRight: 5 }}
                      name="education"
                      initialValue="None"
                    >
                      <Select value="None" style={{ width: 200 }}>
                        <Select.Option value="None">None</Select.Option>
                        <Select.Option value="Elementary">
                          Elementary
                        </Select.Option>
                        <Select.Option value="High School">
                          High School
                        </Select.Option>
                        <Select.Option value="Vocational">
                          Vocational
                        </Select.Option>
                        <Select.Option value="College">College</Select.Option>
                        <Select.Option value="Post Graduate">
                          Post Graduate
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Education</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* Other Information */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size={"small"}
                    showHeader={false}
                    rowKey={(row) => row.key}
                  />
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Other Information</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* In Case of Emergency */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label="Person to Contact"
                      name="personToContact"
                      required={[{ required: true }]}
                    >
                      <Input
                        onChange={(e) => setEmergencyName(e.target.value)}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      label="Contact Number"
                      name="emergencyContact"
                      required={[{ required: true }]}
                    >
                      <InputNumber
                        addonBefore="+63"
                        maxLength={10}
                        controls={false}
                        onChange={(e) => setContactEmergency(e)}
                      />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>In Case of Emergency</strong>
              </Col>
            </Row>
          </div>

          <div style={{ display: current != 1 ? "none" : null }}>
            <Row>
              {/* Main Livelihood */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item
                      name="type"
                      label="Type of livelihood"
                      required={[{ required: true }]}
                    >
                      <Checkbox.Group>
                        <Checkbox
                          key={1}
                          value="Farmer"
                          onChange={(e) =>
                            setOtherInfo((el) => ({
                              ...el,
                              farmer: {
                                status: e.target.checked,
                              },
                            }))
                          }
                        >
                          Farmer
                        </Checkbox>
                        <Checkbox
                          key={2}
                          value="Farmworker"
                          onChange={(e) =>
                            setOtherInfo((el) => ({
                              ...el,
                              farmworker: {
                                status: e.target.checked,
                              },
                            }))
                          }
                        >
                          Farmworker
                        </Checkbox>
                        <Checkbox
                          key={3}
                          value="Fisherfolk"
                          onChange={(e) =>
                            setOtherInfo((el) => ({
                              ...el,
                              fisherfolk: {
                                status: e.target.checked,
                              },
                            }))
                          }
                        >
                          Fisherfolk
                        </Checkbox>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>Main Livelihood</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* For farmer */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item label="Type of Farming Activity">
                      <Checkbox.Group disabled={!otherInfo.farmer.status}>
                        <Row>
                          <Col>
                            <Checkbox
                              key={1}
                              value="crops"
                              onChange={(e) => {
                                setOtherInfo((el) => ({
                                  ...el,
                                  farmer: {
                                    ...el.farmer,
                                    crops: {
                                      status: e.target.checked,
                                    },
                                  },
                                }));
                                if (!e.target.checked) {
                                  setOtherInfo((el) => ({
                                    ...el,
                                    farmer: {
                                      ...el.farmer,
                                      crops: {
                                        status: e.target.checked,
                                        data: [],
                                      },
                                    },
                                  }));
                                }
                              }}
                            >
                              Crops, please specify:
                            </Checkbox>
                            <Select
                              className="customInput"
                              mode="tags"
                              style={{ width: 180 }}
                              placeholder="Enter crops"
                              onChange={(e) =>
                                setOtherInfo((el) => ({
                                  ...el,
                                  farmer: {
                                    ...el.farmer,
                                    crops: {
                                      status: true,
                                      data: e,
                                    },
                                  },
                                }))
                              }
                              disabled={
                                !otherInfo.farmer.status ||
                                !otherInfo.farmer.crops?.status
                              }
                              allowClear
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Checkbox
                              key={1}
                              value="livestocks"
                              onChange={(e) =>
                                setOtherInfo((el) => ({
                                  ...el,
                                  farmer: {
                                    ...el.farmer,
                                    livestock: {
                                      status: e.target.checked,
                                    },
                                  },
                                }))
                              }
                            >
                              Livestock, please specify:
                            </Checkbox>
                            <Select
                              className="customInput"
                              mode="tags"
                              style={{ width: 180 }}
                              placeholder="Enter livestock"
                              onChange={(e) =>
                                setOtherInfo((el) => ({
                                  ...el,
                                  farmer: {
                                    ...el.farmer,
                                    livestock: {
                                      status: true,
                                      data: e,
                                    },
                                  },
                                }))
                              }
                              disabled={
                                !otherInfo.farmer.status ||
                                !otherInfo.farmer.livestock?.status
                              }
                              allowClear
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Checkbox
                              key={1}
                              value="poultry"
                              onChange={(e) =>
                                setOtherInfo((el) => ({
                                  ...el,
                                  farmer: {
                                    ...el.farmer,
                                    poultry: {
                                      status: e.target.checked,
                                    },
                                  },
                                }))
                              }
                            >
                              Poultry, please specify:
                            </Checkbox>
                            <Select
                              className="customInput"
                              mode="tags"
                              size={4}
                              style={{ width: 180 }}
                              placeholder="Enter poultry"
                              onChange={(e) =>
                                setOtherInfo((el) => ({
                                  ...el,
                                  farmer: {
                                    ...el.farmer,
                                    poultry: {
                                      status: true,
                                      data: e,
                                    },
                                  },
                                }))
                              }
                              disabled={
                                !otherInfo.farmer.status ||
                                !otherInfo.farmer.poultry?.status
                              }
                              allowClear
                            />
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>For Farmer</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* For Farmworker */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item label="Kind of Work">
                      <Checkbox.Group
                        onChange={(e) => {
                          setOtherInfo((el) => ({
                            ...el,
                            farmworker: {
                              status: true,
                              data: e,
                            },
                          }));
                        }}
                        disabled={!otherInfo.farmworker.status}
                      >
                        <Space direction="vertical">
                          {[
                            "Land Preparation",
                            "Planting/Transplanting",
                            "Cultivation",
                            "Harvesting",
                          ].map((e, i) => (
                            <div>
                              <Checkbox value={e} key={i} /> {e}
                            </div>
                          ))}

                          <Row>
                            <Col>
                              Others, please specify:{" "}
                              <Select
                                className="customInput"
                                mode="tags"
                                style={{ width: 150 }}
                                placeholder="Specify..."
                                disabled={!otherInfo.farmworker.status}
                                onChange={(e) => {
                                  setOtherInfo((el) => ({
                                    ...el,
                                    farmworker: {
                                      status: true,
                                      data: [
                                        ...(el.farmworker?.data || []),
                                        e[e.length - 1],
                                      ],
                                    },
                                  }));
                                }}
                                allowClear
                              />
                            </Col>
                          </Row>
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>For Farmworker</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              {/* For Fisherfolk */}
              <Col span={18} push={6}>
                <Input.Group>
                  <Space>
                    <Form.Item label="Type of Fishing Activity">
                      <Checkbox.Group
                        disabled={!otherInfo.fisherfolk.status}
                        onChange={(e) => {
                          setOtherInfo((el) => ({
                            ...el,
                            fisherfolk: {
                              status: true,
                              data: e,
                            },
                          }));
                        }}
                      >
                        <Space direction="vertical">
                          {[
                            "Fish Capture",
                            "Fish Processing",
                            "Fish Vending",
                            "Aquaculture",
                            "Gleaning",
                          ].map((e, i) => (
                            <div>
                              <Checkbox value={e} key={i} /> {e}
                            </div>
                          ))}
                          <Row>
                            <Col>
                              Others, please specify:{" "}
                              <Select
                                className="customInput"
                                mode="tags"
                                style={{ width: 150 }}
                                placeholder="Enter crops"
                                disabled={!otherInfo.fisherfolk.status}
                                onChange={(e) =>
                                  setOtherInfo((el) => ({
                                    ...el,
                                    fisherfolk: {
                                      status: true,
                                      data: [
                                        ...(el.fisherfolk?.data || []),
                                        e[e.length - 1],
                                      ],
                                    },
                                  }))
                                }
                                allowClear
                              />
                            </Col>
                          </Row>
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Col>
              <Col span={6} pull={18}>
                <strong>For Fisherfolk</strong>
              </Col>
            </Row>
            <Divider />

            <Row>
              <Col span={24}>
                <Form.Item>
                  <FarmCustomTable
                    setData={setFarmlandData}
                    data={farmlandData}
                    selectedBarangay={selectedBarangay}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Space>
              {current > 0 && (
                <Button onClick={handlePrev} size="large">
                  {current > 0 ? "Previous" : "Cancel"}
                </Button>
              )}
              {current < 1 && (
                <Button
                  type="primary"
                  onClick={handleNext}
                  style={{ width: 120 }}
                  size="large"
                >
                  {current < 1 ? "Next" : null}
                </Button>
              )}
              {current == 1 && (
                <Button type="primary" htmlType="submit" size="large">
                  Submit
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
};
