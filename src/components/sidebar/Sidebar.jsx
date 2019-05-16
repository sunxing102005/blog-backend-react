import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { withRouter } from "react-router-dom";
import { routerConfig } from "../../router/routerConfig";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const sidebar = class App extends React.Component {
    state = {
        defaultOpenKeys: [],
        defaultSelectedKeys: []
        // sideBarRoutes: []
    };
    componentWillMount() {
        const currentPath = this.props.location.pathname;
        console.log("currentPath", currentPath);
        this.setState({ defaultSelectedKeys: [currentPath] });
        let selectedKey = "";
        routerConfig.forEach(router => {
            let flag = false;
            if (router.children && router.children.length) {
                flag = router.children.some(sub => sub.path == currentPath);
            }
            if (flag) {
                selectedKey = router.path;
                this.setState({ defaultOpenKeys: [selectedKey] });
            }
        });
        // const sideBarRoutes = routerConfig.find(item => item.path === "/")[
        //     "children"
        // ];
        // this.setState({ sideBarRoutes });
    }
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                className="siderbar"
                collapsed={this.props.collapsed}
            >
                <div className="logo">
                    <Link to="/">
                        {this.props.collapsed ? "" : "SUNX BLOG"}
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={this.defaultOpenKeys}
                    defaultSelectedKeys={this.defaultSelectedKeys}
                >
                    {routerConfig.map((route, index) => {
                        if (
                            route.children &&
                            route.children.length > 0 &&
                            route.hidden != true
                        ) {
                            return (
                                <SubMenu
                                    key={route.path}
                                    title={
                                        <span>
                                            <Icon type={route.meta.icon} />
                                            <span>{route.name}</span>
                                        </span>
                                    }
                                >
                                    {route.children
                                        .filter(item => !item.hidden)
                                        .map(child => {
                                            return (
                                                <Menu.Item key={child.path}>
                                                    <Link to={child.path}>
                                                        {child.name}
                                                    </Link>
                                                </Menu.Item>
                                            );
                                        })}
                                </SubMenu>
                            );
                        } else if (!route.hidden) {
                            return (
                                <Menu.Item key={route.path}>
                                    <Link to={route.path}>{route.name}</Link>
                                </Menu.Item>
                            );
                        } else {
                            return "";
                        }
                    })}
                    {/* <Menu.Item key="article">
                        <Link to="article">文章</Link>
                    </Menu.Item>
                    <Menu.Item key="news">
                        <Link to="news">新闻</Link>
                    </Menu.Item> */}
                </Menu>
            </Sider>
        );
    }
};
export default withRouter(sidebar);
