import dynamic from "next/dynamic";
const Line = dynamic(
  () => import("@ant-design/charts").then(({ Line }) => Line),
  { ssr: false }
);

const data = [
  {
    year: "1991",
    value: 3,
  },
  {
    year: "1992",
    value: 4,
  },
];

const LineChart = () => {
  const config = {
    data: data,
    xField: "year",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: true },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [{ type: "marker-active" }],
    slider: {
      start: 0.1,
      end: 0.8,
    },
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
};

export default LineChart;
