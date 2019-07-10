import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { LocaleProvider } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import zhCN from "antd/lib/locale-provider/zh_CN";
import "antd/dist/antd.css";
import RouterGurad from "@/components/common/RouterGurad";
import SelftLayout from "@/components/layout/Layout";
const Login = lazy(() => import("@/components/login/index"));
const notFound = lazy(() => import("@/components/common/404"));
function App(props) {
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
export default App;
