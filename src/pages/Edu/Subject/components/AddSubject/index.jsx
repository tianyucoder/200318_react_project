import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqAllNo1Subject} from '@/api/edu/subject'

const {Item} = Form
const {Option} = Select
export default class AddSubject extends Component {

	state = {
		no1SubjectArr:[]
	}

	getAllNo1Subject = async()=>{
		const result = await reqAllNo1Subject()
		this.setState({no1SubjectArr:result})
	}

	componentDidMount(){
		this.getAllNo1Subject()
	}

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
					onFinish={this.handleFinish} //点击提交按钮且表单校验通过后的回调
					wrapperCol={{span:5}} //调整wrapper区
					labelCol={{span:3}} //调整label区
					initialValues={{parentId:'',}}//设置一些表单项的初始值
				>
					<Item 
						label="分类名" //左侧文字
						/* 
							Item中name属性的作用：
									1.作为antd收集表数数据时，数据对象的key
									2.让校验规则生效
						*/
						name="title" 
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
						<Select
							dropdownRender={(data)=>{
								return (
									<>
										{data}
										<hr/>
										<Button type="link">加载更多......</Button>
									</>
								)
							}}
						>
							<Option key="0" value="" >请选择父级分类</Option>
							<Option key="1" value="0" >一级分类</Option>
							{
								/* this.state.no1SubjectArr.map((subject)=>{
								 return <Option key={subject._id} value={subject._id} >{subject.title}</Option>
								}) */
							}
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
