import React, { Component } from "react";
import { Form, Input, Button, Row, Col} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "@/redux/actions/login";
import "./index.less";

const { Item } = Form;

@withRouter
@connect(
	()=>({}),
	{login}
)
class LoginForm extends Component {

	gotoAdmin = (token)=>{
		localStorage.setItem("user_token", token);
		this.props.history.replace("/");
	}
	
	//点击登录按钮的回调(表单的局部校验，手动收集数据)
	handleLogin = async()=>{
		const {loginForm} = this.refs
		await loginForm.validateFields(['username','password'])
		let {username,password} = loginForm.getFieldsValue()
		let response = await this.props.login(username, password)
		this.gotoAdmin(response)
	}

  render() {
    return (
      <>
        <Form
					ref="loginForm"
          name="normal_login" //表单的名字(可选)
          className="login-form"
        >
          <Item name="username" rules={[{required:true,message:'用户名必须填写'}]}>
						<Input
							prefix={<UserOutlined className="form-icon" />}
							placeholder="用户名：admin"
						/>
					</Item>
					<Item name="password" rules={[{required:true,message:'用户名必须填写'}]}>
						<Input
							prefix={<LockOutlined className="form-icon" />}
							type="password"
							placeholder="密码: 111111"
						/>
					</Item>
          <Item>
            <Button
              type="primary"
							onClick={this.handleLogin}
              className="login-form-button"
            >
              登录
            </Button>
          </Item>
          <Item>
            <Row justify="space-between">
              <Col>
                <span>
                  第三方账号登录：
                  <GithubOutlined className="login-icon" />
                  <WechatOutlined className="login-icon" />
                  <QqOutlined className="login-icon" />
                </span>
              </Col>
            </Row>
          </Item>
        </Form>
      </>
    );
  }
}

export default LoginForm;
