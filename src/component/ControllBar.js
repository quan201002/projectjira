import React, { useState } from "react";
import {
  PlusCircleOutlined,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons";

import { Layout, theme } from "antd";
import { NavLink } from "react-router-dom";

const { Content, Sider } = Layout;

//menu items

const ControllBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <div className="sider-container">
            <Sider
              className="d-flex  justify-content-center"
              style={{ height: "100vh", backgroundColor: "black" }}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <p>
                <NavLink className="menu-sidebar-item    text-light">
                  <PlusCircleOutlined />
                </NavLink>
              </p>
              <p>
                <NavLink className="menu-sidebar-item    text-light">
                  <SearchOutlined />
                </NavLink>
              </p>
            </Sider>
            <Sider
              className="d-flex   justify-content-center "
              style={{
                background: colorBgContainer,
                height: "100vh",
              }}
              width={200}
            >
              <p>
                <SettingFilled />
                <NavLink className="  menu-item" to="/createproject">
                  createproject
                </NavLink>
              </p>
              <p>
                <SettingFilled />
                <NavLink className="  menu-item" to="/projectmanagement">
                  Project management
                </NavLink>
              </p>
            </Sider>
          </div>
        </Content>
      </Layout>
    </>
  );
};
export default ControllBar;
