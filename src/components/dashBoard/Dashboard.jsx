import React from "react";
import PanelGroup from "./PanelGroup";
import PublishChart from "./PublishChart";
import ViewChart from "./ViewChart";
import { Row } from "antd";
import "./dashboard.less";
export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-editor-container">
                <PanelGroup />
                <Row
                    style={{
                        background: "#fff",
                        padding: "16px 16px 0",
                        marginBottom: "32px",
                        margin: "40px 0 32px 0"
                    }}
                >
                    <ViewChart />
                </Row>
                <Row
                    style={{
                        background: "#fff",
                        padding: "16px 16px 0",
                        marginBottom: "32px",
                        margin: "40px 0 32px 0"
                    }}
                >
                    <PublishChart />
                </Row>
            </div>
        );
    }
}
