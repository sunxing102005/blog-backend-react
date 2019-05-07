import React from "react";
import { Row, Col } from "antd";
import { getContent } from "@/api/content";
import "./panelGroup.less";
export default class PanelGroup extends React.Component {
    state = {
        data: {}
    };
    componentWillMount() {
        getContent({ type: "summary" }).then(res => {
            console.log("res", res);
            const data = res;
            this.setState({ data });
        });
    }
    render() {
        return (
            <div className="panel-group">
                <Row gutter={16}>
                    <Col xs={12} sm={12} lg={8}>
                        <div className="item-wrapper">
                            <div className="icon-left icon-people">
                                <i
                                    className="fa fa-users card-panel-icon"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="item-right">
                                <div className="item-title">访问量</div>
                                <div className="card-num">
                                    {this.state.data.view}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} lg={8}>
                        <div className="item-wrapper">
                            <div className="icon-left icon-message">
                                <i
                                    className="fa fa-book card-panel-icon"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="item-right">
                                <div className="item-title">文章数</div>
                                <div className="card-num">
                                    {this.state.data.count}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} lg={8}>
                        <div className="item-wrapper">
                            <div className="icon-left icon-money">
                                <i
                                    className="fa fa-comments card-panel-icon"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="item-right">
                                <div className="item-title">评论数</div>
                                <div className="card-num">
                                    {this.state.data.comments}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
