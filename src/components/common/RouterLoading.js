import React from "react";
import { Icon, Spin } from "antd";
import "./routerLoading.less";
function RouterLoading() {
    const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;
    return <Spin indicator={antIcon} className="loading-spin" />;
}
export default RouterLoading;
