import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import axios from "axios";

import AddForm from "./AddForm";
import Farmers from "./Farmers";
import Farmworker from "./Farmworker";
import Fisherfolk from "./Fisherfolk";

export default () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("Farmer");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState("");
  const [trigger, setTrigger] = useState(0);

  useEffect(async () => {
    setLoader("fetch-livelihood");
    let { data } = await axios.get("/api/livelihood", {
      params: { type, mode: "fetch" },
    });

    if (data.success) {
      setData(data.data);
      setLoader("");
    } else message.error(data.message);
  }, [type, trigger]);

  return (
    <>
      <AddForm
        visible={visible}
        setVisible={setVisible}
        cb={() => setTrigger(trigger + 1)}
      />
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
        centered
      >
        <Tabs.TabPane tab='Farmer' key='Farmer'>
          <Farmers data={data} type={type} loader={loader} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Farmworker' key='Farmworker'>
          <Farmworker data={data} type={type} loader={loader} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Fisherfolk' key='Fisherfolk'>
          <Fisherfolk data={data} type={type} loader={loader} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
