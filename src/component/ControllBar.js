import {
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons";
import React, { useState } from "react";

import { Button, Divider, Layout, Menu, Popconfirm, theme } from "antd";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import FormCreateTask from "../HOC/JiraCloneHOC/FormCreateTask";
import { TOKEN, USER_LOGIN } from "../redux/constant/SettingSystem";

const { Content, Sider } = Layout;

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
        {/* <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Launch demo modal
        </button> */}
        <div className="container1">
          <div className="sider-container">
            <Sider
              style={{ height: "100%" }}
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <Button
                type="text"
                icon={<MenuOutlined style={{ color: "white" }} />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: "100%",
                  height: 64,
                  padding: "18px",
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
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
              className="d-flex justify-content-center "
              style={{
                background: colorBgContainer,
                height: "100vh",
              }}
              width={200}
            >
              <p>
                <SettingFilled />
                <NavLink className="  menu-item" to="/createproject">
                  Createproject
                </NavLink>
              </p>
              <p>
                <SettingFilled />
                <NavLink className="  menu-item" to="/projectmanagement">
                  Project management
                </NavLink>
              </p>
              <p>
                <SettingFilled />
                <NavLink className=" menu-item" to="/Home">
                  User management
                </NavLink>
              </p>
              <p>
                <SettingFilled />
                <NavLink className="menu-item" to="/login">
                  Login
                </NavLink>
              </p>
              <p>
                <SettingFilled />
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
                  window.location.replace("/login");
                }}
              >
                <p className="menu-item ml-0" style={{ cursor: "pointer" }}>
                  <LogoutOutlined className="mr-1" />
                  Log out
                </p>
              </Popconfirm>
              <Divider type="horizontal" />
            </Sider>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ControllBar;
