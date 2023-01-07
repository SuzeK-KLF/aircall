import React from "react";
import { getAllActivitiesUrl, getActivityByIdUrl } from "../utils/api";
import axios from "axios";
import { MAIN_GREEN } from "../utils/constants";
import Moment from "react-moment";
import { Spin, Button, List, Skeleton, Divider, Tabs } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  DownloadOutlined,
  InfoCircleTwoTone,
  PhoneTwoTone,
  CustomerServiceTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ActivityFeed = () => {
  const [list, setList] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tabKey, setTabKey] = React.useState(0);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(getAllActivitiesUrl)
      .then((response) => {
        setData(response.data);
        if (tabKey !== 0) {
          // return items whose archived is true
          const resultFilter = response.data.filter((e) => {
            return e.is_archived === true;
          });
          setList(resultFilter);
        } else {
          // return all items
          setList(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  };

  const toggleArchive = (item) => {
    setLoading(true);
    axios
      .patch(getActivityByIdUrl(item.id), { is_archived: !item.is_archived })
      .then((response) => {
        fetchData();
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    setLoading(false);
  };

  const onChange = (key) => {
    setTypesFilter(key);
  };

  const setTypesFilter = (id) => {
    if (id !== 0) {
      // return items whose archived is true
      const result = data;
      const resultFilter = result.filter((e) => {
        return e.is_archived === true;
      });
      setList(resultFilter);
      setTabKey(1);
    } else {
      // return all items
      setList(data);
      setTabKey(0);
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
              label: id == 0 ? "All calls" : "Archived",
              key: id,
            };
          })}
        />
        <InfiniteScroll
          dataLength={list.length}
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
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin />
            </div>
          ) : (
            <List
              dataSource={list}
              renderItem={(item) => (
                <div>
                  <Divider style={{ color: "gray", opacity: "0.7" }}>
                    <Moment format="MMM D YYYY hh:mm">{item.created_at}</Moment>
                  </Divider>
                  <List.Item
                    key={item.id}
                    actions={[
                      !item.is_archived ? (
                        <Button
                          type="link"
                          icon={<DownloadOutlined />}
                          size="default"
                          onClick={() => {
                            toggleArchive(item);
                          }}
                          style={{ color: MAIN_GREEN, marginRight: "-15px" }}
                        >
                          Archive
                        </Button>
                      ) : (
                        <Button
                          type="link"
                          size="default"
                          onClick={() => {
                            toggleArchive(item);
                          }}
                          style={{ color: MAIN_GREEN, marginRight: "-15px" }}
                        >
                          Unarchive
                        </Button>
                      ),
                      <Link to={`/detail/${item.id}`}>
                        <InfoCircleTwoTone
                          twoToneColor={MAIN_GREEN}
                          // style={{marginRight: '-5px'}}
                        />
                      </Link>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        item.call_type === "voicemail" ? (
                          <CustomerServiceTwoTone
                            // twoToneColor={MAIN_GREEN}
                            style={{ marginTop: "20px", fontSize: "20px" }}
                          />
                        ) : item.call_type === "answered" ? (
                          <PhoneTwoTone
                            twoToneColor={MAIN_GREEN}
                            style={{ marginTop: "20px", fontSize: "20px" }}
                          />
                        ) : (
                          <PhoneTwoTone
                            twoToneColor="red"
                            style={{ marginTop: "20px", fontSize: "20px" }}
                          />
                        )
                      }
                      title={item.from ? item.from : "unknown"}
                      description={item.call_type ? item.call_type : "missed"}
                    />
                    {/* <div>{item.duration}s</div> */}
                  </List.Item>
                </div>
              )}
            />
          )}
        </InfiniteScroll>
      </div>
      )
    </div>
  );
};

export default ActivityFeed;
