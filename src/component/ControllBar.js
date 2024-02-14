import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
//menu items

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
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
              style={{ height: "100vh", backgroundColor: "black" }}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            ></Sider>
            <Sider
              style={{
                background: colorBgContainer,
                height: "100vh",
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                }}
                items={items2}
              />
            </Sider>
          </div>
        </Content>
      </Layout>
    </>
  );
};
export default ControllBar;
