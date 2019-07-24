import { Form, Input, Button, Select, Row, Col } from "antd";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form";
import { articleClear } from "../../action/system/article";
import { connect } from "react-redux";
import { compose } from "redux";
import Types from "MyTypes";
import { bindActionCreators, Dispatch } from "redux";
const { Option } = Select;
const mapStateProps = () => ({});
const mapDispatchProps = (dispatch: Dispatch) => ({
    clearPropsArticle: () => {
        dispatch(articleClear());
    }
});
interface Props extends FormComponentProps, RouteComponentProps {
    fetch: Function;
    pageCon: object;
    clearPropsArticle: Function;
}
class SearchComponent extends React.Component<Props, {}> {
    handleSearch(e) {
        const _this = this;
        e.preventDefault();
        const pageCon = this.props.pageCon;
        this.props.form.validateFields((err, values) => {
            _this.props.fetch({ ...values, ...pageCon });
        });
    }
    addArticle = () => {
        this.props.clearPropsArticle();
        this.props.history.push("/article/edit");
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch.bind(this)}>
                <Row gutter={40}>
                    <Col span={8}>
                        <Form.Item>
                            {getFieldDecorator("key")(
                                <Input placeholder="请输入文章名" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            {getFieldDecorator("status")(
                                <Select placeholder="文章状态" allowClear>
                                    <Option value="1">草稿</Option>
                                    <Option value="99">发布</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button
                                type="primary"
                                onClick={this.addArticle}
                                style={{ float: "right" }}
                            >
                                新增文章
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const SearchConditions = Form.create<Props>({ name: "search_conditions" })(
    SearchComponent
);
// const enhance = compose(
//     withRouter,
//     connect(
//         mapStateProps,
//         mapDispatchProps
//     )
// );
const WrappedSearchConditions = withRouter(
    connect(
        mapStateProps,
        mapDispatchProps
    )(SearchConditions)
);
export default WrappedSearchConditions;
// export default withRouter<Props, React.ComponentType<Props>>(SearchComponent);
