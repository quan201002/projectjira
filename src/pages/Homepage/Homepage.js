import React from "react";
import { useSelector } from "react-redux";
import { AutoComplete, Layout, theme } from "antd";
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
  const onSearch = (value, _e, info) => {
    console.log("value", value);
  };

  return (
    <div className="container1">
      <div className="content-container">
        <div className="homepage-header">
          <div
            style={{ fontWeight: "bold", textAlign: "left" }}
            className="mt-3"
          >
            USER MANAGEMENT
          </div>
          <span>
            Hello, {userLogin.name}
            <img
              style={{
                borderRadius: "50%",
                backgroundSize: "80%",
                marginLeft: "0.5rem",
              }}
              src={userLogin.avatar}
            ></img>
          </span>
        </div>
        <UserList />
      </div>
    </div>
  );
}
