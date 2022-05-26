import React from "react";
import Render from "../Render";
export default ({ data, pieData, type, loader, setTrigger }) => {
  return (
    <Render
      data={data}
      pieData={pieData}
      type={type}
      loader={loader}
      setTrigger={setTrigger}
    />
  );
};
