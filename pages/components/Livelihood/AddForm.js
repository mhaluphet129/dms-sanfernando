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
} from "antd";
import ResizeObserver from "rc-resize-observer";
import FloatLabel from "../../assets/js/FloatLabel";

export default () => {
  const [modalAdd, setModalAdd] = useState(true);
  const [tableWidth, setTableWidth] = useState(0);
  const [current, setCurrent] = useState(0);
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
        <Radio.Group>
          <Space>
            <Radio value='Yes'>Yes</Radio>
            <Radio value='No'>No</Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "2",
      Question: "4P's Beneficiary?",
      YesNo: (
        <Radio.Group>
          <Space>
            <Radio value='Yes'>Yes</Radio>
            <Radio value='No'>No</Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "3",
      Question: "Member of Indigenous Group?",
      YesNo: (
        <Radio.Group>
          <Space>
            <Radio value='Yes'>Yes</Radio>
            <Radio value='No'>No</Radio>
          </Space>
        </Radio.Group>
      ),
      Specify: <Input placeholder='Indigenous Group' allowClear />,
    },
    {
      key: "4",
      Question: "With Government ID?",
      YesNo: (
        <Radio.Group>
          <Space>
            <Radio value='Yes'>Yes</Radio>
            <Radio value='No'>No</Radio>
          </Space>
        </Radio.Group>
      ),
      Specify: <Input placeholder='ID number' allowClear />,
    },
    {
      key: "5",
      Question: "Member of any Farmer Association/Cooperation?",
      YesNo: (
        <Radio.Group>
          <Space>
            <Radio value='Yes'>Yes</Radio>
            <Radio value='No'>No</Radio>
          </Space>
        </Radio.Group>
      ),
      Specify: <Input placeholder='Specify' allowClear />,
    },
  ];

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }

  //HANDLERS NI BEBE *mwah*
  const handleChange = (current) => {
    setCurrent(current);
  };

  const handleDisplay = (current) => {
    if (current == 0) {
      return (
        <>
          <Row>
            {/* Name and Gender */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Surname'>
                      <Input placeholder='Surname' allowClear />
                    </Form.Item>
                    <Form.Item label='Firstname'>
                      <Input
                        placeholder='Firstname'
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item label='Middle Name'>
                      <Input placeholder='Middle Name' allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item label='Extension Name'>
                      <Input placeholder='Extension' allowClear />
                    </Form.Item>
                    <Form.Item
                      label='Gender'
                      style={{ marginLeft: 5, width: 150 }}
                    >
                      <Select value='male'>
                        <Select.Option value='male'>Male</Select.Option>
                        <Select.Option value='female'>Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Name and Gender</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Address Details */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='House/Lot/Bldg no.'>
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label='Street/Sitio/Subdv.'>
                      <Input
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item label='Barangay'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item label='Municipality/City'>
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label='Province'>
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label='Region'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Address Details</strong>
            </Col>
          </Row>

          <Divider />

          <Row>
            {/* Contact */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Contact Number'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Contact</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Birth */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Date of Birth'>
                      <DatePicker style={{ marginRight: 5 }} />
                    </Form.Item>
                    <Form.Item label='Place of Birth'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Birth</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Status */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Civil Status' style={{ marginRight: 5 }}>
                      <Select value='Single' style={{ width: 150 }}>
                        <Select.Option value='Single'>Single</Select.Option>
                        <Select.Option value='Married'>Married</Select.Option>
                        <Select.Option value='Widowed'>Widowed</Select.Option>
                        <Select.Option value='Separated'>
                          Separated
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label='Name of Spouse'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item label='Religion'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Status</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Mother's Name */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label="Mother's Maiden Name">
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Mother's Name</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Household */}
            <Col span={18} push={6}>
              <Form layout='Horizontal'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Household Head?'>
                      <Radio.Group>
                        <Radio value={"Yes"}>Yes</Radio>
                        <Radio value={"No"}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Name of Household Head'>
                      {/* If Household Head == No */}
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label='Relationship'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item label='No. of living household members'>
                      <InputNumber />
                    </Form.Item>
                  </Space>
                </Input.Group>
                <Input.Group>
                  <Space>
                    <Form.Item label='No. of male'>
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label='No. of female' style={{ marginLeft: 10 }}>
                      <InputNumber />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Household</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Education */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item
                      label='Highest Formal Education'
                      style={{ marginRight: 5 }}
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
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Education</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* Other Information */}
            <Col span={18} push={6}>
              <Form layout='Horizontal'>
                <Input.Group>
                  <ResizeObserver
                    onResize={({ width }) => {
                      setTableWidth(width);
                    }}
                  >
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                      size={"small"}
                      showHeader={false}
                    />
                  </ResizeObserver>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Other Information</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* In Case of Emergency */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Person to Contact'>
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label='Contact Number'>
                      <Input allowClear />
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>In Case of Emergency</strong>
            </Col>
          </Row>
        </>
      );
    } else if (current == 1) {
      return (
        <>
          <Row>
            {/* Main Livelihood */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Checkbox.Group onChange={onChange}>
                      <Checkbox value='Farmer'>Farmer</Checkbox>
                      <Checkbox value='Farmworker'>Farmworker</Checkbox>
                      <Checkbox value='Fisherfolk'>Fisherfolk</Checkbox>
                    </Checkbox.Group>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>Main Livelihood</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* For farmer */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Type of Farming Activity'>
                      <Checkbox.Group onChange={onChange}>
                        <Row>
                          <Checkbox value='Rice'>Rice</Checkbox>
                        </Row>
                        <Row>
                          <Checkbox value='Corn'>Corn</Checkbox>
                        </Row>
                        <Row>
                          <Col>
                            <Checkbox value='Other Crops'>
                              <Form.Item label='Other Crops, please specify:'>
                                <Input allowClear style={{ marginLeft: 10 }} />
                              </Form.Item>
                            </Checkbox>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Checkbox value='Livestock'>
                              <Form.Item label='Livestock, please specify:'>
                                <Input allowClear style={{ marginLeft: 10 }} />
                              </Form.Item>
                            </Checkbox>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Checkbox value='Poultry'>
                              <Form.Item label='Poultry, please specify:'>
                                <Input allowClear style={{ marginLeft: 10 }} />
                              </Form.Item>
                            </Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>For Farmer</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* For Farmworker */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Kind of Work'>
                      <Checkbox.Group onChange={onChange}>
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
                            <Checkbox value='Other'>
                              <Form.Item label='Others, please specify:'>
                                <Input allowClear style={{ marginLeft: 10 }} />
                              </Form.Item>
                            </Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
            </Col>
            <Col span={6} pull={18}>
              <strong>For Farmworker</strong>
            </Col>
          </Row>
          <Divider />

          <Row>
            {/* For Fisherfolk */}
            <Col span={18} push={6}>
              <Form layout='vertical'>
                <Input.Group>
                  <Space>
                    <Form.Item label='Type of Fishing Activity'>
                      <Checkbox.Group onChange={onChange}>
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
                            <Checkbox value='Other'>
                              <Form.Item label='Others, please specify:'>
                                <Input allowClear style={{ marginLeft: 10 }} />
                              </Form.Item>
                            </Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Space>
                </Input.Group>
              </Form>
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
                  <Form.Item label='No. of Farm Parcel: '>
                    <Input placeholder='' allowClear />
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item label='Agrarian Reform Beneficiary (ARB)?'>
                    <Radio.Group>
                      <Radio value={"Yes"}>Yes</Radio>
                      <Radio value={"No"}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </Input.Group>
            </Col>
            <Col span={6} pull={18}>
              <strong>Farm Land</strong>
            </Col>
          </Row>
        </>
      );
    } else if (current == 2) {
      return <>3</>;
    } else return false;
  };

  return (
    <Modal visible={modalAdd} width={800} closable={false}>
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

      {/* current 0 */}
      {handleDisplay(current)}
    </Modal>
  );
};
