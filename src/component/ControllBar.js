import {
  MenuOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons";
import React, { useState } from "react";

import { Button, Divider, Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

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
            <Divider type="horizontal"/>
          </Sider>
        </div>
        </div>
      </Layout>
    </>
  );
};
export default ControllBar;
