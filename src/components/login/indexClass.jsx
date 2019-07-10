import React from "react";
import { Form, Icon, Input, Button } from "antd";
import "./index.less";
import { login } from "@/action/system/login";
import { connect } from "react-redux";
class LoginForm extends React.Component {
    handleSubmit = e => {
        const _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            _this.props.login({
                ...values
                // errorFn: msg => {
                //     notification["Warning"]({
                //         message: msg
                //     });
                // }
            });
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                {/* <Layout>
                    <Content> */}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h3 className="title">个人博客后台系统</h3>
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入用户名"
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{
                                            color: "rgba(0,0,0,.25)"
                                        }}
                                    />
                                }
                                placeholder="用户名"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入密码"
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{
                                            color: "rgba(0,0,0,.25)"
                                        }}
                                    />
                                }
                                type="password"
                                placeholder="请输入密码"
                            />
                        )}
                    </Form.Item>
                    {/* <Form.Item> */}
                    {/* {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true
                        })(<Checkbox>Remeber me</Checkbox>)} */}
                    <div className="tips">
                        <span>账户: admin</span>
                    </div>
                    <Button type="primary" htmlType="submit" className="button">
                        登录
                    </Button>
                    {/* </Form.Item> */}
                </Form>
                {/* </Content>
                </Layout> */}
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);
const mapStateProps = state => ({});
const mapDispatchProps = dispatch => ({
    login: params => {
        console.log("this", this);
        dispatch(
            login({
                ...params
            })
        );
    }
});
const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default WrappedNormalLoginForm;
