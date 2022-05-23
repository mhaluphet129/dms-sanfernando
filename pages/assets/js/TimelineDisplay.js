import { Timeline, Empty } from "antd";
import moment from "moment";

export default ({ data }) => {
  return (
    <Timeline
      reverse={true}
      mode='right'
      style={{ backgroundColor: "#fff", height: 350, overflow: "scroll" }}
    >
      {(data || {}).map((el, i) => (
        <Timeline.Item
          key={i}
          label={moment(el.time).format("MMM DD, YY \\at hha")}
        >
          {typeof el.label == "object" ? (
            el.label.map((el2) => <p>{el2}</p>)
          ) : (
            <p>{el.label}</p>
          )}
        </Timeline.Item>
      ))}
      {data?.length == 0 || !data ? <Empty /> : null}
    </Timeline>
  );
};
