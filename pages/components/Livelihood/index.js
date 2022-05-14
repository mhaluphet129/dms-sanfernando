import React, { useState, useEffect } from "react";
import { Tabs, Button, Table, Col, Row, notification } from "antd";
import axios from "axios";

import AddForm from "./AddForm";

function titleText(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++)
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

  return splitStr.join(" ");
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("Farmer");
  const [data, setData] = useState([]);
  const columns = [
    {
      title: `List of all ${type}`,
      render: (_, row) => (
        <Button type='text'>
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
  ];

  const RenderBody = () => (
    <Row>
      <Col span={18}>TEST</Col>
      <Col span={6}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 450 }}
          pagination={{
            pageSize: 10,
            total: 999,
          }}
        />
      </Col>
    </Row>
  );

  useEffect(async () => {
    let { data } = await axios.get("/api/livelihood", {
      params: { type },
    });

    if (data.success) {
      notification["success"]({
        description: data.message,
      });
      setData(data.data);
    } else message.error(data.message);
  }, [type]);

  return (
    <>
      <AddForm visible={visible} setVisible={setVisible} />
      <Tabs
        defaultActiveKey='1'
        size='large'
        tabBarGutter={24}
        tabBarExtraContent={{
          right: (
            <Button style={{ width: 150 }} onClick={() => setVisible(true)}>
              Add
            </Button>
          ),
        }}
        onChange={(e) => setType(e)}
        destroyInactiveTabPane
      >
        <Tabs.TabPane tab='Farmer' key='Farmer'>
          <RenderBody />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Farmworker' key='Farmworker'>
          <RenderBody />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Fisherfolk' key='Fisherfolk'>
          <RenderBody />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
