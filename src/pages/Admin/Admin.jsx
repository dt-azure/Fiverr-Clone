import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import { getLocalStorage } from "../../utils/util";
const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [stateOpenKeys, setStateOpenKeys] = useState(["1", "12"]);
  const userLocal = getLocalStorage("user");

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Users",
      children: [
        {
          key: "11",
          icon: <UserOutlined />,
          label: (
            <NavLink to="/admin/users?query=all&page=1">Manage User</NavLink>
          ),
        },
      ],
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Gigs",
      children: [
        {
          key: "21",
          icon: <UserOutlined />,
          label: (
            <NavLink to="/admin/gigs?query=all&page=1">Manage Gig</NavLink>
          ),
        },
        {
          key: "22",
          icon: <UserOutlined />,
          label: (
            <NavLink to="/admin/order?query=all&page=1">Manage Order</NavLink>
          ),
        },
        {
          key: "23",
          icon: <UserOutlined />,
          label: <NavLink to="/admin/category?query=all&page=1">Manage Category</NavLink>,
        },
        {
          key: "24",
          icon: <UserOutlined />,
          label: (
            <NavLink to="/admin/subcategories">Manage Subcategory</NavLink>
          ),
        },
      ],
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Others",
      children: [
        {
          key: "31",
          icon: <UserOutlined />,
          label: <NavLink to="/admin/comment">Manage Comments</NavLink>,
        },
      ],
    },
  ];

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(items);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    if (!userLocal || userLocal.data.content.user.role !== "ADMIN") {
      navigate("/");
    } else if (
      window.location.pathname == "/admin" ||
      window.location.pathname == "/admin/"
    ) {
      navigate("/admin/users?query=all&page=1");
    }
  }, []);

  if (userLocal && userLocal.data.content.user.role === "ADMIN") {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["11"]}
            items={items}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
  return <Loading className="full-screen" />;
};
export default Admin;
