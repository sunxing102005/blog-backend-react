import React from "react";
import { Table } from "antd";

const BasicTable = props => {
    const intWidth = parseInt(props.tableWidth);
    return (
        <Table
            {...props}
            scroll={{ x: intWidth }}
            bordered
            pagination={false}
            columns={props.columns}
            rowKey={props.rowKey}
            dataSource={props.data}
            onChange={props.sortChange}
            loading={props.tableLoading}
        />
    );
};

export default BasicTable;
