import React from "react";
import Render from "../Render";
export default ({ data, pieData, loader, setTrigger }) => {
  return (
    <Render
      data={data}
      pieData={pieData}
      loader={loader}
      setTrigger={setTrigger}
    />
  );
};
