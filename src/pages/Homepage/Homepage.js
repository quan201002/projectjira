import React from "react";
import "./Homepage.css";
import { useSelector } from "react-redux";
import { Layout, theme } from "antd";
import UserList from "./UserList";
import { Input, Space } from "antd";
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
export default function Homepage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  console.log("user", userLogin);
  return (
    <div className="home-container">
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "auto",
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="text-right  ">
            <span>
              Hello, {userLogin.name}{" "}
              <img
                style={{ borderRadius: "50%", backgroundSize: "80%" }}
                src={userLogin.avatar}
              ></img>
            </span>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
            height: "auto",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Search
              placeholder="search user"
              onSearch={onSearch}
              enterButton
              className="mb-5"
            />
            <UserList />
          </div>
        </Content>
      </Layout>
    </div>
  );
}
