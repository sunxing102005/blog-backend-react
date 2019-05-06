import { Breadcrumb, Alert } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { routerConfig } from "../../router/routerConfig";
const SelfBreadcrumb = class SelfBreadcrumb extends React.Component {
    getRouterConfig(ret = [], currentPath, routerConfig) {
        if (routerConfig) {
            routerConfig.forEach((item, index) => {
                if (currentPath.indexOf(item.path) != -1) {
                    ret.push({ name: item.name, path: item.path });
                    if (item.children) {
                        this.getRouterConfig(ret, currentPath, item.children);
                    }
                }
            });
        }
        return ret;
    }
    render() {
        const { location } = this.props;
        const pathSnippets = this.getRouterConfig(
            [],
            location.pathname,
            routerConfig
        );
        console.log("pathSnippets", pathSnippets);
        const extraBreadcrumbItems = pathSnippets.map((item, index) => {
            // console.log("index", index);
            // const url = `${pathSnippets.slice(0, index + 1).join("/")}`;
            // console.log("url", url);
            return (
                <Breadcrumb.Item key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                </Breadcrumb.Item>
            );
        });
        console.log("extraBreadcrumbItems", extraBreadcrumbItems);
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                <Link to="/">首页</Link>
            </Breadcrumb.Item>
        ].concat(extraBreadcrumbItems);
        return (
            <Breadcrumb style={{ margin: "12px 0" }}>
                {breadcrumbItems}
            </Breadcrumb>
        );
    }
};
export default withRouter(SelfBreadcrumb);
