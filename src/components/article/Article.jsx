import React from "react";
import { fetchListData, setTags } from "../../action/system/article";
import { connect } from "react-redux";
import { Button, message } from "antd";
import BasicTable from "../common/BasicTable";
import Pagination from "../common/Pagination";
import SearchForm from "../searchForm/article";
import Confirm from "../common/Confirm";
import { deleteArticle } from "@/api/content";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import date from "@/utils/date";
class Article extends React.Component {
    state = {
        total: 0,
        pageSize: 10,
        page: 1,
        tableLoading: false,
        delModelVisible: false,
        currentRecord: {}
    };
    componentWillMount() {
        this.fetch({
            pageSize: this.state.pageSize,
            page: this.state.page
        });
        // this.props.fetchTags({ type: "tag" });
    }
    onEdit(record) {
        const articleId = record.id;
        this.props.history.push("/article/edit?id=" + articleId);
        // this.props.fetchSingleArt({
        //     id: articleId,
        //     fn: () => {
        //         this.props.history.push("/article/edit?id=" + articleId);
        //     }
        // });
        // console.log("tt", tt);
    }
    onDelete(record) {
        this.setState({ delModelVisible: true, currentRecord: record });
    }
    onShowSizeChange(page, pageSize) {
        this.setState({ pageSize });
        this.fetch({ page: 1, pageSize });
    }
    onPageChange(page) {
        this.setState({ page });
        this.fetch({ page, pageSize: this.state.pageSize });
    }
    fetch(params) {
        this.setState({ tableLoading: true });
        this.props.fetchData({
            ...params,
            errorFn: () => {
                this.setState({ tableLoading: false });
            },
            fn: () => {
                this.setState({ tableLoading: false });
            }
        });
    }

    handleConfirm = () => {
        deleteArticle({ id: this.state.currentRecord.id })
            .then(res => {
                message.success("删除成功！");
                this.setState({ delModelVisible: false });
                this.fetch({ pageSize: this.state.pageSize, page: 1 });
            })
            .catch(err => {
                message.error("删除失败！");
                console.error("error", err);
            });
    };
    render() {
        // const dateVal = date(record * 1000, "YYYY-MM")
        const columns = [
            {
                title: "文章名称",
                dataIndex: "title",
                key: "title",
                width: 200,
                render: text => (
                    <span className="resetTd TdWidth200">{text}</span>
                )
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
                render: text => (
                    <span className="resetTd TdWidth200">{text}</span>
                )
            },
            {
                title: "阅读量",
                dataIndex: "view",
                key: "view",
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
        const dataSource =
            (this.props.data.data &&
                this.props.data.data.map((item, index) => {
                    return { ...item, key: index };
                })) ||
            [];
        // console.log("this.props:", this.props);
        // console.log("dataSource", dataSource);
        return (
            <div>
                <SearchForm
                    pageCon={{
                        pageSize: this.state.pageSize,
                        page: this.state.page
                    }}
                    fetch={params => this.fetch(params)}
                />
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
                    content="确认删除这条博客嘛？"
                />
                <Pagination
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
                    onPageChange={this.onPageChange.bind(this)}
                    total={this.props.total}
                    pageSize={this.state.pageSize}
                    current={this.state.page}
                />
            </div>
        );
    }
}
const mapStateProps = state => ({
    data: state.article.data,
    total: state.article.data.count
});
const mapDispatchProps = dispatch => ({
    fetchData: params => {
        console.log("this", this);
        dispatch(
            fetchListData({
                ...params,
                all: "all"
            })
        );
    },
    fetchSingleArt: params => {
        dispatch(fetchListData({ ...params }));
    },
    fetchTags: params => {
        dispatch(setTags({ ...params }));
    }
});
//多个高阶组件，用compose连接
const enhance = compose(
    withRouter,
    connect(
        mapStateProps,
        mapDispatchProps
    )
);
export default enhance(Article);
