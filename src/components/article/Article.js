import React, { useCallback, useState, useReducer, useEffect } from "react";
import { fetchListData } from "../../action/system/article";
import { Button, message } from "antd";
import BasicTable from "../common/BasicTable";
import Pagination from "../common/Pagination";
import SearchForm from "../searchForm/article";
import Confirm from "../common/Confirm";
import { deleteArticle } from "@/api/content";
import { withRouter } from "react-router-dom";
import { useDispatch, useMappedState } from "redux-react-hook";
function stateReducerFunc(state, action) {
    const { type, value } = action;
    if (state.hasOwnProperty) {
        state[type] = value;
        return { ...state };
    }
}
function Article(props) {
    //store
    //state
    const mapState = useCallback(state => ({
        data: state.article.data,
        total: state.article.data.count
    }));
    const { data, total } = useMappedState(mapState);
    //action
    const dispatch = useDispatch();
    const fetchData = useCallback(params => {
        dispatch(
            fetchListData({
                ...params,
                all: "all"
            })
        );
        // eslint-disable-next-line
    }, []);
    //states
    const [pageState, stateReducer] = useReducer(stateReducerFunc, {
        total: 0,
        pageSize: 10,
        page: 1,
        tableLoading: false
    });
    const [delModelVisible, setDelModelVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});

    //actions
    function onEdit(record) {
        const articleId = record.id;
        props.history.push("/article/edit?id=" + articleId);
    }
    function onDelete(record) {
        setDelModelVisible(true);
        setCurrentRecord(record);
    }
    function onShowSizeChange(page, pageSize) {
        stateReducer({ type: "pageSize", value: pageSize });
        fetch({ page: 1, pageSize });
    }
    function onPageChange(page) {
        stateReducer({ type: "page", value: page });
        fetch({ page, pageSize: pageState.pageSize });
    }
    function fetch(params) {
        stateReducer({ type: "tableLoading", value: true });
        fetchData({
            ...params,
            fn: () => {
                stateReducer({ type: "tableLoading", value: false });
            }
        });
    }
    function handleConfirm() {
        deleteArticle({ id: currentRecord.id })
            .then(res => {
                message.success("删除成功！");
                stateReducer({ type: "delModelVisible", value: false });
                fetch({ pageSize: pageState.pageSize, page: 1 });
            })
            .catch(err => {
                message.error("删除失败！");
                console.error("error", err);
            });
    }
    //variables
    const columns = [
        {
            title: "文章名称",
            dataIndex: "title",
            key: "title",
            width: 400,
            render: text => <span className="resetTd TdWidth200">{text}</span>
        },
        {
            title: "分类",
            dataIndex: "category",
            key: "category",
            width: 200,
            render: text => (
                <span className="resetTd TdWidth200">{text.name}</span>
            )
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            width: 200,
            render: text => (
                <span className="resetTd TdWidth200">
                    {text === 1 ? "草稿" : "发布"}
                </span>
            )
        },
        {
            title: "发布时间",
            dataIndex: "publish_time",
            key: "publish_time",
            width: 200,
            render: text => <span className="resetTd TdWidth200">{text}</span>
        },
        {
            title: "阅读量",
            dataIndex: "view",
            key: "view",
            width: 100,
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
    const dataSource =
        (data.data &&
            data.data.map((item, index) => {
                return { ...item, key: index };
            })) ||
        [];
    useEffect(() => {
        fetch({ pageSize: pageState.pageSize, page: pageState.page });
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <SearchForm
                pageCon={{
                    pageSize: pageState.pageSize,
                    page: pageState.page
                }}
                fetch={params => fetch(params)}
            />
            <BasicTable
                columns={columns}
                data={dataSource}
                tableWidth="1365"
                tableLoading={pageState.tableLoading}
            />
            <Confirm
                handleConfirm={handleConfirm}
                handleCancel={() => {
                    stateReducer({ type: "delModelVisible", value: false });
                }}
                visible={delModelVisible}
                title="删除"
                content="确认删除这条博客嘛？"
            />
            <Pagination
                onShowSizeChange={onShowSizeChange}
                onPageChange={onPageChange}
                total={total}
                pageSize={pageState.pageSize}
                current={pageState.page}
            />
        </div>
    );
}
export default withRouter(Article);
