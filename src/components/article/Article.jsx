import React from "react";
import { fetchListData } from "../../action/system/article";
import { connect } from "react-redux";
import BasicTable from "../common/BasicTable";
import Pagination from "../common/Pagination";
import SearchForm from "../searchForm/article";
class Article extends React.Component {
    componentWillMount() {
        this.fetch({
            pageSize: this.state.pageSize,
            page: this.state.page
        });
    }
    state = {
        total: 0,
        pageSize: 10,
        page: 1,
        tableLoading: false
    };
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
    render() {
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
                        {text == 1 ? "草稿" : "发布"}
                    </span>
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
            }
        ];
        const dataSource =
            (this.props.data.data &&
                this.props.data.data.map((item, index) => {
                    return { ...item, key: index };
                })) ||
            [];
        console.log("this.props:", this.props);
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
    }
});
const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default enhance(Article);
