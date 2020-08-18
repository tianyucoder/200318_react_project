import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

const {Item} = Form
const {Option} = Select
export default class AddSubject extends Component {

	handleFinish = (values)=>{
		console.log('你点了提交按钮，且数据校验是通过的',values);
	}

	render() {
		return (
			<Card 
				title={
					<>
						<Button onClick={this.props.history.goBack} type="link" icon={<ArrowLeftOutlined/>}/>
						<span>添加分类</span>
					</>
				}
			>
				<Form 
					onFinish={this.handleFinish} 
					wrapperCol={{span:5}} 
					labelCol={{span:3}}
					initialValues={{parentId:'',}}//设置表单的初始值
				>
					<Item 
						label="分类名" 
						name="title" //Item如果没有name属性，所有的rules都不起作用
						rules={[
							{required:true,message:'抱歉，分类名必须填写！'},
						]}
					>
						<Input placeholder="请求输入分类名"/>
					</Item>
					<Item 
						label="所属父级分类"
						name="parentId"
						rules={[
							{required:true,message:'抱歉，必须选择一个所属分类！'},
						]}
					>
						<Select>
							<Option key="0" value="" >请选择分类</Option>
							<Option key="1" value="1" >测试分类一</Option>
							<Option key="2" value="2" >测试分类二</Option>
							<Option key="3" value="3" >测试分类三</Option>
						</Select>
					</Item>
					<Item  wrapperCol={{offset:3}}>
						<Button type="primary" htmlType="submit">确认</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
