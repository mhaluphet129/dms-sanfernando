import React, { useState, useEffect } from "react";
import axios from "axios";

import Farmers from "./Farmers";

export default () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState("");
  const [trigger, setTrigger] = useState(0);

  useEffect(async () => {
    setLoader("fetch-livelihood");
    let { data } = await axios.get("/api/livelihood", {
      params: { mode: "fetch" },
    });

    if (data.success) {
      setData(data.data);
      setLoader("");
    } else message.error(data.message);
  }, [trigger]);

  return <Farmers data={data} loader={loader} setTrigger={setTrigger} />;
};
