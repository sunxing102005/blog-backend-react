import React, { useCallback, useState, useEffect, useRef } from "react";
import { Form, Input, Select, Radio, Checkbox, message, Button } from "antd";
import config from "@/config";
import { setTags } from "@/action/system/article";
import { articleChange, fetchListData } from "@/action/system/article";
import "./editArticle.less";
import dateUtil from "@/utils/date";
import MdEditor from "@/components/common/markdownEditor/editor";
import { addArticle } from "@/api/content";
import UploadImg from "@/components/common/UploadImg";
import { useDispatch, useMappedState } from "redux-react-hook";
import { withRouter } from "react-router-dom";
const qs = require("query-string");
const { Option } = Select;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
function EditForm(props) {
    //store
    //state
    const mapState = useCallback(state => ({
        title: state.article.singleArticle.title,
        sign: state.article.singleArticle.sign,
        thumb: state.article.singleArticle.thumb,
        date: state.article.singleArticle.date,
        status: state.article.singleArticle.status,
        tag: state.article.singleArticle.tag,
        articleCurrent: state.article,
        tags: state.article.tags,
        categoryId: state.article.singleArticle.category_id,
        createTime: state.article.singleArticle.create_time,
        recommend: state.article.singleArticle.recommend,
        markdown: state.article.singleArticle.markdown
    }));
    const {
        title,
        thumb,
        date,
        status,
        tag,
        articleCurrent,
        tags,
        categoryId,
        recommend,
        markdown
    } = useMappedState(mapState);
    //store actions
    const dispatch = useDispatch();
    const changeArticle = useCallback(data => {
        dispatch(articleChange(data));
        // eslint-disable-next-line
    }, []);
    const fetchTags = useCallback(params => {
        dispatch(setTags({ ...params }));
        // eslint-disable-next-line
    }, []);
    const fetchSingleArt = useCallback(data => {
        dispatch(fetchListData(data));
        // eslint-disable-next-line
    }, []);
    //states
    const [visibleUpload, setVisibleUpload] = useState(false);
    //context
    const markdownRef = useRef(null);
    const handleSubmit = e => {
        e.preventDefault();
        let article = Object.assign({}, articleCurrent.singleArticle);
        let content = markdownRef.current.getMarkedHtml();
        article.content = content;
        let now = new Date();
        let time = dateUtil.toFormat(now, "yyyy-MM-dd hh:mm:ss");
        article.date = time;
        // 文章类型
        article.type = "post";
        console.log("article", article);
        if (article.id) {
            addArticle(article, article.id).then(res => {
                if (res.id) {
                    message.success("修改成功!").then(() => {
                        props.history.push("/article/table");
                    });
                }
            });
        } else {
            addArticle(article).then(res => {
                if (res.id) {
                    message.success("新增成功!").then(() => {
                        props.history.push("/article/table");
                    });
                }
            });
        }
    };
    function onChangeInput(type, e) {
        let data = {};
        data[type] = e.target.value;
        changeArticle(data);
    }
    function onChangeValue(type, value) {
        let ret = {};
        ret[type] = value;
        changeArticle(ret);
    }
    const confirmUpload = imgArr => {
        setVisibleUpload(false);
        if (imgArr.length > 0) {
            changeArticle({ thumb: imgArr[0].url });
        } else {
            changeArticle({ thumb: "" });
        }
    };
    const toContent = () => {
        props.history.push("/article/table");
    };
    //effect
    useEffect(() => {
        fetchTags({ type: "tag" });
        const articleId = qs.parse(props.location.search).id;
        if (articleId) {
            fetchSingleArt({
                id: articleId
            });
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        const listener = ev => {
            ev.preventDefault();
            ev.returnValue = "文章要保存吼，确定离开吗？";
        };
        window.addEventListener("beforeunload", listener);
        return () => {
            window.removeEventListener("beforeunload", listener);
        };
    }, []);
    //render variables
    let uploadBtnText = "上传图片";
    if (thumb && thumb != config.serverHost) {
        uploadBtnText = "修改上传图片";
    }
    const { getFieldDecorator } = props.form;

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
    const checkedTagIds = tag;
    const tagOptions = tags.map(item => ({
        label: item.name,
        value: item.id
    }));
    return (
        <div>
            <Form
                {...formItemLayout}
                className="editForm"
                onSubmit={handleSubmit}
            >
                <Form.Item label="文章标题">
                    {getFieldDecorator("title", {
                        initialValue: title,
                        rules: [{ required: true, message: "请输入标题" }]
                    })(
                        <Input
                            placeholder="请输入文章标题"
                            autoComplete="off"
                            onChange={e => {
                                onChangeInput("title", e);
                            }}
                        />
                    )}
                </Form.Item>
                <Form.Item label="是否设为特别推荐">
                    {getFieldDecorator("recommend", {
                        initialValue: recommend
                    })(
                        <Select
                            onChange={value =>
                                onChangeValue("recommend", value)
                            }
                        >
                            <Option value={"Y"}>是</Option>
                            <Option value={"N"}>否</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="缩略图">
                    {getFieldDecorator("thumb", {
                        initialValue: thumb
                    })(
                        <Button
                            onClick={() => {
                                setVisibleUpload(true);
                            }}
                        >
                            {uploadBtnText}
                        </Button>
                    )}
                </Form.Item>
                <Form.Item label="文章分类">
                    {getFieldDecorator("category_id", {
                        initialValue: categoryId
                    })(
                        <Select
                            onChange={value =>
                                onChangeValue("category_id", value)
                            }
                        >
                            <Option value={1}>tech</Option>
                            <Option value={2}>life</Option>
                            <Option value={33}>self</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="状态">
                    {getFieldDecorator("status", {
                        initialValue: status,
                        rules: [{ required: true, message: "请选择文章状态" }]
                    })(
                        <RadioGroup
                            onChange={e => {
                                onChangeInput("status", e);
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
                            onChange={value => onChangeValue("tag", value)}
                        />
                    )}
                </Form.Item>
                <Form.Item label="文章内容">
                    {getFieldDecorator("markdown", {
                        initialValue: markdown
                    })(
                        <MdEditor
                            onChange={value => onChangeValue("markdown", value)}
                            ref={markdownRef}
                        />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                    <Button
                        type="primary"
                        style={{ marginLeft: "20px" }}
                        onClick={toContent}
                    >
                        取消
                    </Button>
                </Form.Item>
            </Form>
            <UploadImg
                visible={visibleUpload}
                onConcel={() => {
                    setVisibleUpload(false);
                }}
                onOk={confirmUpload}
                key={thumb}
                maxImgCount={1}
                defaultFileList={
                    thumb && thumb != config.serverHost
                        ? [{ uid: "-1", url: thumb }]
                        : []
                }
            />
        </div>
    );
}
const EditFormWrap = Form.create({ name: "edit-form" })(EditForm);
export default withRouter(EditFormWrap);
