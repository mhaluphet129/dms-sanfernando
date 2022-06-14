import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Input,
  Divider,
  Button,
  Space,
  Modal,
  Steps,
  Table,
  Typography,
  Tag,
  Image,
  List,
  Badge,
  Select,
  InputNumber,
  message,
  DatePicker,
  Checkbox,
} from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

import FarmCustomTable from "./FarmCustomTable";
import TitleText from "../../assets/js/TitleText";

import jason from "../../assets/json";
import axios from "axios";

const { Step } = Steps;

export default ({ profileVisible, setProfileVisible, info, programs }) => {
  const [current, setCurrent] = useState(0);
  const [farmlandData, setFarmlandData] = useState([]);

  // etcetera
  const [type, setType] = useState("");

  const [fname, setFname] = useState(TitleText(`${info?.name?.name}`));
  const [mname, setMname] = useState(TitleText(`${info?.name?.middleName}`));
  const [sname, setSname] = useState(TitleText(`${info?.name.lastName}`));
  const [gname, setGname] = useState(info?.gender);
  const [street, setStreet] = useState(TitleText(`${info?.address.street}`));
  const [barangay, setBarangay] = useState(
    TitleText(`${info?.address.barangay}`)
  );
  const [contact, setContact] = useState(info?.contactNum);
  const [dateBirth, setDateBirth] = useState(info?.birth.dateOfBirth);
  const [placeBirth, setPlaceBirth] = useState(
    TitleText(`${info?.birth.placeOfBirth}`)
  );
  const [civil, setCivil] = useState(info?.civil);
  const [spouseName, setSfname] = useState(info?.spouse?.name);
  const [spouseMiddlename, setSmname] = useState(info?.spouse?.middleName);
  const [spouseLastname, setSlname] = useState(info?.spouse?.lastName);
  const [religion, setReligion] = useState(info?.religion);
  const [education, setEducation] = useState(info?.highestEducation);
  const [isPWD, setIsPWD] = useState(info?.isDisabledPerson);
  const [is4Ps, setIs4Ps] = useState(info?.is4Ps);
  const [isIP, setIsIP] = useState(info?.ethnicity.isIp);
  const [ipName, setIpName] = useState(info?.ethnicity.nameOfEthnicity);
  const [hasID, setHasID] = useState(info?.government.hasId);
  const [idNum, setIdNum] = useState(info?.government.idNum);
  const [hasCoop, setHasCoop] = useState(info?.hasCoopOrAssoc.status);
  const [coopName, setCoopName] = useState(info?.hasCoopOrAssoc?.name);
  const [emergencyNum, setEmergencyNum] = useState(info?.emergency.number);
  const [emergencyName, setEmergencyName] = useState(
    TitleText(`${info?.emergency.name}`)
  );
  const [crops, setCrops] = useState(info?.profile.crops);
  const [livestock, setLivestock] = useState(info?.profile.livestock);
  const [poultry, setPoultry] = useState(info?.profile.poultry);
  const [cropsCheck, setCropsCheck] = useState(info?.profile.crops.length > 0);
  const [livestockCheck, setlivestockCheck] = useState(
    info?.profile.livestock.length > 0
  );
  const [poultryCheck, setpoultryCheck] = useState(
    info?.profile.poultry.length > 0
  );
  const [farmerworker, setFarmworker] = useState(info?.profile.farmWorker);
  const [fisherfolk, setFisherfolk] = useState(info?.profile.fisherFolks);
  const [farmworkerExtra, setFarmworkerExtra] = useState([]);
  const [fisherfolkExtra, setFisherfolkExtra] = useState([]);
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

  let columns2 = [
    {
      title: "status",
      align: "center",
      width: 80,
      render: (_, row) => <Badge status={row?.status ? "success" : "error"} />,
    },
    {
      title: "Program",
      render: (_, row) => row?.name,
    },
  ];

  const data = [
    {
      key: "1",
      Question: "Person With Disability (PWD)?",
      YesNo: (
        <Tag color={isPWD ? "success" : "error"}>{isPWD ? "Yes" : "No"}</Tag>
      ),
    },
    {
      key: "2",
      Question: "4P's Beneficiary?",
      YesNo: (
        <Tag color={is4Ps ? "success" : "error"}>{is4Ps ? "Yes" : "No"}</Tag>
      ),
    },
    {
      key: "3",
      Question: "Member of Indigenous Group?",
      YesNo: (
        <Tag color={isIP ? "success" : "error"}>{isIP ? "Yes" : "No"}</Tag>
      ),
      Specify: ipName != "" && ipName != undefined && isIP ? ipName : "",
    },
    {
      key: "4",
      Question: "With Government ID?",
      YesNo: (
        <Tag color={hasID ? "success" : "error"}>{hasID ? "Yes" : "No"}</Tag>
      ),
      Specify: idNum != "" && idNum != undefined && hasID ? idNum : "",
    },
    {
      key: "5",
      Question: "Member of any Farmer Association/Cooperation?",
      YesNo: (
        <Tag color={hasCoop ? "success" : "error"}>
          {hasCoop ? "Yes" : "No"}
        </Tag>
      ),
      Specify:
        coopName != "" && coopName != undefined && hasCoop ? coopName : "",
    },
  ];

  //data for Type of farmer Activity
  const farmerActivity = [
    <Typography.Text>
      Crops:{" "}
      {crops?.map((el, i) => (
        <Tag key={i}>{el}</Tag>
      ))}
      {crops?.length == 0 && (
        <Typography.Text type='secondary' italic>
          No Data
        </Typography.Text>
      )}
    </Typography.Text>,
    <Typography.Text>
      Livestock:{" "}
      {livestock?.map((el, i) => (
        <Tag key={i}>{el}</Tag>
      ))}
      {livestock?.length == 0 && (
        <Typography.Text type='secondary' italic>
          No Data
        </Typography.Text>
      )}
    </Typography.Text>,
    <Typography.Text>
      Poultry:{" "}
      {poultry?.map((el, i) => (
        <Tag key={i}>{el}</Tag>
      ))}
      {poultry?.length == 0 && (
        <Typography.Text type='secondary' italic>
          No Data
        </Typography.Text>
      )}
    </Typography.Text>,
  ];

  // data for Kind of Work (farmworker)
  const farmworkerActivity = farmerworker ? farmerworker : [];

  //data for Type of Fishing Activity
  const fishingActivity = fisherfolk ? fisherfolk : [];

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  //HANDLERS NI BEBE *mwah*
  const handleChange = (current) => {
    setCurrent(current);
  };

  const handleNext = () => {
    if (current < 2) setCurrent(current + 1);
    else alert("add me");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSave = async (eenie) => {
    setType("");
    let obj = {};

    if (eenie == "name") {
      obj = {
        name: {
          lastName: sname,
          name: fname,
          middleName: mname,
        },
        gender: gname,
      };
    }

    if (eenie == "address") {
      obj = {
        address: {
          barangay,
          street,
        },
      };
    }

    if (eenie == "contact") {
      obj = {
        contactNum: contact,
      };
    }

    if (eenie == "birth") {
      obj = {
        birth: {
          dateOfBirth: dateBirth,
          placeOfBirth: placeBirth,
        },
      };
    }

    if (eenie == "status") {
      obj = {
        civil,
        religion,
        spouse: {
          name: spouseName,
          middleName: spouseMiddlename,
          lastName: spouseLastname,
        },
      };
    }

    if (eenie == "education") {
      obj = {
        highestEducation: education,
      };
    }

    if (eenie == "other") {
      obj = {
        is4Ps,
        isDisabledPerson: isPWD,
        ethnicity: {
          isIp: isIP,
          nameOfEthnicity: ipName,
        },
        government: {
          hasId: hasID,
          idNum,
        },
        hasCoopOrAssoc: {
          status: hasCoop,
          name: coopName,
        },
      };
    }

    if (eenie == "emergency") {
      obj = {
        emergency: {
          name: emergencyName,
          number: emergencyNum,
        },
      };
    }

    if (eenie == "farmer") {
      obj = {
        profile: {
          crops,
          livestock,
          poultry,
        },
      };
    }

    if (eenie == "farmworker") {
      obj = {
        profile: {
          farmWorker: farmerworker.concat(farmworkerExtra),
        },
      };
    }

    if (eenie == "fishfolk") {
      obj = {
        profile: {
          fisherFolks: fisherfolk.concat(fisherfolkExtra),
        },
      };
    }

    let res = await axios.put("/api/livelihood", {
      payload: {
        mode: "update",
        update: obj,
        id: info?._id,
      },
    });

    if (res?.data.success) message.success("Updated.");
    else message.error("Can't update");
  };

  useEffect(() => {
    if (info?.farmobj?.length > 0) {
      info.farmobj.map((el, i) =>
        setFarmlandData((naol) => [
          ...naol,
          {
            index: i,
            loc: el?.location,
            docType: el?.ownershipDocument,
            owner: {
              type: el.ownerType,
              data: el.ownerName,
            },
            totalArea: el.totalArea,
            docNum: el.documentNumber,
            arr1: [...el.crops],
            arr2: [...el.livestock],
          },
        ])
      );
    }
  }, [info]);

  return (
    <Modal
      visible={profileVisible}
      width={800}
      onCancel={() => {
        setProfileVisible(false);
        setCurrent(0);
        setFarmlandData([]);
      }}
      footer={null}
      closable={false}
    >
      <div>
        <Row>
          <Col span={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {info?.profileImage ? (
                <Image
                  width={150}
                  height={150}
                  style={{
                    borderRadius: "50%",
                  }}
                  src={info?.profileImage}
                />
              ) : (
                <UserOutlined
                  style={{
                    fontSize: 150,
                    color: "#aaa",
                    width: "100%",
                    textAlign: "center",
                  }}
                />
              )}
              <Space
                direction='vertical'
                size='small'
                style={{ display: "flex" }}
              >
                <Typography.Text strong>
                  {TitleText(
                    `${info?.name?.name} ${
                      info?.name?.middleName?.length > 0
                        ? info?.name?.middleName[0] + "."
                        : ""
                    } ${info?.name?.lastName}`
                  )}
                </Typography.Text>
                <Typography.Text strong>
                  <Space direction='vertical'>
                    {info?.profile?.type.map((el, i) => (
                      <Tag key={i} color={color[el]}>
                        {el}
                      </Tag>
                    ))}
                  </Space>
                </Typography.Text>
              </Space>
            </div>
          </Col>

          <Col span={11}>
            <Table
              columns={columns2}
              dataSource={programs}
              pagination={false}
              scroll={{ y: 200 }}
              rowKey={(row) => row._id}
            />
          </Col>
        </Row>
        <Divider />
      </div>
      <Steps size='small' current={current} progressDot onChange={handleChange}>
        <Step title='Part I' description='Personal Information' />
        <Step title='Part II' description='Farm Profile' />
        <Step title='Part III' description='Scanned Documents' />
      </Steps>
      <Divider />

      <div style={{ display: current != 0 ? "none" : null }}>
        <Row>
          {/* Name and Gender */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              {type == "name" ? (
                <>
                  <Typography.Text type='secondary'>
                    Surname: <br />
                    <Input
                      placeholder='Surname'
                      value={sname}
                      onChange={(e) => setSname(e.target.value)}
                    />
                  </Typography.Text>

                  <Typography.Text type='secondary'>
                    Name: <br />
                    <Input
                      placeholder='Name'
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </Typography.Text>

                  <Typography.Text type='secondary'>
                    Middlename: <br />
                    <Input
                      placeholder='Middlename'
                      value={mname}
                      onChange={(e) => setMname(e.target.value)}
                    />
                  </Typography.Text>

                  <Select
                    defaultValue={info?.gender}
                    onChange={(e) => setGname(e)}
                  >
                    <Select.Option value='male'>Male</Select.Option>
                    <Select.Option value='female'>Female</Select.Option>
                  </Select>
                </>
              ) : (
                <>
                  <Typography.Text type='secondary'>
                    Full Name: <br />
                    <Typography.Text strong>
                      {TitleText(`${sname}, ${fname} ${mname}`)}
                    </Typography.Text>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Gender: <br />
                    <Typography.Text strong>
                      {TitleText(`${gname}`)}
                    </Typography.Text>
                  </Typography.Text>
                </>
              )}
              {type == "name" && (
                <Button type='primary' onClick={() => handleSave("name")}>
                  Save
                </Button>
              )}
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Name and Gender</strong>
            <br />
            {type == "name" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setSname(info?.name.lastName);
                  setFname(info?.name.name);
                  setMname(info?.name.middleName);
                }}
              >
                <small>cancel</small>{" "}
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("name")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Address Details */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              {type == "address" ? (
                <>
                  <Typography.Text type='secondary'>
                    Barangay: <br />
                    <Select
                      defaultValue={barangay}
                      onChange={(e) => setBarangay(e)}
                    >
                      {jason.barangays.map((el) => (
                        <Select.Option value={el}>{el}</Select.Option>
                      ))}
                    </Select>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Street: <br />
                    <Input
                      placeholder='Set street'
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </Typography.Text>
                  {type == "address" && (
                    <Button
                      type='primary'
                      onClick={() => handleSave("address")}
                    >
                      Save
                    </Button>
                  )}
                </>
              ) : (
                <Typography.Text type='secondary'>
                  Barangay:{"  "}
                  <Typography.Text strong>{barangay}</Typography.Text>
                  <br />
                  Street:{"  "}
                  <Typography.Text strong>{street}</Typography.Text>
                </Typography.Text>
              )}
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Address Details</strong>
            <br />
            {type == "address" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setStreet(info?.address.street);
                  setBarangay(info?.address.barangay);
                }}
              >
                <small>cancel</small>{" "}
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("address")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />
        <Row>
          {/* Contact */}
          <Col span={18} push={6}>
            {type == "contact" ? (
              <>
                <Typography.Text type='secondary'>
                  Contact Number: <br />
                  <InputNumber
                    addonBefore='+63'
                    maxLength={10}
                    controls={false}
                    value={contact}
                    onChange={(e) => setContact(e)}
                  />
                </Typography.Text>
                {type == "contact" && (
                  <Button type='primary' onClick={() => handleSave("contact")}>
                    Save
                  </Button>
                )}
              </>
            ) : (
              <Typography.Text type='secondary'>
                Contact Number: <br />
                <Typography.Text strong>0{contact}</Typography.Text>
              </Typography.Text>
            )}
          </Col>
          <Col span={6} pull={18}>
            <strong>Contact</strong>
            <br />
            {type == "contact" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setContact(info?.contactNum);
                }}
              >
                <small>cancel</small>{" "}
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("contact")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />
        <Row>
          {/* Birth */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              {type == "birth" ? (
                <>
                  <Typography.Text type='secondary'>
                    Date of Birth: <br />
                    <DatePicker
                      format='MMMM DD, YYYY'
                      defaultValue={moment(info?.birth.dateOfBirth)}
                      disabledDate={(_) => _ && _ > moment().endOf("day")}
                      onChange={(e) => setDateBirth(e)}
                    />
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Place of Birth: <br />
                    <Input
                      value={placeBirth}
                      onChange={(e) => setPlaceBirth(e.target.value)}
                    />
                  </Typography.Text>
                  {type == "birth" && (
                    <Button type='primary' onClick={() => handleSave("birth")}>
                      Save
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Typography.Text type='secondary'>
                    Date of Birth: <br />
                    <Typography.Text strong>
                      {moment(dateBirth).format("MMMM DD, YYYY")}
                    </Typography.Text>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Place of Birth: <br />
                    <Typography.Text strong>{placeBirth}</Typography.Text>
                  </Typography.Text>
                </>
              )}
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Birth</strong>
            <br />
            {type == "birth" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setDateBirth(info?.birth.dateOfBirth);
                  setPlaceBirth(info?.birth.placeOfBirth);
                }}
              >
                <small>cancel</small>{" "}
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("birth")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Status */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              {type == "status" ? (
                <>
                  <Typography.Text type='secondary'>
                    Civil Status: <br />
                    <Select
                      defaultValue={civil}
                      onChange={(e) => setCivil(e)}
                      style={{ width: 150 }}
                    >
                      <Select.Option value='Single'>Single</Select.Option>
                      <Select.Option value='Married'>Married</Select.Option>
                      <Select.Option value='Widowed'>Widowed</Select.Option>
                      <Select.Option value='Separated'>Separated</Select.Option>
                    </Select>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Name of Spouse: <br />
                    <Typography.Text type='secondary'>
                      Surname: <br />
                      <Input
                        placeholder='Surname'
                        value={spouseLastname}
                        disabled={civil == "Single"}
                        onChange={(e) => setSlname(e.target.value)}
                      />
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                      Name: <br />
                      <Input
                        placeholder='Name'
                        value={spouseName}
                        disabled={civil == "Single"}
                        onChange={(e) => setSfname(e.target.value)}
                      />
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                      Middlename: <br />
                      <Input
                        placeholder='Middlename'
                        value={spouseMiddlename}
                        disabled={civil == "Single"}
                        onChange={(e) => setSmname(e.target.value)}
                      />
                    </Typography.Text>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Religion: <br />
                    <Input
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                    />
                  </Typography.Text>
                  {type == "status" && (
                    <Button type='primary' onClick={() => handleSave("status")}>
                      Save
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Typography.Text type='secondary'>
                    Civil Status: <br />
                    <Typography.Text strong>{civil}</Typography.Text>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Name of Spouse: <br />
                    <Typography.Text
                      type={civil != "Married" ? "secondary" : null}
                      strong={civil != "Married"}
                    >
                      {civil == "Married"
                        ? TitleText(
                            `${spouseName} ${spouseMiddlename} ${spouseLastname}`
                          )
                        : "Not Applicable"}
                    </Typography.Text>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Religion: <br />
                    <Typography.Text strong>
                      {religion ? (
                        TitleText(`${religion}`)
                      ) : (
                        <span style={{ color: "#aaa", fontStyle: "italic" }}>
                          not set
                        </span>
                      )}
                    </Typography.Text>
                  </Typography.Text>
                </>
              )}
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Status</strong>
            <br />
            {type == "status" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setCivil(info?.civil);
                  setReligion(info?.religion);
                  setSfname(info?.spouse.name);
                  setSmname(info?.spouse.middleName);
                  setSlname(info?.spouse.lastName);
                }}
              >
                <small>cancel</small>{" "}
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("status")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />
        <Row>
          {/* Education */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              {type == "education" ? (
                <>
                  <Typography.Text type='secondary'>
                    Highest Formal Education <br />
                    <Select
                      defaultValue={info?.highestEducation}
                      onChange={(e) => setEducation(e)}
                      style={{ width: 150 }}
                    >
                      <Select.Option value='None'>None</Select.Option>
                      <Select.Option value='Elementary'>
                        Elementary
                      </Select.Option>
                      <Select.Option value='High School'>
                        High School
                      </Select.Option>
                      <Select.Option value='Vocational'>
                        Vocational
                      </Select.Option>
                      <Select.Option value='College'>College</Select.Option>
                      <Select.Option value='Post Graduate'>
                        Post Graduate
                      </Select.Option>
                    </Select>
                  </Typography.Text>
                  {type == "education" && (
                    <Button
                      type='primary'
                      onClick={() => handleSave("education")}
                    >
                      Save
                    </Button>
                  )}
                </>
              ) : (
                <Typography.Text type='secondary'>
                  Highest Formal Education <br />
                  <Typography.Text strong>{education}</Typography.Text>
                </Typography.Text>
              )}
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Education</strong>
            <br />
            {type == "education" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setEducation(info?.highestEducation);
                }}
              >
                <small>cancel</small>
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("education")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Other Information */}
          <Col span={18} push={6}>
            {type == "other" ? (
              <>
                <Typography.Text type='secondary'>
                  Person With Disability (PWD)?{"   "}
                  <Select
                    style={{ width: 75 }}
                    defaultValue={isPWD}
                    onChange={(e) => setIsPWD(e)}
                  >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Typography.Text>
                <br />
                <Typography.Text type='secondary'>
                  4P's Beneficiary?{"   "}
                  <Select
                    style={{ width: 75 }}
                    defaultValue={is4Ps}
                    onChange={(e) => setIs4Ps(e)}
                  >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Typography.Text>
                <br />
                <Typography.Text type='secondary'>
                  Member of Indigenous Group?{"   "}
                  <Select
                    style={{ width: 75 }}
                    defaultValue={isIP}
                    onChange={(e) => setIsIP(e)}
                  >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                  <Input
                    placeholder='Indigenous Group'
                    value={ipName}
                    disabled={!isIP}
                    onChange={(e) => setIpName(e.target.value)}
                  />
                </Typography.Text>
                <br />
                <Typography.Text type='secondary'>
                  With Government ID?{"   "}
                  <Select
                    style={{ width: 75 }}
                    defaultValue={hasID}
                    onChange={(e) => setHasID(e)}
                  >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                  <Input
                    placeholder='ID number'
                    disabled={!hasID}
                    value={idNum}
                    onChange={(e) => setIdNum(e.target.value)}
                  />
                </Typography.Text>
                <br />
                <Typography.Text type='secondary'>
                  Member of any Farmer Association/Cooperation?{"   "}
                  <Select
                    style={{ width: 75 }}
                    defaultValue={hasCoop}
                    onChange={(e) => setHasCoop(e)}
                  >
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                  <Input
                    placeholder='Specify'
                    disabled={!hasCoop}
                    value={coopName}
                    onChange={(e) => setCoopName(e.target.value)}
                  />
                </Typography.Text>
                {type == "other" && (
                  <Button type='primary' onClick={() => handleSave("other")}>
                    Save
                  </Button>
                )}
              </>
            ) : (
              <Input.Group>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  size={"small"}
                  showHeader={false}
                  rowKey={(row) => row._id}
                />
              </Input.Group>
            )}
          </Col>
          <Col span={6} pull={18}>
            <strong>Other Information</strong>
            <br />
            {type == "other" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setIsPWD(info?.isDisabledPerson);
                  setIs4Ps(info?.is4Ps);
                  setIsIP(info?.ethnicity.isIp);
                  setIpName(info?.ethnicity.nameOfEthnicity);
                  setHasID(info?.government.hasId);
                  setIdNum(info?.government.idNum);
                  setHasCoop(info?.hasCoopOrAssoc.status);
                  setCoopName(info?.hasCoopOrAssoc?.name);
                }}
              >
                <small>cancel</small>
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("other")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* In Case of Emergency */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              {type == "emergency" ? (
                <>
                  <Typography.Text type='secondary'>
                    Person to Contact <br />
                    <Input
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                    />
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Contact Number <br />
                    <InputNumber
                      addonBefore='+63'
                      maxLength={10}
                      controls={false}
                      value={emergencyNum}
                      onChange={(e) => setEmergencyNum(e)}
                    />
                  </Typography.Text>
                  {type == "emergency" && (
                    <Button
                      type='primary'
                      onClick={() => handleSave("emergency")}
                    >
                      Save
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Typography.Text type='secondary'>
                    Person to Contact <br />
                    <Typography.Text strong>{emergencyName}</Typography.Text>
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    Contact Number <br />
                    <Typography.Text strong>0{emergencyNum}</Typography.Text>
                  </Typography.Text>
                </>
              )}
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>In Case of Emergency</strong>
            <br />
            {type == "emergency" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setEmergencyName(info?.emergency.name);
                  setEmergencyNum(info?.emergency.number);
                }}
              >
                <small>cancel</small>
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("emergency")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
      </div>

      <div style={{ display: current != 1 ? "none" : null }}>
        <Row>
          {/* For farmer */}
          <Col span={18} push={6}>
            {type == "farmer" ? (
              <>
                <Row>
                  <Col>
                    <Checkbox
                      key={1}
                      checked={cropsCheck}
                      onChange={(e) => setCropsCheck(e.target.checked)}
                    >
                      Crops, please specify:
                    </Checkbox>
                    <Select
                      className='customInput'
                      mode='tags'
                      style={{ width: 500, marginLeft: 55 }}
                      placeholder='Enter crops'
                      value={crops}
                      onChange={(e) => setCrops(e)}
                      disabled={!cropsCheck}
                      allowClear
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Checkbox
                      key={2}
                      checked={livestockCheck}
                      onChange={(e) => setlivestockCheck(e.target.checked)}
                    >
                      Livestock, please specify:
                    </Checkbox>
                    <Select
                      className='customInput'
                      mode='tags'
                      style={{ width: 500, marginLeft: 55 }}
                      placeholder='Enter livestock'
                      value={livestock}
                      onChange={(e) => setLivestock((c) => [...c, e])}
                      disabled={!livestockCheck}
                      allowClear
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Checkbox
                      key={3}
                      checked={poultryCheck}
                      onChange={(e) => setpoultryCheck(e.target.check)}
                    >
                      Poultry, please specify:
                    </Checkbox>
                    <Select
                      className='customInput'
                      mode='tags'
                      size={4}
                      style={{ width: 500, marginLeft: 55 }}
                      placeholder='Enter poultry'
                      value={poultry}
                      onChange={(e) => setPoultry((c) => [...c, e])}
                      disabled={!poultryCheck}
                      allowClear
                    />
                  </Col>
                </Row>
                {type == "farmer" && (
                  <Button type='primary' onClick={() => handleSave("farmer")}>
                    Save
                  </Button>
                )}
              </>
            ) : (
              <Space direction='horizontal'>
                <List
                  size='small'
                  header={
                    <Typography.Text type='secondary'>
                      Type of Farming Activity:
                    </Typography.Text>
                  }
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text strong>{item}</Typography.Text>
                    </List.Item>
                  )}
                  dataSource={farmerActivity}
                  rowKey={(row) => row}
                />
              </Space>
            )}
          </Col>
          <Col span={6} pull={18}>
            <strong>For Farmer</strong>
            <br />
            {type == "farmer" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                  setCrops(info?.profile.crops);
                  setLivestock(info?.profile.livestock);
                  setPoultry(info?.profile.poultry);
                  setCropsCheck(info?.profile.crops.length > 0);
                  setlivestockCheck(info?.profile.livestock.length > 0);
                  setpoultryCheck(info?.profile.poultry.length > 0);
                }}
              >
                <small>cancel</small>
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("farmer")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* For Farmworker */}
          <Col span={18} push={6}>
            {type == "farmworker" ? (
              <>
                <Input.Group>
                  <Space>
                    <span label='Kind of Work'>
                      <Checkbox.Group onChange={(e) => setFarmworker(e)}>
                        <Row>
                          <Checkbox value='Land Preparation' key={1}>
                            Land Preparation
                          </Checkbox>
                        </Row>
                        <Row>
                          <Checkbox value='Planting/Transplanting' key={2}>
                            Planting/Transplanting
                          </Checkbox>
                        </Row>
                        <Row>
                          <Checkbox value='Cultivation' key={3}>
                            Cultivation
                          </Checkbox>
                        </Row>
                        <Row>
                          <Checkbox value='Harvesting' key={4}>
                            Harvesting
                          </Checkbox>
                        </Row>
                        <Row>
                          <Col>
                            Others, please specify:
                            <Select
                              className='customInput'
                              mode='tags'
                              style={{ width: 500, marginLeft: 35 }}
                              placeholder='Specify...'
                              onChange={(e) => setFarmworkerExtra(e)}
                              allowClear
                            />
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </span>
                  </Space>
                </Input.Group>
                {type == "farmworker" && (
                  <Button
                    type='primary'
                    onClick={() => handleSave("farmworker")}
                  >
                    Save
                  </Button>
                )}
              </>
            ) : (
              <Space direction='horizontal'>
                <List
                  size='small'
                  header={
                    <Typography.Text type='secondary'>
                      Kind of Work:
                    </Typography.Text>
                  }
                  dataSource={farmworkerActivity}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text strong>{item}</Typography.Text>
                    </List.Item>
                  )}
                />
              </Space>
            )}
          </Col>
          <Col span={6} pull={18}>
            <strong>For Farmworker</strong>
            <br />
            {type == "farmworker" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                }}
              >
                <small>cancel</small>
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("farmworker")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* For Fisherfolk */}
          <Col span={18} push={6}>
            {type == "fishfolk" ? (
              <>
                <Input.Group>
                  <Space>
                    <Checkbox.Group
                      onChange={(e) => {
                        setFisherfolk(e);
                      }}
                    >
                      <Row>
                        <Checkbox value='Fish Capture' key={1}>
                          Fish Capture
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Fish Processing' key={2}>
                          Fish Processing
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Fish Vending' key={3}>
                          Fish Vending
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Aquaculture' key={4}>
                          Aquaculture
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Gleaning' key={5}>
                          Gleaning
                        </Checkbox>
                      </Row>
                      <Row>
                        <Col>
                          Others, please specify:
                          <Select
                            className='customInput'
                            mode='tags'
                            style={{ width: 500, marginLeft: 35 }}
                            onChange={(e) => setFisherfolkExtra(e)}
                            allowClear
                          />
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Space>
                </Input.Group>
                {type == "fishfolk" && (
                  <Button type='primary' onClick={() => handleSave("fishfolk")}>
                    Save
                  </Button>
                )}
              </>
            ) : (
              <Space direction='horizontal'>
                <List
                  size='small'
                  header={
                    <Typography.Text type='secondary'>
                      Type of Fishing Activity:
                    </Typography.Text>
                  }
                  dataSource={fishingActivity}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text strong>{item}</Typography.Text>
                    </List.Item>
                  )}
                />
              </Space>
            )}
          </Col>
          <Col span={6} pull={18}>
            <strong>For Fisherfolk</strong>
            <br />
            {type == "fishfolk" ? (
              <Typography.Link
                onClick={() => {
                  setType("");
                }}
              >
                <small>cancel</small>
              </Typography.Link>
            ) : (
              <Typography.Link onClick={() => setType("fishfolk")}>
                <small>edit</small>
              </Typography.Link>
            )}
          </Col>
        </Row>
        <Divider />

        <Row>
          {/* Farm Land */}
          <br />
          <FarmCustomTable setData={null} data={farmlandData} viewOnly={true} />
        </Row>
      </div>

      <div style={{ display: current != 2 ? "none" : null }}>
        <Row>
          {/* Upload ID Picture */}
          <Col span={18} push={6}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>
                <br />
                <Image.PreviewGroup>
                  <Space style={{ display: "flex" }}>
                    {info?.personalfiles &&
                      info?.personalfiles.map((el) => (
                        <Image
                          width={150}
                          src={`/uploads/livelihood/${info?._id}/${el}`}
                        />
                      ))}
                  </Space>
                </Image.PreviewGroup>
              </Typography.Text>
              <br />
            </Space>
          </Col>
          <Col span={6} pull={18}>
            <strong>Personal Files</strong>
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
            <Button onClick={handlePrev}>
              {current > 0 ? "Previous" : null}
            </Button>
          )}
          {current < 2 && (
            <Button type='primary' onClick={handleNext}>
              {current < 2 ? "Next Page" : null}
            </Button>
          )}
          {current == 2 && (
            <Button type='primary' htmlType='submit'>
              Finish
            </Button>
          )}
        </Space>
      </div>
    </Modal>
  );
};
