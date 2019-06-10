import React from "react";
import { Button, message, Modal, Form, Input, Select, Row, Col } from "antd";
import BasicTable from "../common/BasicTable";
import Confirm from "../common/Confirm";
import { connect } from "react-redux";
import { fetchTags } from "../../action/system/tag";
import { deleteTag } from "@/api/content";
import Pagination from "../common/Pagination";
const { Option } = Select;
class TagManage extends React.Component {
    state = {
        tableLoading: false,
        editVisible: false,
        editTag: {},
        delModelVisible: false,
        pageSize: 10,
        page: 1
    };

    componentWillMount() {
        this.props.fetchData({
            pageSize: this.state.pageSize,
            page: this.state.page
        });
    }
    onEdit = record => {
        console.log("record", record);
        this.setState({ editTag: record, editVisible: true });
    };
    onPageChange(page) {
        this.setState({ page });
        this.fetch({ page, pageSize: this.state.pageSize });
    }
    onDelete = record => {
        deleteTag({ id: record.id })
            .then(res => {
                message.success("删除成功！");
                this.props.fetchData();
            })
            .catch(err => {
                message.error(err);
            });
    };
    onShowSizeChange(pageSize) {
        this.setState({ pageSize });
        this.fetch({ page: 1, pageSize });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        console.log("this.props", this.props);
        const dataSource =
            (this.props.data.data &&
                this.props.data.data.map((item, index) => {
                    return { ...item, key: index };
                })) ||
            [];
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
                width: 200,
                render: text => <span className="resetTd">{text}</span>
            },
            {
                title: "标签名称",
                dataIndex: "name",
                key: "name",
                width: 200,
                render: text => (
                    <span className="resetTd TdWidth200">{text}</span>
                )
            },
            {
                title: "标签类型",
                dataIndex: "type",
                key: "type",
                width: 200,
                render: text => (
                    <span className="resetTd TdWidth200">{text}</span>
                )
            },
            {
                title: "操作",
                dataIndex: "operate",
                key: "operate",
                width: 200,
                render: (text, record) => (
                    <div>
                        <Button
                            style={{ marginRight: "10px" }}
                            onClick={this.onEdit.bind(this, record)}
                            type="primary"
                        >
                            编辑
                        </Button>
                        <Button
                            style={{ marginRight: "10px" }}
                            type="danger"
                            onClick={() => {
                                this.onDelete(record);
                            }}
                        >
                            删除
                        </Button>
                    </div>
                )
            }
        ];
        return (
            <div>
                <Button style={{ float: "right" }}>新增标签</Button>
                <BasicTable
                    columns={columns}
                    data={dataSource}
                    tableWidth="1365"
                    tableLoading={this.state.tableLoading}
                />
                <Confirm
                    handleConfirm={this.handleConfirm}
                    handleCancel={() => {
                        this.setState({ delModelVisible: false });
                    }}
                    visible={this.state.delModelVisible}
                    title="删除"
                    content="确认删除这个标签嘛？"
                />
                <Pagination
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
                    onPageChange={this.onPageChange.bind(this)}
                    total={this.props.total}
                    pageSize={this.state.pageSize}
                    current={this.state.page}
                />
                <Modal visible={this.state.editVisible} title="编辑标签">
                    <Form {...formItemLayout}>
                        <Form.Item>
                            {getFieldDecorator("id", {
                                initialValue: this.state.editTag.id
                            })(<Input disabled />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("name", {
                                initialValue: this.state.editTag.name
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("type", {
                                initialValue: this.state.editTag.type
                            })(
                                <Select onChange={this.onChangeCate}>
                                    <Option value={"category"}>category</Option>
                                    <Option value={"tag"}>category</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
const FormWrapTag = Form.create({ name: "tag-form" })(TagManage);
const mapStateProps = state => ({
    data: state.tag.data,
    total: state.tag.data.count
});
const mapDispatchProps = dispatch => ({
    fetchData: params => {
        dispatch(
            fetchTags({
                ...params
            })
        );
    }
});
const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default enhance(FormWrapTag);
