import { Form, Input, Button, Select, Row, Col } from "antd";
import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { articleClear } from "../../action/system/article";
import { useDispatch } from "redux-react-hook";
const { Option } = Select;
function SearchComponent(props) {
    //store
    const dispatch = useDispatch();
    const clearPropsArticle = useCallback(() => dispatch(articleClear()), [
        dispatch
    ]);
    function handleSearch(e) {
        e.preventDefault();
        const pageCon = props.pageCon;
        props.form.validateFields((err, values) => {
            props.fetch({ ...values, ...pageCon });
        });
    }
    function addArticle() {
        clearPropsArticle();
        props.history.push("/article/edit");
    }
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSearch}>
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
                            onClick={addArticle}
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
const SearchConditions = Form.create({ name: "search_conditions" })(
    SearchComponent
);
export default withRouter(SearchConditions);
