import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

const {Item} = Form
const {Option} = Select
export default class AddSubject extends Component {
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
				<Form wrapperCol={{span:5}} labelCol={{span:3}}>
					<Item 
						label="分类名" 
						name="peiqi" //Item如果没有name属性，所有的rules都不起作用
						rules={[
							{required:true,message:'抱歉，分类名必须填写！'},
						]}
					>
						<Input placeholder="请求输入分类名"/>
					</Item>
					<Item 
						label="所属父级分类"
						name="qiaozhi"
						rules={[
							{required:true,message:'抱歉，必须选择一个所属分类！'},
						]}
					>
						<Select defaultValue="">
							<Option key="0" value="" >请选择分类</Option>
							<Option key="1" value="1" >1</Option>
							<Option key="2" value="2" >2</Option>
							<Option key="3" value="3" >3</Option>
						</Select>
					</Item>
					<Item  wrapperCol={{offset:3}}>
						<Button type="primary">确认</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
