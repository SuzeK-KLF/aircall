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
  Tabs,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserOutlined } from "@ant-design/icons";

const ActivityFeed = () => {
  const [list, setList] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tabKey, setTabKey] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    console.log(getAllActivitiesUrl);
    axios
      .get(getAllActivitiesUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setList(response.data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    setLoading(false);
  }, []);

  const onChange = (key) => {
    console.log(key);
    setTypesFilter(key);
  };

  const setTypesFilter = (id) => {
    if (id !== 0) {
      // return items whose archived is true
      setList(data.filter((e) => e.is_archived == true));
    } else {
      // return all items
      setList(data);
    }
  };

  return (
    <div className="feed">
        <div>
          <Tabs
            onChange={onChange}
            type="card"
            size="large"
            tabBarStyle={{
              width: "376px",
              color: MAIN_GREEN,
            }}
            items={new Array(2).fill(null).map((_, id) => {
              return {
                label: id == 0 ? "All calls" : "Inbox",
                key: id,
              };
            })}
          />
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
                    avatar={
                      <Avatar
                        style={{ backgroundColor: MAIN_GREEN }}
                        icon={<UserOutlined />}
                      />
                    }
                    title={<a href="https://ant.design">{item.from}</a>}
                    description={item.call_type}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      )
    </div>
  );
};

export default ActivityFeed;
