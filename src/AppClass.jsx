import React, { lazy, Suspense } from "react";
import "./App.css";
import { LocaleProvider } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import zhCN from "antd/lib/locale-provider/zh_CN";
import "antd/dist/antd.css";
import RouterGurad from "@/components/common/RouterGurad";
import SelftLayout from "@/components/layout/Layout";
const Login = lazy(() => import("@/components/login/index"));
const notFound = lazy(() => import("@/components/common/404"));
window.paceOptions = {
    ajax: false, // disabled
    document: false, // disabled
    eventLag: false, // disabled
    elements: {
        selectors: ["#root"]
    }
};
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <div>
                            <RouterGurad config={[]} />
                            <Switch>
                                <Route
                                    path="/login"
                                    component={() => <Login />}
                                    key="/login"
                                />
                                <Route
                                    path="/"
                                    component={() => <SelftLayout />}
                                    key="/"
                                />
                                <Route
                                    path="*"
                                    component={() => <notFound />}
                                    key="*"
                                />
                            </Switch>
                        </div>
                    </Suspense>
                </Router>
            </LocaleProvider>
        );
    }
}

export default App;
