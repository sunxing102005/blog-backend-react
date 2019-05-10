import React from "react";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
    Radio,
    Checkbox,
    message,
    Button
} from "antd";
import { connect } from "react-redux";
import { setTags } from "@/action/system/article";
import Editor from "for-editor";
import { articleChange, articleClear } from "@/action/system/article";
import remark from "remark";
import reactRenderer from "remark-react";
import "./editArticle.less";
import MdEditor from "@/components/common/markdownEditor/editor";
import { addArticle } from "@/api/content";
import moment from "moment";
const { Option } = Select;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.markdownRef = React.createRef();
    }
    state = {};
    componentWillMount() {
        this.props.fetchTags({ type: "tag" });
    }
    componentDidMount() {
        // let mark = this.markdownRef;
        // console.log("mark", mark);
    }
    handleSubmit = e => {
        e.preventDefault();

        let article = Object.assign({}, this.props.article.singleArticle);
        let content = this.markdownRef.current.getMarkedHtml();
        article.content = content;
        article.date = article.date._d;
        console.log("article", article);
        let seperator1 = "-";
        let seperator2 = ":";
        let month = article.date.getMonth() + 1;
        let strDate = article.date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        article.create_time =
            article.date.getFullYear() +
            seperator1 +
            month +
            seperator1 +
            strDate +
            " " +
            article.date.getHours() +
            seperator2 +
            article.date.getMinutes() +
            seperator2 +
            article.date.getSeconds();
        // 文章类型
        article.type = "post";
        console.log("article", article);
        if (article.id) {
            addArticle(article, article.id).then(res => {
                if (res.errno == 0 && res.data.id) {
                    message.success("修改成功!").then(() => {
                        this.props.history.push("/article/table");
                    });
                }
            });
        } else {
            addArticle(article).then(res => {
                // debugger;
                console.log("res", res);
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
    onChangeDate = e => {
        this.props.changeArticle({ date: e });
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
    render() {
        console.log("this.props", this.props);
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
        const checkedTagIds = this.props.tag.map(item => item.id);
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
                    <Form.Item label="文章标示">
                        {getFieldDecorator("sign", {
                            initialValue: this.props.sign
                        })(
                            <Input
                                placeholder="请输入文章标示"
                                autoComplete="off"
                                onChange={e => {
                                    this.onChangeInput("sign", e);
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="缩略图">
                        {getFieldDecorator("thumb", {
                            initialValue: this.props.thumb
                        })(
                            <Input
                                placeholder="请输入"
                                autoComplete="off"
                                onChange={e => {
                                    this.onChangeInput("thumb", e);
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="发布时间">
                        {getFieldDecorator("date", {
                            initialValue: this.props.createTime
                                ? moment(
                                      new Date(this.props.createTime * 1000),
                                      "YYYY-MM"
                                  )
                                : null
                        })(
                            <DatePicker
                                onChange={e => {
                                    this.onChangeDate(e);
                                }}
                            />
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
    }
});
const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default enhance(EditFormWrap);
