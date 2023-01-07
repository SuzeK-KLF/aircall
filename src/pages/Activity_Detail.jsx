import React, { Component } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Spin } from "antd";
import { getActivityByIdUrl } from "../utils/api";
import { MAIN_GREEN } from "../utils/constants";
import Description from "./Description";
import Title from "./Title";

const { Meta } = Card;

const ActivityDetail = () => {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(getActivityByIdUrl(id))
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
    setLoading(false);
  }, []);

  return loading && data ? (
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
    <div>
      <Card
        style={{
          width: 376,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar
              style={{
                backgroundColor: MAIN_GREEN,
              }}
              icon={<UserOutlined />}
            />
          }
          title={<Title from={data.from} />}
          description={
            <Description
              direction={data.direction}
              to={data.to}
              via={data.via}
              duration={data.duration}
              call_type={data.call_type}
              is_archived={data.is_archived}
              created_at={data.created_at}
            />
          }
        />
      </Card>
    </div>
  );
};

export default ActivityDetail;
