import React, { Component } from "react";
import { getAllActivitiesUrl } from "../utils/api";
import axios from "axios";
import { MAIN_GREEN } from "../utils/constants";
import {
  Alert,
  Space,
  Spin,
  Avatar,
  Button,
  List,
  Skeleton,
  Divider,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const ActivityFeed = () => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    console.log(getAllActivitiesUrl);
    axios
      .get(getAllActivitiesUrl)
      .then((response) => {
        console.log(response.data);
        setList(response.data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    setLoading(false);
  }, []);

  return (
    <div className="feed">
      {loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <InfiniteScroll
          dataLength={list.length}
          // next={loadMoreData}
          hasMore={list.length < 19}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={list}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.from}</a>}
                  description={item.call_type}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ActivityFeed;
