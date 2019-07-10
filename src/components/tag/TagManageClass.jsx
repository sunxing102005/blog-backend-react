import React from "react";
import { Button, message, Modal, Form, Input, Select } from "antd";
import BasicTable from "../common/BasicTable";
import Confirm from "../common/Confirm";
import { connect } from "react-redux";
import { fetchTags } from "../../action/system/tag";
import { deleteTag, postTag } from "@/api/content";
import Pagination from "../common/Pagination";
import date from "@/utils/date";
const { Option } = Select;
class TagManage extends React.Component {
    state = {
        tableLoading: false,
        editVisible: false,
        editTag: {},
        delModelVisible: false,
        pageSize: 10,
        page: 1,
        delId: ""
    };

    componentWillMount() {
        this.props.fetchData({
            pageSize: this.state.pageSize,
            page: this.state.page
        });
    }
    onEdit = (record = {}) => {
        console.log("record", record);
        this.setState({ editTag: record }, () => {
            console.log("editTag", this.state.editTag);
            console.log("editVisible", this.state.editVisible);
            this.setState({ editVisible: true });
        });
        // this.setState({ editTag: record, editVisible: true });
    };
    onPageChange(page) {
        this.setState({ page });
        this.props.fetchData({ page, pageSize: this.state.pageSize });
    }
    onDelete = record => {
        this.setState({ delId: record.id });
        this.setState({ delModelVisible: true });
    };
    onDeleteConfirm = () => {
        console.log("this.state.delId", this.state.delId);
        deleteTag({ id: this.state.delId })
            .then(res => {
                message.success("删除成功！");
                this.setState({ delModelVisible: false, page: 1 });
                this.props.fetchData({
                    pageSize: this.state.pageSize,
                    page: 1
                });
            })
            .catch(err => {
                console.log("onDeleteConfirm", err);
                message.error(err);
            });
    };
    onShowSizeChange(page, pageSize) {
        this.setState({ pageSize });
        this.props.fetchData({ page: 1, pageSize });
    }
    editName = e => {
        let name = e.target.value;
        this.setState(preState => {
            return { editTag: { ...preState.editTag, name } };
        });
    };
    editType = e => {
        let type = e;
        this.setState(preState => {
            return { editTag: { ...preState.editTag, type } };
        });
    };
    confirmEdit = () => {
        let now = new Date();
        let time = date.toFormat(now, "yyyy-MM-dd hh:mm:ss");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                postTag({ ...this.state.editTag, date: time })
                    .then(res => {
                        message.success("保存成功！");
                        this.setState({ editVisible: false, page: 1 });
                        this.props.form.resetFields(); //重置form
                        this.props.fetchData({
                            pageSize: this.state.pageSize,
                            page: 1
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        message.error(err);
                    });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 }
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
        const id = this.state.editTag.id;
        const name = this.state.editTag.name;
        const type = this.state.editTag.type;
        console.log("name", name);
        return (
            <div>
                <div style={{ width: "100%", overflow: "hidden" }}>
                    <Button
                        style={{ float: "right", margin: "20px 20px" }}
                        onClick={() => {
                            this.onEdit();
                        }}
                    >
                        新增标签
                    </Button>
                </div>
                <BasicTable
                    columns={columns}
                    data={dataSource}
                    tableWidth="1365"
                    tableLoading={this.state.tableLoading}
                />
                <Confirm
                    handleConfirm={this.onDeleteConfirm}
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
                <Modal
                    visible={this.state.editVisible}
                    onCancel={() => {
                        this.setState({ editVisible: false });
                    }}
                    title="标签"
                    onOk={this.confirmEdit}
                >
                    <Form {...formItemLayout} key={id}>
                        {id ? (
                            <Form.Item label="ID">
                                {getFieldDecorator("id", {
                                    initialValue: id
                                })(<Input disabled />)}
                            </Form.Item>
                        ) : (
                            ""
                        )}

                        <Form.Item label="标签名">
                            {getFieldDecorator("name", {
                                initialValue: name,
                                rules: [
                                    { required: true, message: "请输入标签名" }
                                ]
                            })(
                                <Input
                                    onChange={this.editName}
                                    autoComplete="off"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="标签类型">
                            {getFieldDecorator("type", {
                                initialValue: type,
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入标签类型"
                                    }
                                ]
                            })(
                                <Select onChange={this.editType}>
                                    <Option value={"category"}>category</Option>
                                    <Option value={"tag"}>tag</Option>
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
