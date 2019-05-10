import React from "react";
import { Modal } from "antd";
export default class Confirm extends React.Component {
    // state = {
    //     visible: false
    // };
    // handleConcel = e => {
    //     console.log(">>>>");
    // };
    // handleConfirm = e => {};
    render() {
        const title = this.props.title;
        const content = this.props.content;
        const visible = this.props.visible;
        return (
            <div>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.props.handleConfirm}
                    onCancel={this.props.handleCancel}
                >
                    {content}
                </Modal>
            </div>
        );
    }
}
