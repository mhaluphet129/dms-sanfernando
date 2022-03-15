import { Timeline } from "antd";
import moment from "moment";

export default ({ data }) => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Timeline reverse={true} mode='right'>
        <Timeline.Item label={"naol3"}>TEST1</Timeline.Item>
        <Timeline.Item label={"naol2"}>TEST2</Timeline.Item>
        <Timeline.Item label={"naol1"}>TEST3</Timeline.Item>
      </Timeline>
    </div>
  );
};
