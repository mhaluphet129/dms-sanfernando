import { EllipsisOutlined } from "@ant-design/icons";
import { Timeline, Typography } from "antd";
import moment from "moment";

export default ({ data }) => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Timeline reverse={true} mode='right'>
        {data &&
          data.map((el, i) => (
            <Timeline.Item
              key={i}
              label={moment(el.time).format("MMM DD, YY - hh:MM a")}
            >
              {typeof el.label == "object" ? (
                el.label.map((el2) => <p>{el2}</p>)
              ) : (
                <p>{el.label}</p>
              )}
            </Timeline.Item>
          ))}
      </Timeline>
    </div>
  );
};
