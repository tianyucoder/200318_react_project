import React, { Component } from 'react'
import './index.css'

export default class Admin extends Component {
	render() {
		return (
			<div 
				className="shadow_wrap" 
				style={{
						display:'flex',
						justifyContent:'center',
						alignItems:'center',
						width:'100%',
						height:'400px',
						fontSize:'34px'
					}}>
				<span className="floating">欢迎使用硅谷教育管理系统</span>
			</div>
		)
	}
}
