import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "@/utils/auth";
import { withRouter } from "react-router-dom";
import history from "@/utils/history";
class RouterGurad extends React.Component {
    render() {
        const { location, config } = this.props;
        const { pathname } = location;
        const token = getToken();
        const targetRouterConfig = config.find(v => v.path === pathname);
        // console.log("token", token);
        if (token) {
            if (pathname === "/login") {
                return <Redirect to="/" />;
            } else {
                // if (targetRouterConfig) {
                //     return (
                //         <Route
                //             path={pathname}
                //             component={targetRouterConfig.main}
                //         />
                //     );
                // } else {
                //     return <Redirect to="/" />;
                // }
                return <div />;
            }
        } else {
            if (pathname !== "/login") {
                // return <Redirect to="/login" />;
                history.push("/login");
                return <div />;
            } else {
                return <div />;
            }
        }
    }
}
export default withRouter(RouterGurad);
