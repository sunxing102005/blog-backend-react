import React, { Component } from "react";
import "./Layout.css";
import { Layout, Menu, Dropdown, Icon, LocaleProvider, Avatar } from "antd";
import { HashRouter as Router, Route } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Breadcrumb from "@/components/breadcrumb/index";
import zhCN from "antd/lib/locale-provider/zh_CN";
// import Routes from "./router/index";
import "antd/dist/antd.css";
import routes from "@/router/index";
import RouterGurad from "@/components/common/RouterGurad";
const { Header, Content } = Layout;
export default class MainLayout extends React.Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    };
    render() {
        const layoutMenu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.onLogOut}>退出</span>
                </Menu.Item>
            </Menu>
        );
        const { children } = this.props;
        return (
            // <LocaleProvider locale={zhCN}>
            <Router>
                {/* <Route
                        path="/login"
                        component={AsyncComponent(() =>
                            import("@/components/login/index")
                        )}
                        key="/login"
                    /> */}
                <Layout className="main-container">
                    <Sidebar collapsed={this.state.collapsed} />
                    <Layout>
                        <Header>
                            <Icon
                                type={
                                    this.state.collapsed
                                        ? "menu-unfold"
                                        : "menu-fold"
                                }
                                style={{ fontSize: "25px", color: "#fff" }}
                                onClick={this.toggle}
                            />

                            <div className="header-right">
                                {/* <Avatar
                                        style={{
                                            backgroundColor: "#87d068",
                                            marginRight: 20
                                        }}
                                        icon="user"
                                    /> */}
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
                            {routes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        component={route.main}
                                        key={route.path}
                                    />
                                );
                            })}
                            {/* {children} */}
                            {/* <RouterGurad config={routes} /> */}
                        </Content>
                    </Layout>
                </Layout>
            </Router>
            // </LocaleProvider>
        );
    }
}
