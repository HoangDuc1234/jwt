import React, { useState } from "react";
import { HomeOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Trang chủ</Link>, "1", <HomeOutlined />),
  getItem(<Link to="/user">Người dùng</Link>, "2", <UserOutlined />),
  getItem("Đăng nhập", "3", <LoginOutlined />, [
    getItem(<Link to="/login">Đăng nhập</Link>, "sub31"),
    getItem(<Link to="/register">Đăng ký</Link>, "sub32"),
    getItem("Quên mật khẩu", "sub33"),
  ]),
];
const HeaderLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            items={location.pathname.split("/").map((item) => {
              let title = item.toString();
              title = title.charAt(0).toUpperCase() + title.slice(1);
              return { title: title };
            })}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          HDuc ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HeaderLayout;
