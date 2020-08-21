import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginSuccessSync} from '@/redux/actions/login'

class Oauth extends Component {

	componentDidMount(){
		//1.获取服务器辛辛苦苦生成的一个token
		const token = this.props.location.search.split('=')[1]
		//2.Local里存一份
		localStorage.setItem('user_token',token)
		//3.redux中存一份
		this.props.loginSuccessSync({token})
		//4.跳转到管理界面
		this.props.history.replace('/')
	}

	render() {
		return (
			<div>
				<h1>授权登录中........</h1>
			</div>
		)
	}
}
export default connect(
	()=>({}),
	{loginSuccessSync}
)(Oauth)
