import { Form, Input, Button, Select, Row, Col } from "antd";
import React from "react";
const { Option } = Select;
class SearchComponent extends React.Component {
    handleSearch(e) {
        const _this = this;
        e.preventDefault();
        const pageCon = this.props.pageCon;
        this.props.form.validateFields((err, values) => {
            _this.props.fetch({ ...values, ...pageCon });
        });
    }
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
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const SearchConditions = Form.create({ name: "search_conditions" })(
    SearchComponent
);

export default SearchConditions;
