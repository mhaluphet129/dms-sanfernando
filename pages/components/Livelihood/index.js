import React, { useState } from "react";
import { Tabs, Button } from "antd";

import AddForm from "../../components/AddForm";
export default () => {
  const [visible, setVisible] = useState(false);
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
        destroyInactiveTabPane
      >
        <Tabs.TabPane tab='Farmer' key='1'>
          NAOL
        </Tabs.TabPane>
        <Tabs.TabPane tab='Farmworker' key='2'>
          Farmworker
        </Tabs.TabPane>
        <Tabs.TabPane tab='Fisherfolk' key='3'>
          Fisherfolk
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
