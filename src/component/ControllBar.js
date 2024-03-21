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
import { NavLink } from "react-router-dom";
import FormCreateTask from "../HOC/JiraCloneHOC/FormCreateTask";
import { TOKEN, USER_LOGIN } from "../redux/constant/SettingSystem";
import { Card, Space } from "antd";
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
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
              <Button
                className="dark-sider-button"
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
              style={{
                background: colorBgContainer,
                height: "100vh",
              }}
              width={200}
            >
              <p>
                <BuildOutlined />
                <NavLink className="  menu-item" to="/createproject">
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
              <Popconfirm
                title="Log out"
                description="Are you sure to logout ?"
                onConfirm={() => {
                  localStorage.removeItem(TOKEN);
                  localStorage.removeItem(USER_LOGIN);
                  window.location = "/login";
                }}
              >
                <p className="menu-item ml-0" style={{ cursor: "pointer" }}>
                  <LogoutOutlined className="mr-1" />
                  Log out
                </p>
              </Popconfirm>
              <Divider type="horizontal" />
            </Sider>
            <div class="dropdown dropdown-bar">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Menu
              </button>
              <div
                class="dropdown-menu controller-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <p>
                  <BuildOutlined />
                  <NavLink className="  menu-item" to="/createproject">
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
                <Popconfirm
                  title="Log out"
                  description="Are you sure to logout ?"
                  onConfirm={() => {
                    localStorage.removeItem(TOKEN);
                    localStorage.removeItem(USER_LOGIN);
                    window.location = "/login";
                  }}
                >
                  <p className="menu-item ml-0" style={{ cursor: "pointer" }}>
                    <LogoutOutlined className="mr-1" />
                    Log out
                  </p>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ControllBar;
