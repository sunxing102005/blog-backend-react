import React from "react";
import {
    Form,
    Input,
    Select,
    DatePicker,
    Radio,
    Checkbox,
    message,
    Button,
    Icon
} from "antd";
import { connect } from "react-redux";
import date from "@/utils/date";
import { setTags } from "@/action/system/article";
import {
    articleChange,
    articleClear,
    fetchListData
} from "@/action/system/article";
import "./editArticle.less";
import MdEditor from "@/components/common/markdownEditor/editor";
import { addArticle } from "@/api/content";
import UploadImg from "@/components/common/UploadImg";
const qs = require("query-string");
const { Option } = Select;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.markdownRef = React.createRef();
    }
    state = {
        visibleUpload: false,
        defaultFileList: []
    };
    componentWillMount() {
        this.props.fetchTags({ type: "tag" });
        const articleId = qs.parse(this.props.location.search).id;
        if (articleId) {
            this.props.fetchSingleArt({
                id: articleId
            });
            // .then(() => {
            //     if (this.props.thumb) {
            //         this.setState({
            //             defaultFileList: [
            //                 { uid: "-1", url: this.props.thumb }
            //             ]
            //         });
            //     }
            // });
        }
    }
    componentDidMount() {
        // let mark = this.markdownRef;
        console.log("props", this.props);
    }
    handleSubmit = e => {
        e.preventDefault();

        let article = Object.assign({}, this.props.article.singleArticle);
        console.log("article", article);
        let content = this.markdownRef.current.getMarkedHtml();
        article.content = content;
        let now = new Date();
        let time = date.toFormat(now, "yyyy-MM-dd hh:mm:ss");
        article.date = time;
        // 文章类型
        article.type = "post";

        if (article.id) {
            addArticle(article, article.id).then(res => {
                if (res.id) {
                    message.success("修改成功!").then(() => {
                        this.props.history.push("/article/table");
                    });
                }
            });
        } else {
            addArticle(article).then(res => {
                console.log("res", res);
                console.log("::::！");
                if (res.id) {
                    message.success("新增成功!").then(() => {
                        this.props.history.push("/article/table");
                    });
                }
            });
        }
    };
    onChangeStatus = e => {
        e.preventDefault();
    };
    onChangeInput = (type, e) => {
        let data = {};
        data[type] = e.target.value;

        this.props.changeArticle(data);
    };
    onChangeRec = e => {
        this.props.changeArticle({ recommend: e });
    };
    onChangeTags = e => {
        let tags = e;
        console.log("tags", tags);
        this.props.changeArticle({ tag: tags });
    };
    onChangeCate = value => {
        this.props.changeArticle({ category_id: value });
    };
    onChangeMarkdown = value => {
        // const html = remark()
        //     .use(reactRenderer)
        //     .processSync(value).contents;
        // // console.log("mark2html", html);
        this.props.changeArticle({ markdown: value });
    };
    confirmUpload = imgArr => {
        this.setState({ visibleUpload: false });
        if (imgArr.length > 0) {
            this.props.changeArticle({ thumb: imgArr[0].url });
        } else {
            this.props.changeArticle({ thumb: "" });
        }
    };
    render() {
        console.log("this.props", this.props);
        // if (this.props.thumb) {
        //     this.setState({
        //         defaultFileList: [{ uid: "-1", url: this.props.thumb }]
        //     });
        //     console.log("defaultFileList", this.state.defaultFileList);
        // }
        let uploadBtnText = "上传图片";
        if (this.props.thumb) {
            uploadBtnText = "修改上传图片";
        }
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 4 } },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 20,
                    offset: 4
                }
            }
        };
        const checkedTagIds = this.props.tag;
        const tagOptions = this.props.tags.map(item => ({
            label: item.name,
            value: item.id
        }));
        return (
            <div>
                <Form
                    {...formItemLayout}
                    className="editForm"
                    onSubmit={this.handleSubmit}
                >
                    <Form.Item label="文章标题">
                        {getFieldDecorator("title", {
                            initialValue: this.props.title,
                            rules: [{ required: true, message: "请输入标题" }]
                        })(
                            <Input
                                placeholder="请输入文章标题"
                                autoComplete="off"
                                onChange={e => {
                                    this.onChangeInput("title", e);
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="是否设为特别推荐">
                        {getFieldDecorator("recommend", {
                            initialValue: this.props.recommend
                        })(
                            <Select onChange={this.onChangeRec}>
                                <Option value={"Y"}>是</Option>
                                <Option value={"N"}>否</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="缩略图">
                        {getFieldDecorator("thumb", {
                            initialValue: this.props.thumb
                        })(
                            <Button
                                onClick={() => {
                                    this.setState({ visibleUpload: true });
                                }}
                            >
                                {uploadBtnText}
                            </Button>
                        )}
                    </Form.Item>
                    <Form.Item label="文章分类">
                        {getFieldDecorator("category_id", {
                            initialValue: this.props.categoryId
                        })(
                            <Select onChange={this.onChangeCate}>
                                <Option value={1}>tech</Option>
                                <Option value={2}>life</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="状态">
                        {getFieldDecorator("status", {
                            initialValue: this.props.status,
                            rules: [
                                { required: true, message: "请选择文章状态" }
                            ]
                        })(
                            <RadioGroup
                                onChange={e => {
                                    this.onChangeInput("status", e);
                                }}
                            >
                                <Radio value={0}>草稿</Radio>
                                <Radio value={99}>发布</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item label="标签">
                        {getFieldDecorator("tag", {
                            initialValue: checkedTagIds
                        })(
                            <CheckboxGroup
                                options={tagOptions}
                                onChange={this.onChangeTags}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="文章内容">
                        {getFieldDecorator("markdown", {
                            initialValue: this.props.markdown
                        })(
                            <MdEditor
                                onChange={this.onChangeMarkdown}
                                ref={this.markdownRef}
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
                <UploadImg
                    visible={this.state.visibleUpload}
                    onConcel={() => {
                        this.setState({ visibleUpload: false });
                    }}
                    onOk={this.confirmUpload}
                    key={this.props.thumb}
                    maxImgCount={1}
                    defaultFileList={
                        this.props.thumb
                            ? [{ uid: "-1", url: this.props.thumb }]
                            : []
                    }
                />
            </div>
        );
    }
}
const EditFormWrap = Form.create({ name: "edit-form" })(EditForm);
const mapStateProps = state => ({
    title: state.article.singleArticle.title,
    sign: state.article.singleArticle.sign,
    thumb: state.article.singleArticle.thumb,
    date: state.article.singleArticle.date,
    status: state.article.singleArticle.status,
    tag: state.article.singleArticle.tag,
    article: state.article,
    tags: state.article.tags,
    categoryId: state.article.singleArticle.category_id,
    createTime: state.article.singleArticle.create_time,
    recommend: state.article.singleArticle.recommend,
    markdown: state.article.singleArticle.markdown
});
const mapDispatchProps = dispatch => ({
    changeArticle: data => {
        dispatch(articleChange(data));
    },
    articleClear: data => {
        dispatch(articleClear(data));
    },
    fetchTags: params => {
        dispatch(setTags({ ...params }));
    },
    fetchSingleArt: params => {
        dispatch(fetchListData({ ...params }));
    }
});
const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default enhance(EditFormWrap);
