import React, { useCallback, Suspense } from "react";
import "./Layout.css";
import { Layout, Menu, Dropdown, Icon, Spin } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Breadcrumb from "@/components/breadcrumb/index";
import "antd/dist/antd.css";
import routes from "@/router/index";
import { fedLogout } from "@/action/system/login";
import history from "@/utils/history";
import useToggle from "@/hooks/useToggle";
import { useDispatch } from "redux-react-hook";
import RouterLoading from "@/components/common/RouterLoading";
const { Header, Content } = Layout;
function MainLayout(props) {
    //state
    const [collapsed, toggleCollapsed] = useToggle(false);
    //action
    const dispatch = useDispatch();
    const logout = useCallback(() => dispatch(fedLogout()), [dispatch]);
    const layoutMenu = (
        <Menu>
            <Menu.Item>
                <div
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    首页
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => logout}>退出</div>
            </Menu.Item>
        </Menu>
    );
    return (
        <Router>
            <Layout className="main-container">
                <Sidebar collapsed={collapsed} />
                <Layout>
                    <Header>
                        <Icon
                            type={collapsed ? "menu-unfold" : "menu-fold"}
                            style={{ fontSize: "25px", color: "#fff" }}
                            onClick={toggleCollapsed}
                        />

                        <div className="header-right">
                            <Dropdown overlay={layoutMenu}>
                                <span className="">
                                    孙星 <Icon type="down" />
                                </span>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            background: "#fff",
                            minHeight: 280
                        }}
                    >
                        <Breadcrumb />
                        <Suspense fallback={<RouterLoading />}>
                            <Switch>
                                {routes.map((route, index) => {
                                    const MainCom = route.main;
                                    return (
                                        <Route
                                            path={route.path}
                                            component={() => <MainCom />}
                                            key={route.path}
                                            exact
                                        />
                                    );
                                })}
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}
export default MainLayout;
