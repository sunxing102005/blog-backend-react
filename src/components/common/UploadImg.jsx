import React from "react";
import service from "@/axios/service";
import { Modal, Upload, Icon, message } from "antd";
import { deleteFile } from "@/api/content";
import config from "@/config/index";
import Confirm from "./Confirm";
class UploadImg extends React.Component {
    state = {
        visibleUpload: false,
        imageUrl: "",
        fileList: this.props.defaultFileList,
        previewImage: "",
        previewVisible: false,
        uploadImg: {},
        delModalVisible: false,
        deleteTitle: "",
        deletefile: {}
    };
    componentDidMount() {
        console.log("this.props.defaultFileList", this.props.defaultFileList);
    }
    handleChange = info => {
        console.log("info", info);
        this.setState({
            fileList: [...info.fileList]
        });
        if (info.file.status === "uploading") {
            return;
        }
        if (info.file.status === "done") {
            this.setState({
                uploadImg: { ...info.file.response.data, uid: info.file.uid }
            });
        }
    };
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };
    onConfirmUpload = () => {
        const { onOk } = this.props;
        let retFileList = this.state.fileList.map(item => {
            return {
                ...item.response.data,
                url: config.serverHost + item.response.data.url
            };
        });
        // const url = config.serverHost + this.state.uploadImg.url;
        // const name = this.state.uploadImg.basename;
        //返回一个图片信息数组
        onOk(retFileList);
    };
    upload(informa) {
        console.log("informa", informa);
    }
    onRemove = params => {
        console.log("params", params);
        // const filepath = params.response.data["url"];
        const title = `确定要删除图片 ${
            params.response ? params.response.data["orgname"] : ""
        }吗`;
        let deletefile = null;
        if (params.response) {
            deletefile = { ...params.response.data, uid: params.uid };
        } else {
            let urlIndex = params.url.indexOf("/uploads");
            let url = params.url.substring(urlIndex);
            deletefile = { ...params, url };
            console.log("deletefile", deletefile);
        }
        this.setState({
            deletefile,
            deleteTitle: title,
            delModalVisible: true
        });
        return false;
    };
    onRemoveConfirm = () => {
        const filepath = this.state.deletefile.url;
        deleteFile(filepath)
            .then(() => {
                this.setState(preState => {
                    let delIndex = 0;
                    preState.fileList.forEach((item, index) => {
                        console.log(
                            "preState.deletefile.uid",
                            preState.deletefile.uid
                        );
                        if (item.uid === preState.deletefile.uid) {
                            delIndex = index;
                        }
                    });
                    let newFileList = [...preState.fileList];
                    newFileList.splice(delIndex, 1);
                    return {
                        fileList: [...newFileList],
                        delModalVisible: false
                    };
                });
                // this.setState({ fileList: [], delModalVisible: false });
                message.success("删除成功！");
            })
            .catch(err => {
                console.log("UUU");
                message.error(err);
            });
    };
    render() {
        const uploadButton = (
            <div>
                <Icon type={"plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { visible, onConcel, maxImgCount } = this.props;

        return (
            <Modal
                title="文件上传"
                visible={visible}
                onCancel={onConcel}
                onOk={this.onConfirmUpload}
            >
                <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={this.state.fileList}
                    action={`${config.serverHost}/api/image`}
                    // customRequest={this.upload}
                    onChange={this.handleChange}
                    onPreview={this.handlePreview}
                    onRemove={this.onRemove}
                >
                    {this.state.fileList.length >= maxImgCount
                        ? null
                        : uploadButton}
                </Upload>
                <Modal
                    visible={this.state.previewVisible}
                    footer={null}
                    onCancel={() => this.setState({ previewVisible: false })}
                >
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={this.state.previewImage}
                    />
                </Modal>
                <Confirm
                    handleConfirm={this.onRemoveConfirm}
                    handleCancel={() => {
                        this.setState({ delModalVisible: false });
                    }}
                    visible={this.state.delModalVisible}
                    title="删除"
                    content={this.state.deleteTitle}
                />
            </Modal>
        );
    }
}
UploadImg.defaultProps = {
    visible: false,
    maxImgCount: 1,
    onConcel: () => {},
    onOk: () => {},
    defaultFileList: []
};
export default UploadImg;
