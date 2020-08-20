import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqNo1SubjectPaging,reqAddSubject} from '@/api/edu/subject'
import './index.less'

const {Item} = Form
const {Option} = Select

export default class AddSubject extends Component {

	state = {
		no1SubjectInfo:{total:0,items:[]},
	}

	//根据页码、页大小请求数据
	getNo1SubjectPage = async(pageNumber=1,pageSize=5)=>{
		//从状态中获取原数据
		const {no1SubjectInfo:{items:oldItems}} = this.state
		//发请求获取新数据
		const result = await reqNo1SubjectPaging(pageNumber,pageSize)
		const {total,items} = result
		//更新状态
		this.setState({
			no1SubjectInfo:{total,items:[...oldItems,...items]}
		})
	}

	componentDidMount(){
		this.pageNumber = 1
		//初始化Select框中数据
		this.getNo1SubjectPage(1,5)
	}

	//表单提交的回调
	handleFinish = async values =>{
		console.log('你点了提交按钮，且数据校验是通过的',values);
		await reqAddSubject(values)
		this.props.history.replace('/edu/subject/list')
	}

	loadMore = async()=>{
		this.pageNumber += 1
		this.getNo1SubjectPage(this.pageNumber,5)
	}

	render() {
		const {no1SubjectInfo} = this.state
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
										{
											no1SubjectInfo.total === no1SubjectInfo.items.length ? 
											null:
											<div>
												<hr/>	
												<Button type="link" onClick={this.loadMore}>
													加载更多......
												</Button>
											</div>
										}
									</>
								)
							}}
						>
							<Option key="0" value="" >请选择父级分类</Option>
							<Option key="1" value="0" ><span className="no1title">一级分类</span></Option>
							{
								no1SubjectInfo.items.map(subject =>
									<Option key={subject._id} value={subject._id} >
										{subject.title}
									</Option>
								)
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
