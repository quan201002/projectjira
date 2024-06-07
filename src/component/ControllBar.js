import {
  AppstoreOutlined,
  BuildOutlined,
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingFilled,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import { Button, Divider, Layout, Menu, Popconfirm, theme } from "antd";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import FormCreateTask from "../HOC/JiraCloneHOC/FormCreateTask";
import { TOKEN, USER_LOGIN } from "../redux/constant/SettingSystem";
import { Card, Space } from "antd";
import Darkmode from "./GlobalSetting/Darkmode";
import RippleButton from "./RippleButton";
const { Content, Sider } = Layout;

const renderLoginRequireMent = () => {
  return localStorage.getItem(USER_LOGIN) ? (
    <></>
  ) : (
    <div className="login-notification">
      <h3 className="login-requirement">Login your account to continue</h3>
      <RippleButton />
    </div>
  );
};

const ControllBar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const renderLoginButton = () => {
    return localStorage.getItem(USER_LOGIN) ? (
      <p style={{ cursor: "pointer" }} className="menu-item-container">
        <LogoutOutlined className="navbar-icon" />
        <Popconfirm
          className="menu-item"
          title="Log out"
          description="Are you sure to logout ?"
          onConfirm={() => {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            navigate("./login");
          }}
        >
          Log out
        </Popconfirm>
      </p>
    ) : (
      <></>
    );
  };
  return (
    <>
      <Layout style={{ height: "100%" }}>
        <div className="container1">
          <div className="sider-container">
            {renderLoginRequireMent()}
            <Sider
              className="d-flex justify-content-center menu-sider white-sider"
              width={220}
            >
              <p className="logo-container text-center">
                <NavLink className="logo-link " to="/">
                  <img
                    src="../logojira.png"
                    alt="logojira"
                    className="logo"
                  ></img>
                </NavLink>
              </p>
              <p className="text-left mb-3 mt-3 ml-lg-3 ml-md-0 checkbox-container darkmode-button">
                <Darkmode />
              </p>
              <p className="menu-item-container">
                <BuildOutlined className="navbar-icon" />
                <NavLink className="menu-item" to="/createproject">
                  Createproject
                </NavLink>
              </p>

              <p className="menu-item-container">
                <AppstoreOutlined className="navbar-icon" />
                <NavLink className="menu-item" to="/projectmanagement">
                  Project management
                </NavLink>
              </p>
              <p className="menu-item-container">
                <UserSwitchOutlined className="navbar-icon" />
                <NavLink className="menu-item" to="/">
                  User management
                </NavLink>
              </p>
              <p className="menu-item-container">
                <UserOutlined className="navbar-icon" />

                <NavLink className="menu-item" to="/profile">
                  Profile
                </NavLink>
              </p>
              <p
                className="menu-item-container"
                onClick={() => {
                  dispatch({
                    type: "OPEN_FORM_CREATE_TASK",
                    ComponentContentDrawer: FormCreateTask,
                    open: true,
                  });
                }}
              >
                <PlusOutlined className="navbar-icon" />
                <span className="menu-item" style={{ cursor: "pointer" }}>
                  Create Task
                </span>
              </p>
              {renderLoginButton()}
              <p className="menu-item-container">
                <FormOutlined className="navbar-icon" />
                <NavLink className="menu-item" to="/signup">
                  Signup
                </NavLink>
              </p>
              <Divider type="horizontal" />
            </Sider>
            <div className="header-bar header-controll">
              <nav className="navbar navbar-expand-lg navbar-light bg-light text-center navbar-background">
                <p className="logo-container text-left logo-reps mb-0">
                  <NavLink className="" to="/">
                    <img src="../logojira.png" className="logo"></img>
                  </NavLink>
                </p>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <p className="text-left mb-3 mt-3 ml-lg-3 ml-md-0 checkbox-container">
                    <Darkmode />
                  </p>
                  <p>
                    <NavLink className="menu-item" to="/createproject">
                      Createproject
                    </NavLink>
                  </p>
                  <p>
                    <NavLink className="  menu-item" to="/projectmanagement">
                      Project management
                    </NavLink>
                  </p>
                  <p>
                    <NavLink className=" menu-item" to="/">
                      User management
                    </NavLink>
                  </p>

                  <p>
                    <NavLink className="menu-item" to="/signup">
                      Signup
                    </NavLink>
                  </p>
                  <div className="account-actions text-center">
                    <Popconfirm
                      title="Log out"
                      description="Are you sure to logout ?"
                      onConfirm={() => {
                        localStorage.removeItem(TOKEN);
                        localStorage.removeItem(USER_LOGIN);
                        window.location = "/login";
                      }}
                    >
                      <button
                        className="btn btn-bg-primary logout-button my-button"
                        style={{ margin: "auto" }}
                      >
                        <p style={{ lineHeight: "100%" }}>Log out</p>
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ControllBar;
