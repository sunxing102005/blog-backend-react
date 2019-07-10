import React, { useCallback } from "react";
import { Form, Icon, Input, Button } from "antd";
import "./index.less";
import { login } from "@/action/system/login";
import { useDispatch } from "redux-react-hook";
function LoginForm(props) {
    //action
    const dispatch = useDispatch();
    const loginAction = useCallback(params => {
        dispatch(
            login({
                ...params
            })
        );
        // eslint-disable-next-line
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            loginAction({
                ...values
            });
        });
    }
    const { getFieldDecorator } = props.form;
    return (
        <div className="login-container">
            <Form onSubmit={handleSubmit} className="login-form">
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
                <div className="tips">
                    <span>账户: admin</span>
                </div>
                <Button type="primary" htmlType="submit" className="button">
                    登录
                </Button>
            </Form>
        </div>
    );
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);
export default WrappedNormalLoginForm;
