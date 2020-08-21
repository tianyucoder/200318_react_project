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
import { login,loginSuccessSync } from "@/redux/actions/login";
import "./index.less";

const { Item } = Form;

@withRouter
@connect(
	()=>({}),//传递状态
	{login,loginSuccessSync} //传递操作状态的方法
)
class LoginForm extends Component {

	//点击登录按钮的回调(表单的局部校验，手动收集数据)
	handleLogin = async()=>{
		//获取登录表单实例
		const {loginForm} = this.refs
		//校验表单--返回Promise实例
		await loginForm.validateFields(['username','password'])
		//获取登录表单数据
		let {username,password} = loginForm.getFieldsValue()
		//调用异步action，传入用户名、密码，执行登录
		let token = await this.props.login(username, password)
		localStorage.setItem("user_token",token);
		this.props.history.replace("/");

		/* const loginResult = await reqLogin(username,password)
		console.log(loginResult);
		this.props.loginSuccessSync(loginResult) //redux中存token
		localStorage.setItem("user_token",loginResult.token)
		this.props.history.push('/') */
	}

  render() {
    return (
      <>
        <Form
					ref="loginForm" //用于在表单外侧获取表单实例
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

export default LoginForm
