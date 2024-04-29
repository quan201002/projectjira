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
const { Content, Sider } = Layout;

const renderLoginRequireMent = () => {
  return localStorage.getItem(USER_LOGIN) ? (
    <></>
  ) : (
    <div className="login-notification">
      <Space direction="vertical" size={16}>
        <Card className="card-notification text-center " title="Login require">
          <h3>Login your account to continue</h3>
          <Button className="bg-primary text-light mt-4">
            <NavLink to="/login">Login here</NavLink>
          </Button>
        </Card>
      </Space>
    </div>
  );
};
//menu items

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
              style={{ height: "100%" }}
              trigger={null}
              collapsible
              collapsed={collapsed}
              className="dark-sider"
            >
              <p className="text-left mb-3 mt-3 ml-lg-3 ml-md-0 checkbox-container">
                <Darkmode />
              </p>
              <Button
                className="dark-sider-button ml-lg-3 "
                type="text"
                icon={<MenuOutlined style={{ color: "white" }} />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Menu
                theme="dark"
                mode="inline"
                items={[
                  {
                    key: "1",
                    icon: <PlusOutlined />,
                    label: "Create task",
                    onClick: () => {
                      dispatch({
                        type: "OPEN_FORM_CREATE_TASK",
                        ComponentContentDrawer: FormCreateTask,
                        open: true,
                      });
                    },
                  },
                  {
                    key: "2",
                    icon: <SearchOutlined />,
                    label: "Search",
                  },
                ]}
              />
            </Sider>
            <Sider
              className="d-flex justify-content-center menu-sider white-sider"
              width={200}
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
              {renderLoginButton()}
              <p className="menu-item-container">
                <FormOutlined className="navbar-icon" />
                <NavLink className="menu-item" to="/signup">
                  Signup
                </NavLink>
              </p>
              <Divider type="horizontal" />
            </Sider>
            <div className="dropdown dropdown-bar">
              <button
                className="dropdown-toggle menu-button"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Menu
              </button>
              <div
                className="dropdown-menu controller-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <p className="logo-container text-center">
                  <NavLink className="" to="/">
                    <img src="../logojira.png" className="logo"></img>
                  </NavLink>
                </p>
                <p>
                  <BuildOutlined />
                  <NavLink className="menu-item" to="/createproject">
                    Createproject
                  </NavLink>
                </p>
                <p>
                  <AppstoreOutlined />
                  <NavLink className="  menu-item" to="/projectmanagement">
                    Project management
                  </NavLink>
                </p>
                <p>
                  <UserSwitchOutlined />
                  <NavLink className=" menu-item" to="/">
                    User management
                  </NavLink>
                </p>
                <p>
                  <LoginOutlined />
                  <NavLink className="menu-item" to="/login">
                    Login
                  </NavLink>
                </p>
                <p>
                  <FormOutlined />
                  <NavLink className="menu-item" to="/signup">
                    Signup
                  </NavLink>
                </p>
              </div>
            </div>
            <div className="account-actions">
              <Popconfirm
                title="Log out"
                description="Are you sure to logout ?"
                onConfirm={() => {
                  localStorage.removeItem(TOKEN);
                  localStorage.removeItem(USER_LOGIN);
                  window.location = "/login";
                }}
              >
                <button className="btn btn-bg-primary logout-button">
                  <p style={{ lineHeight: "100%" }}>Log out</p>
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ControllBar;
