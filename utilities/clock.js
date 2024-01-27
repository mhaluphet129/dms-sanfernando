import moment from "moment";
import React, { useEffect, useState } from "react";

export default () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);
  return <strong>{moment(date).format("HH:MM a")}</strong>;
};
