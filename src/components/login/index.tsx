import * as React from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import "./index.less";
import { login } from "../../action/system/login";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
// interface LoginProps extends FormComponentProps {}

const mapStateProps = () => ({});
const mapDispatchProps = (dispatch: Dispatch) =>
    bindActionCreators({ login: (params: any) => login(params) }, dispatch);
type Props = FormComponentProps & ReturnType<typeof mapDispatchProps>;
class LoginForm extends React.Component<Props, {}> {
    handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        const _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            _this.props.login({
                ...values
            });
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
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
                    <div className="tips">
                        <span>账户: admin</span>
                        <span> 密码: 123456</span>
                    </div>
                    <Button type="primary" htmlType="submit" className="button">
                        登录
                    </Button>
                </Form>
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);

const enhance = connect(
    mapStateProps,
    mapDispatchProps
);
export default enhance(WrappedNormalLoginForm);
