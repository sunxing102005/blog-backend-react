import * as React from "react";
import "./App.css";
import { LocaleProvider } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import zhCN from "antd/lib/locale-provider/zh_CN";
import "antd/dist/antd.css";
import RouterGurad from "@/components/common/RouterGurad";
import AsyncComponent from "@/router/asyncComponent";
const Login = AsyncComponent(() => import("@/components/login/index"));
const SelftLayout = AsyncComponent(() => import("@/components/layout/Layout"));
const notFound = AsyncComponent(() => import("@/components/common/404"));
type StateType = {
    collapsed: boolean;
};
class App extends React.Component<{}, StateType> {
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
                        <RouterGurad config={[]} />
                        <Switch>
                            <Route
                                path="/login"
                                component={Login}
                                key="/login"
                            />
                            <Route path="/" component={SelftLayout} key="/" />
                            <Route path="*" component={notFound} key="*" />
                        </Switch>
                    </div>
                </Router>
            </LocaleProvider>
        );
    }
}

export default App;
