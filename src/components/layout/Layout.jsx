import React from "react";
import "./Layout.css";
import { Layout, Menu, Dropdown, Icon } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Breadcrumb from "@/components/breadcrumb/index";
import "antd/dist/antd.css";
import routes from "@/router/index";
import { fedLogout } from "@/action/system/login";
import { connect } from "react-redux";
import history from "@/utils/history";
const { Header, Content, Footer } = Layout;
class MainLayout extends React.Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    };
    onLogOut = () => {
        this.props.logout();
    };
    render() {
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
                    <div onClick={this.onLogOut}>退出</div>
                </Menu.Item>
            </Menu>
        );
        return (
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
                            <Switch>
                                {routes.map((route, index) => {
                                    return (
                                        <Route
                                            path={route.path}
                                            component={route.main}
                                            key={route.path}
                                            exact
                                        />
                                    );
                                })}
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Design By SUNX  个人博客管理  <a href="http://www.beian.miit.gov.cn">辽ICP备19009050号-1</a></Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}
const mapStateProps = state => ({
    data: state.article.data,
    total: state.article.data.count
});
const mapDispatchProps = dispatch => ({
    logout: () => {
        dispatch(fedLogout());
    }
});
const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default enhance(MainLayout);
