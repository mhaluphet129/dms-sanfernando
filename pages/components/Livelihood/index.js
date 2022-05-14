import React, { useState, useEffect } from "react";
import { Tabs, Button, Table, Col, Row, notification } from "antd";
import axios from "axios";

import AddForm from "./AddForm";
import Farmers from "./Farmers";
import Farmworker from "./Farmworker";
import Fisherfolk from "./Fisherfolk";

export default () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("Farmer");
  const [data, setData] = useState([]);

  useEffect(async () => {
    let { data } = await axios.get("/api/livelihood", {
      params: { type },
    });

    if (data.success) {
      notification["success"]({
        description: data.message,
        placement: ["bottomRight"],
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
          <Farmers data={data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Farmworker' key='Farmworker'>
          <Farmworker data={data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Fisherfolk' key='Fisherfolk'>
          <Fisherfolk data={data} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
