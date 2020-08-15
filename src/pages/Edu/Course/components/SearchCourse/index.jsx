import React, { Component } from 'react'
import {Card,Form,Input,Select,Button} from 'antd'
import {reqGetAllTeacherList} from '@/api/edu/teacher'
import {reqSearchCourse,reqAllNo1Subject,reqAllNo2SubjectById} from '@/api/edu/course'
import PubSub from 'pubsub-js'
import './index.less'

const {Item} = Form
const {Option} = Select

export default class SearchCourse extends Component {

	state = {
		no1SubjectList:[],//级联选择器一级下拉数据
		teachers:[]//教师数据
	};

	componentDidMount(){
		//初始化所有一级分类
		this.initData()
	}

	//初始化数据（讲师、一级课程分类）
	initData = async()=>{
		let [no1SubjectList,teachers] =  await Promise.all([
			reqAllNo1Subject(),//请求所有一级分类数据
			reqGetAllTeacherList()//请求所有教师数据
		])
		//让所有一份分类数据均为非叶子节点（这样才有加载按钮）
		no1SubjectList = no1SubjectList.map((subject)=>{
			subject.isLeaf = false
			return subject
		})
		this.setState({no1SubjectList,teachers})
	}

	//级联选择器加载数据的方法
	loadData = async selectedOptions => {
		console.log('loadData',selectedOptions);
		//获取已经选择的项里最后一项
		const targetOption = selectedOptions[selectedOptions.length - 1];
		//变为loading状态
		targetOption.loading = true;
		//用定时器模拟了一个异步请求
		/* 
			如果此处请求的是动态数据，那么：
					1.不要写定时器了，要写发送真正的ajax请求
					2.原来在定时器回调里执行的逻辑，都要放在ajax请求成功的回调中
					3.请求回来的数据，追加给targetOption的children属性
		*/
		//请求某一级分类的所有二级分类
		let no2Subjects = await reqAllNo2SubjectById(targetOption._id)
		const {items} = no2Subjects 
		targetOption.loading = false; //取消加载中
		targetOption.children = [...items] //存数据
		//如果该一级分类没有下属的二级分类，让他变为叶子节点
		if(!items.length){
			targetOption.isLeaf = true
		}
		this.setState({
			no1SubjectList: [...this.state.no1SubjectList],
		});
  };

	//搜索表单提交的回调
	onFinish = async(values)=>{
		const {subject} = values
		//如果选择了分类
		if(subject){
			values.subjectParentId = subject[0]
			values.subjectId = subject[1]
		}
		//搜索课程
		let result = await reqSearchCourse(values)
		const {no1SubjectList,teachers} = this.state
		//发布消息传递：一级分类列表、讲师列表、课程列表
		/* 
			传递课程列表的目的：CourseList要展示课程列表
			传递一级分类、讲师列表的目的：CourseList展示的是讲师id、分类id，要对应成讲师名字、分类名字
		*/
		PubSub.publish('courseList',{no1SubjectList,teachers,courseList:result});
	}

	render() {
		return (
			<Card>
				<Form
					ref={(current)=>this.form = current}
					onFinish={this.onFinish}
					initialValues={{teacherId:''}}
					layout="inline"
				>
					<Item 
						name="title" 
						label="课程标题"
					>
						<Input 
							placeholder="输入标题" 
							className="search_title"
						/>
					</Item>
					<Item label="讲师" name="teacherId">
						<Select className="teacher_select">
							<Option key="-1" value="">请选择讲师</Option>
							{
								this.state.teachers.map((t)=><Option key={t._id} value={t._id}>{t.name}</Option>)
							}
						</Select>
					</Item>
					<Item>
						<Button type="primary" htmlType="submit">
							搜索
						</Button>
						<Button onClick={()=>this.form.resetFields()} className="search_reset">
							重置
						</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
