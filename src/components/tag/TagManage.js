import React, { useReducer, useState, useCallback, useEffect } from "react";
import { Button, message, Modal, Form, Input, Select } from "antd";
import BasicTable from "../common/BasicTable";
import Confirm from "../common/Confirm";
import { connect } from "react-redux";
import { fetchTags } from "../../action/system/tag";
import { deleteTag, postTag } from "@/api/content";
import Pagination from "../common/Pagination";
import date from "@/utils/date";
import { useDispatch, useMappedState } from "redux-react-hook";
const { Option } = Select;
function stateReducerFunc(state, action) {
    const { type, value } = action;
    if (state.hasOwnProperty) {
        state[type] = value;
        return { ...state };
    }
}
function TagManage(props) {
    //states
    const [pageState, stateReducer] = useReducer(stateReducerFunc, {
        pageSize: 10,
        page: 1,
        tableLoading: false
    });
    const [editTag, setEditTag] = useState({});
    const [delModelState, setDelModelState] = useReducer(stateReducerFunc, {
        delModelVisible: false,
        delId: ""
    });
    const [editVisible, setEditVisible] = useState(false);
    //store
    //states
    const mapState = useCallback(state => ({
        data: state.tag.data,
        total: state.tag.data.count
    }));
    const { data, total } = useMappedState(mapState);
    //store actions
    const dispatch = useDispatch();
    const fetchData = useCallback(params => {
        dispatch(
            fetchTags({
                ...params
            })
        );
        // eslint-disable-next-line
    }, []);
    //api actions
    const onEdit = (record = {}) => {
        setEditTag(record);
        setEditVisible(true);
    };
    function onPageChange(page) {
        stateReducer({ type: "page", value: page });
        fetchData({ page, pageSize: pageState.pageSize });
    }
    const onDelete = record => {
        setDelModelState({ type: "delId", value: record.id });
        setDelModelState({ type: "delModelVisible", value: true });
    };
    const onDeleteConfirm = () => {
        deleteTag({ id: delModelState.delId })
            .then(res => {
                message.success("删除成功！");
                setDelModelState({ type: "delModelVisible", value: false });
                stateReducer({ type: "page", value: 1 });
                fetchData({
                    pageSize: pageState.pageSize,
                    page: 1
                });
            })
            .catch(err => {
                message.error(err);
            });
    };
    function onShowSizeChange(page, pageSize) {
        stateReducer({ type: "pageSize", value: pageSize });
        fetchData({ page: 1, pageSize });
    }
    const editName = e => {
        let name = e.target.value;
        setEditTag({ ...editTag, name });
    };
    const editType = e => {
        let type = e;
        setEditTag({ ...editTag, type });
    };
    const confirmEdit = () => {
        let now = new Date();
        let time = date.toFormat(now, "yyyy-MM-dd hh:mm:ss");
        props.form.validateFields((err, values) => {
            if (!err) {
                postTag({ ...editTag, date: time })
                    .then(res => {
                        message.success("保存成功！");
                        setEditVisible(false);
                        stateReducer({ type: "page", value: 1 });
                        props.form.resetFields(); //重置form
                        fetchData({
                            pageSize: pageState.pageSize,
                            page: 1
                        });
                    })
                    .catch(err => {
                        message.error(err);
                    });
            }
        });
    };
    //render variables
    const { getFieldDecorator } = props.form;
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
    const dataSource =
        (data.data &&
            data.data.map((item, index) => {
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
            render: text => <span className="resetTd TdWidth200">{text}</span>
        },
        {
            title: "标签类型",
            dataIndex: "type",
            key: "type",
            width: 200,
            render: text => <span className="resetTd TdWidth200">{text}</span>
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
                        onClick={() => onEdit(record)}
                        type="primary"
                    >
                        编辑
                    </Button>
                    <Button
                        style={{ marginRight: "10px" }}
                        type="danger"
                        onClick={() => {
                            onDelete(record);
                        }}
                    >
                        删除
                    </Button>
                </div>
            )
        }
    ];
    //effect
    useEffect(() => {
        fetchData({
            pageSize: pageState.pageSize,
            page: pageState.page
        });
        // eslint-disable-next-line
    }, []);
    const id = editTag.id;
    const name = editTag.name;
    const type = editTag.type;
    return (
        <div>
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Button
                    style={{ float: "right", margin: "20px 20px" }}
                    onClick={() => {
                        onEdit();
                    }}
                >
                    新增标签
                </Button>
            </div>
            <BasicTable
                columns={columns}
                data={dataSource}
                tableWidth="1365"
                tableLoading={pageState.tableLoading}
            />
            <Confirm
                handleConfirm={onDeleteConfirm}
                handleCancel={() => {
                    setDelModelState({ type: "delModelVisible", value: false });
                }}
                visible={delModelState.delModelVisible}
                title="删除"
                content="确认删除这个标签嘛？"
            />
            <Pagination
                onShowSizeChange={onShowSizeChange}
                onPageChange={onPageChange}
                total={total}
                pageSize={pageState.pageSize}
                current={pageState.page}
            />
            <Modal
                visible={editVisible}
                onCancel={() => {
                    setEditVisible(false);
                }}
                title="标签"
                onOk={confirmEdit}
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
                            rules: [{ required: true, message: "请输入标签名" }]
                        })(<Input onChange={editName} autoComplete="off" />)}
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
                            <Select onChange={editType}>
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
const FormWrapTag = Form.create({ name: "tag-form" })(TagManage);
export default FormWrapTag;
