import React, { Component } from "react";
import { getAllActivitiesUrl } from "../utils/api";

const ActivityFeed = () => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    console.log(getAllActivitiesUrl);
    fetch(getAllActivitiesUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    setLoading(false);
  }, []);

  return <div>Activity Feed</div>;
};

export default ActivityFeed;
