import React from "react";

const useTime = () => {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDate(new Date());
  }
  return { date };
};

export default useTime;
