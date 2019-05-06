import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout, Menu, Dropdown, Icon, LocaleProvider, Avatar } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Breadcrumb from "./components/breadcrumb/index";
import zhCN from "antd/lib/locale-provider/zh_CN";
// import Routes from "./router/index";
import "antd/dist/antd.css";
import News from "./components/news/News";
import Article from "./components/article/Article";
import routes from "./router/index";
import RouterGurad from "@/components/common/RouterGurad";
import AsyncComponent from "@/router/asyncComponent";
// import Login from "@/components/login/index";
// import SelftLayout from "@/components/layout/Layout";
import { routerConfig } from "@/router/routerConfig";
const { Header, Content } = Layout;
const Login = AsyncComponent(() => import("@/components/login/index"));
const SelftLayout = AsyncComponent(() => import("@/components/layout/Layout"));
const notFound = AsyncComponent(() => import("@/components/common/404"));
class App extends React.Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    };
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <Router>
                    <div>
                        <Switch>
                            <Route
                                path="/login"
                                component={Login}
                                key="/login"
                            />
                            <Route path="/" component={SelftLayout} key="/" />
                            <Route path="*" component={notFound} key="*" />
                        </Switch>
                        <RouterGurad config={[]} />
                    </div>
                </Router>
            </LocaleProvider>
        );
    }
}

export default App;
