import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {reqNo1SubjectPaging,reqAddSubject} from '@/api/edu/subject'
import {FormattedMessage,injectIntl} from 'react-intl'
import './index.less'

const {Item} = Form
const {Option} = Select

@injectIntl
class AddSubject extends Component {

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

	//表单确定按钮的回调
	handleClick = async()=>{
		//获取表单实例
		const {addSubjectForm} = this.refs
		//1.校验数据
		await addSubjectForm.validateFields(['title','parentId'])
		//2.获取数据
		const values = addSubjectForm.getFieldsValue(['title','parentId'])
		await reqAddSubject(values)
		this.props.history.replace('/edu/subject/list')
	}

	//加载更多
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
						<span>
							<FormattedMessage id="add_subject"/>
						</span>
					</>
				}
			>
				<Form 
					ref="addSubjectForm"
					wrapperCol={{span:5}} //调整wrapper区
					labelCol={{span:3}} //调整label区
					initialValues={{parentId:'',}}//设置一些表单项的初始值
				>
					<Item 
						label={<FormattedMessage id="subject_name"/>} //左侧文字
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
						<Input placeholder={this.props.intl.formatMessage({id:'hint_subject_name'})}/>
					</Item>
					<Item 
						label={<FormattedMessage id="parent_id"/>}
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
							<Option key="0" value="" ><FormattedMessage id="hint_parent_id"/></Option>
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
						<Button type="primary" onClick={this.handleClick}>
							<FormattedMessage id="ok_btn"/>
						</Button>
					</Item>
				</Form>
				
				{/* 传参 */}
				{/* <FormattedMessage id="test" values={{name:'tom',age:19}}/> */}
				{/* 指定渲染的标签名，而且是可以传第三方组件的 */}
				{/* <FormattedMessage id="ok_btn" tagName={Button}/> */}
				{/* 用回调函数自定义结构 */}
				{/* <FormattedMessage id="ok_btn">
						{data => <Button type="danger">{data[0]}</Button>}
				</FormattedMessage> */}
			</Card>
		)
	}
}
export default AddSubject
