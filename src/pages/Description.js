import React from "react";
import Moment from "react-moment";

const Description = ({
  direction,
  from,
  to,
  via,
  duration,
  call_type,
  is_archived,
  created_at,
}) => {
  const durationTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return "Duration -- " + hours + ":" + minutes + ":" + seconds;
  };

  return <div style={{ display: "flex", flexDirection: "column", }}>
    <div>{durationTime(duration)}</div>
    <div>{call_type}</div>
    <div>Line: {via}</div>
    <div>{is_archived ? "Archived" : "Not Archived"}</div>
    <div>{direction}</div>
    <Moment>{created_at}</Moment>
  </div>
};

export default Description;


