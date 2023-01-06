import React, { Component } from "react";
import { getAllActivities } from "../utils/api";

const ActivityFeed = () => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useFocusEffect(
    useCallback(() => {
      setLoading(true);
      let isActive = true;

      const trigger = async () => {
        const result = await getAllActivities();
        console.log("result::::::", result);
        setList(result);
      };

      if (isActive) trigger();
      setLoading(false);

      return () => {
        isActive = false;
      };
    }, [list])
  );

  return <div>Activity Feed</div>;
};

export default ActivityFeed;
