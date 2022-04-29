import { useState } from "react";
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
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

export default ({ visible, setVisible }) => {
  const [current, setCurrent] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [isHead, setIsHead] = useState(true);
  const [maxCount, setMaxCount] = useState(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
          placeholder='Indigenous Group'
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
          placeholder='ID number'
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
          placeholder='Specify'
          disabled={!otherInfo.hasID.status}
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
    console.log(otherInfo);
  };

  const handleNext = () => {
    if (current < 2) setCurrent(current + 1);
    else alert("add me");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <Modal
      visible={visible}
      width={800}
      onCancel={() => {
        setVisible(false);
        setCurrent(0);
      }}
      footer={null}
      destroyOnClose
    >
      <Steps
        size='small'
        current={current}
        type='navigation'
        onChange={handleChange}
      >
        <Step title='Part I' description='Personal Information' />
        <Step title='Part II' description='Farm Profile' />
        <Step title='Finish' description='Review' />
      </Steps>
      <Divider />
      <Form
        layout='vertical'
        onFinish={(val) => {
          console.log(val);
        }}
      >
        <div style={{ display: current != 0 ? "none" : null }}>
          <Row>
            {/* Name and Gender */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item label='Surname' name='surname'>
                    <Input placeholder='Surname' allowClear />
                  </Form.Item>
                  <Form.Item label='Firstname' name='firstname'>
                    <Input placeholder='Firstname' allowClear />
                  </Form.Item>
                  <Form.Item label='Middle Name' name='middlename'>
                    <Input placeholder='Middle Name' allowClear />
                  </Form.Item>
                </Space>
              </Input.Group>
              <Input.Group>
                <Space>
                  <Form.Item label='Extension Name' name='extensionname'>
                    <Input placeholder='Extension' allowClear />
                  </Form.Item>
                  <Form.Item
                    label='Gender'
                    style={{ marginLeft: 5, width: 150 }}
                    name='gender'
                  >
                    <Select value='male'>
                      <Select.Option value='male'>Male</Select.Option>
                      <Select.Option value='female'>Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Space>
              </Input.Group>
            </Col>
            <Col span={6} pull={18}>
              <strong>Name and Gender</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Address Details */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item label='House/Lot/Bldg no.' name='housenum'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item label='Street/Sitio/Subdv.' name='street'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item label='Barangay' name='barangay'>
                    <Input allowClear />
                  </Form.Item>
                </Space>
              </Input.Group>
              <Input.Group>
                <Space>
                  <Form.Item label='Municipality/City' name='city'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item label='Province' name='province'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item label='Region' name='region'>
                    <Input allowClear />
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
                  <Form.Item label='Contact Number' name='contactnum'>
                    <InputNumber
                      addonBefore='+63'
                      maxLength={11}
                      controls={false}
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
                  <Form.Item label='Date of Birth' name='dateofbirth'>
                    <DatePicker style={{ marginRight: 5 }} />
                  </Form.Item>
                  <Form.Item label='Place of Birth' name='placeofbirth'>
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
                    label='Civil Status'
                    style={{ marginRight: 5 }}
                    name='status'
                  >
                    <Select
                      value={maritalStatus}
                      style={{ width: 150 }}
                      onChange={(e) => setMaritalStatus(e)}
                    >
                      <Select.Option value='Single'>Single</Select.Option>
                      <Select.Option value='Married'>Married</Select.Option>
                      <Select.Option value='Widowed'>Widowed</Select.Option>
                      <Select.Option value='Separated'>Separated</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label='Name of Spouse' name='spousename'>
                    <Input
                      disabled={maritalStatus.toLowerCase() != "married"}
                      allowClear
                    />
                  </Form.Item>
                </Space>
              </Input.Group>
              <Input.Group>
                <Space>
                  <Form.Item label='Religion' name='religion'>
                    <Input allowClear />
                  </Form.Item>
                </Space>
              </Input.Group>
            </Col>
            <Col span={6} pull={18}>
              <strong>Status</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Mother's Name */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item label="Mother's Maiden Name" name='mothername'>
                    <Input allowClear />
                  </Form.Item>
                </Space>
              </Input.Group>
            </Col>
            <Col span={6} pull={18}>
              <strong>Mother's Name</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Household */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item label='Household Head?' name='isHouseholdHead'>
                    <Radio.Group onChange={(e) => setIsHead(e.target.value)}>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </Input.Group>
              <Input.Group>
                <Space>
                  <Form.Item
                    label='Name of Household Head'
                    name='householdname'
                  >
                    {/* If Household Head == No */}
                    <Input allowClear disabled={isHead} />
                  </Form.Item>
                  <Form.Item label='Relationship' name='relationship'>
                    <Input allowClear disabled={isHead} />
                  </Form.Item>
                </Space>
              </Input.Group>
              <Input.Group>
                <Space>
                  <Form.Item
                    label='No. of living household members'
                    name='totalHouseholdMembers'
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>
              </Input.Group>
              <Input.Group>
                <Space>
                  <Form.Item label='No. of male' name='numberOfMale'>
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    label='No. of female'
                    style={{ marginLeft: 10 }}
                    name='numberOfFemale'
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Space>
              </Input.Group>
            </Col>
            <Col span={6} pull={18}>
              <strong>Household</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Education */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item
                    label='Highest Formal Education'
                    style={{ marginRight: 5 }}
                    name='education'
                  >
                    <Select value='None' style={{ width: 200 }}>
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
                  <Form.Item label='Person to Contact' name='personToContact'>
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item label='Contact Number' name='emergency contact'>
                    <InputNumber
                      addonBefore='+63'
                      maxLength={11}
                      controls={false}
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
                  <Form.Item name='type' label='Type of livelihood'>
                    <Checkbox.Group>
                      <Checkbox
                        value='Farmer'
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
                        value='Farmworker'
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
                        value='Fisherfolk'
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
                  <Form.Item label='Type of Farming Activity'>
                    <Checkbox.Group disabled={!otherInfo.farmer.status}>
                      <Row>
                        <Col>
                          <Checkbox
                            value='crops'
                            onChange={(e) =>
                              setOtherInfo((el) => ({
                                ...el,
                                farmer: {
                                  ...el.farmer,
                                  crops: {
                                    status: e.target.checked,
                                  },
                                },
                              }))
                            }
                          >
                            Crops, please specify:
                          </Checkbox>
                          <Select
                            className='customInput'
                            mode='tags'
                            style={{ width: 500, marginLeft: 35 }}
                            placeholder='Enter crops'
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
                            value='livestocks'
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
                            className='customInput'
                            mode='tags'
                            style={{ width: 500, marginLeft: 35 }}
                            placeholder='Enter livestock'
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
                            value='poultry'
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
                            className='customInput'
                            mode='tags'
                            size={4}
                            style={{ width: 500, marginLeft: 35 }}
                            placeholder='Enter poultry'
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
                  <Form.Item label='Kind of Work'>
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
                      <Row>
                        <Checkbox value='Land Preparation'>
                          Land Preparation
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Planting/Transplanting'>
                          Planting/Transplanting
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Cultivation'>Cultivation</Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Harvesting'>Harvesting</Checkbox>
                      </Row>
                      <Row>
                        <Col>
                          Others, please specify:
                          <Select
                            className='customInput'
                            mode='tags'
                            style={{ width: 500, marginLeft: 35 }}
                            placeholder='Enter crops'
                            disabled={!otherInfo.farmworker.status}
                            onChange={(e) =>
                              setOtherInfo((el) => ({
                                ...el,
                                farmworker: {
                                  status: true,
                                  data: [
                                    ...el.farmworker?.data,
                                    e[e.length - 1],
                                  ],
                                },
                              }))
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
              <strong>For Farmworker</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* For Fisherfolk */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item label='Type of Fishing Activity'>
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
                      <Row>
                        <Checkbox value='Fish Capture'>Fish Capture</Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Fish Processing'>
                          Fish Processing
                        </Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Fish Vending'>Fish Vending</Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Aquaculture'>Aquaculture</Checkbox>
                      </Row>
                      <Row>
                        <Checkbox value='Gleaning'>Gleaning</Checkbox>
                      </Row>
                      <Row>
                        <Col>
                          <Select
                            className='customInput'
                            mode='tags'
                            style={{ width: 500, marginLeft: 35 }}
                            placeholder='Enter crops'
                            disabled={!otherInfo.fisherfolk.status}
                            onChange={(e) =>
                              setOtherInfo((el) => ({
                                ...el,
                                fisherfolk: {
                                  status: true,
                                  data: [
                                    ...el.fisherfolk?.data,
                                    e[e.length - 1],
                                  ],
                                },
                              }))
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
              <strong>For Fisherfolk</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Farm Land */}
            <Col span={18} push={6}>
              <Input.Group>
                <Space>
                  <Form.Item label='No. of Farm Parcel: ' name='numberofparcel'>
                    <Input placeholder='' allowClear />
                  </Form.Item>
                  <Form.Item
                    label='Agrarian Reform Beneficiary (ARB)?'
                    name='isARB'
                  >
                    <Radio.Group>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </Input.Group>
            </Col>
            <Col span={6} pull={18}>
              <strong>Farm Land</strong>
            </Col>
          </Row>
        </div>

        <div style={{ display: current != 2 ? "none" : null }}>
          <Row>
            {/* Upload ID Picture */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Upload ID Picture'>
                      <div>
                        <Upload
                          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                          listType='picture-card'
                          maxCount={1}
                          onChange={() => {
                            setMaxCount(true);
                          }}
                        >
                          {maxCount ? null : uploadButton}
                        </Upload>
                      </div>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>ID Picture</strong>
            </Col>
          </Row>
          <Row>
            {/* Scanned Document */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Upload Scanned Documents'>
                      <div>
                        <Upload
                          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                          maxCount={3}
                          multiple
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </div>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Scanned Document</strong>
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
                {current > 0 ? "Previous" : "Cancel"}
              </Button>
            )}
            {current < 2 && (
              <Button type='primary' onClick={handleNext}>
                {current < 2 ? "Next" : "Add"}
              </Button>
            )}
            {current == 2 && (
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            )}
          </Space>
        </div>
      </Form>
    </Modal>
  );
};
