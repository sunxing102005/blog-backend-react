import { Breadcrumb } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { routerConfig } from "../../router/routerConfig";
const SelfBreadcrumb = class SelfBreadcrumb extends React.Component {
    getRouterConfig(ret = [], currentPath, routerConfig) {
        if (routerConfig) {
            routerConfig.forEach((item, index) => {
                if (currentPath.indexOf(item.path) != -1 && item.path !== "/") {
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
            let link = null;
            if (index === 0) {
                link = <a>{item.name}</a>;
            } else {
                link = <Link to={item.path}>{item.name}</Link>;
            }
            return <Breadcrumb.Item key={item.path}>{link}</Breadcrumb.Item>;
        });
        console.log("extraBreadcrumbItems", extraBreadcrumbItems);

        let breadcrumbItems = [
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
