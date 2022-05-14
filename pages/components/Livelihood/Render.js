import { Row, Col, Table, Button, Tag, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";

function titleText(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++)
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

  return splitStr.join(" ");
}

export default ({ data }) => {
  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const columns = [
    {
      title: "Name",
      width: 200,
      render: (_, row) => (
        <Button type='text' onClick={() => console.log(row)}>
          {titleText(
            `${row?.name.name} ${row?.name.middleName[0]}. ${
              row?.name.lastName
            } ${
              row?.name.extensionName?.length != 0 &&
              row?.name.extensionName != undefined
                ? row?.name.extensionName
                : ""
            }`
          )}
        </Button>
      ),
    },
    {
      title: "Brgy",
      width: 150,
      render: (_, row) => row?.address.barangay,
    },
    {
      title: "Contact No.",
      width: 150,
      render: (_, row) => row?.contactNum,
    },
    {
      title: "Livelihood",
      width: 150,
      render: (_, row) => (
        <Space direction='vertical'>
          {row?.profile?.type.map((el, i) => (
            <Tag key={i} color={color[el]}>
              {el}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Functions",
      align: "center",
      render: () => <Button icon={<SettingOutlined />}>Settings</Button>,
    },
  ];
  return (
    <Row>
      <Col span={17}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 500 }}
          pagination={{
            pageSize: 10,
            total: 999,
          }}
        />
      </Col>
      <Col span={7}>naolism</Col>
    </Row>
  );
};
