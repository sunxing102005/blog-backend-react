import React from "react";
import { Pagination } from "antd";
import "./Pagination.css";

const BasicPagination = props => {
    return (
        <Pagination
            className="pagination"
            onChange={props.onPageChange}
            onShowSizeChange={props.onShowSizeChange}
            total={props.total}
            showSizeChanger
            pageSize={props.pageSize}
            showTotal={(total, range) => `共 ${total} 条  `}
            current={parseInt(props.current || 0)}
        />
    );
};

export default BasicPagination;
