import React, { Component } from 'react'
import { Card,Button,Table,Tooltip,Input, message,Modal} from 'antd';
import {
	PlusOutlined,
	FormOutlined,
	DeleteOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons'
import {
	reqNo1SubjectPaging,
	reqNo2SubjectById,
	reqUpdateSubject,
	reqDeleteSubject
} from '@/api/edu/subject'
import './index.less'
//从Modal引入confirm
const {confirm} = Modal

export default class Subject extends Component {
	subjectRef = React.createRef()
	state = {
		no1SubjectInfo:{total:0,items:[]}, //一级分类数据
		pageSize:4, //页大小
		pageNumber:1,//页码
		loading:false,//展示loading
		expandedIds:[],//展开的id
		editId:'',//当前正在编辑分类的id
		editTitle:'',//当前正在编辑分类的title
	}

	componentDidMount (){
		//初始化一级分类数据
		this.getNo1SubjectPaging()
	}

	//请求所以一级分类数据
  getNo1SubjectPaging = async (pageNumber=1,pageSize=this.state.pageSize)=>{
		//展示loading
		this.setState({loading:true,pageSize,pageNumber})
		//请求一级分类数据
		const result = await reqNo1SubjectPaging(pageNumber,pageSize)
		let {total,items} = result
		//给每一个一级分类追加chidlren属性--目的是让antd显示展开按钮
		items =  items.map((subject)=>{
			subject.children = []
			return subject
		})
		this.setState({
			no1SubjectInfo:{total,items},//维护新的数据进状态
			expandedIds:[], //清空之前所展开的
			loading:false
		})
	}

	//表格项展开+折叠的回调
	handleExpand = async(ids)=>{
		//获取状态中展开项id的数组
		const {expandedIds,no1SubjectInfo} = this.state
		//如果是展开，则发请求
		if(expandedIds.length < ids.length){
			//当前操作项的id
			const _id = ids.slice(-1)[0]
			//根据id找到当前操作的项
			const currentSubject = no1SubjectInfo.items.find(subject => subject._id ===_id )
			//如果当前分类没有展开过
			if(currentSubject.children && !currentSubject.children.length){
					this.setState({loading:true})
					//根据一级分类id，获取当前一级分类下属的所有二级分类数据
					const no2SubjectInfo = await reqNo2SubjectById(_id)
					//从状态中获取一节分类
					const {no1SubjectInfo} = this.state
					//加工一级分类数据，找到展开的一级分类，给其children属性赋值
					const arr = no1SubjectInfo.items.map((subject)=>{
						if(subject._id === _id){
							//将请求回来的二级分类数组，追加到children属性上
							subject.children = no2SubjectInfo.items
							//如果请求回来的二级分类数据长度为0，干掉children
							if(!no2SubjectInfo.items.length) delete subject.children
						}
						return subject
					})
					//维护状态（好好思考这个写法）
					this.setState({
						no1SubjectInfo:{...no1SubjectInfo,items:arr},
						loading:false
					})
			}
		}
		//把最新的展开项id数组，维护进状态
		this.setState({expandedIds:ids})
	}

	//更新分类-确定按钮的回调
	updateSubject = async()=>{
		const {editId,editTitle,no1SubjectInfo} = this.state
		//封装更新数据的方法
		const handleData = arr =>{
			return arr.map((subject)=>{
				if(subject._id === editId){
					subject.title = editTitle
				}else{
					//如果某一级分类有children，继续去children里找
					if(subject.children) handleData(subject.children)
				}
				return subject
			})
		}
		//1.获取当前编辑项的id + 用户的输入
		if(!editTitle.trim()){
			message.error('分类名不能为空',0.5)
			return
		}
		//2.发请求去更新
		await reqUpdateSubject(editId,editTitle)
		//3.手动维护本地状态
		const updatedSubject1Arr = handleData(no1SubjectInfo.items)
		//4.维护状态
		this.setState({
			no1SubjectInfo:{...no1SubjectInfo,items:updatedSubject1Arr},//更新分类信息
			editId:'', //清空编辑的id
			editTitle:''//清空编辑的title
		})
	}

	//点击删除按钮的回调
	handleDelete = (subject)=>{
		const {pageNumber,pageSize,no1SubjectInfo} = this.state
		confirm({
		  title: <h4>确认删除<span className="alert_info">{subject.title}</span>吗?</h4>, //主标题
			icon: <QuestionCircleOutlined />,//图标
			content: '删除后无法恢复，请谨慎操作！',//副标题
			okText:'确认',
			cancelText:'取消',
			onOk:async()=> { //弹窗中确认按钮的回调
				//请求删除分类
				await reqDeleteSubject(subject._id)
				this.getNo1SubjectPaging(
					//如果不是第一页，且列表中只有一条数据了，那么就请求前一页的数据	
					pageNumber>1 && no1SubjectInfo.items.length === 1 ? 
					pageNumber-1 : 
					pageNumber ,pageSize
				)
				if(no1SubjectInfo.items.length === 1) this.setState({pageNumber:pageNumber-1})
			},
			/* onCancel() { //弹窗中取消按钮的回调
				console.log('你点了取消');
			}, */
		});
	}


	render() {
		const {no1SubjectInfo,pageSize,pageNumber,expandedIds,loading,editId} = this.state
		//表格中的数据源(此时是假数据，后期一定通过请求从服务器那边获取)
		let dataSource = no1SubjectInfo.items;
		//表格的列配置(根据设计文档写)
		const columns = [
			{
				title: '分类名', //决定该列的名字
				//dataIndex: 'title', //数据索引项——决定该列展示啥
				key: 'title',
				render:(item)=> item._id === editId ? 
					<Input 
						defaultValue={item.title} 
						onChange={event => this.setState({editTitle:event.target.value})}
						className="edit_input" 
						type="text"
					/> : 
					item.title
			},
			{
				title: '操作',
				width:"200px",
				//dataIndex:'_id', //数据索引项——决定该列展示啥
				align:'center',
				key: 'caozuo',
				render:(subject)=>( //render返回啥，该列就展示啥
					subject._id === editId ?
						<>
							<Button 
								size="small" 
								className="left_btn" 
								type="primary"
								onClick={this.updateSubject}
							>确定</Button>
							<Button 
								size="small" 
								onClick={()=>this.setState({editId:'',editTitle:''})}
							>取消</Button>
						</>:
						<>
							<Tooltip placement="top" title="编辑分类">
								<Button 
									onClick={()=>this.setState({editId:subject._id,editTitle:subject.title,})} 
									type="primary" 
									className="left_btn" 
									icon={<FormOutlined/>}
								/>
							</Tooltip>
							<Tooltip placement="top" title="删除分类">
								<Button onClick={()=>this.handleDelete(subject)} type="danger" icon={<DeleteOutlined/>}/>
							</Tooltip>
						</>
				) 
			},
		];
		return (
			<Card title={<Button type="primary" icon={<PlusOutlined />}>新增分类</Button>}>
				<Table 
					loading={loading}
					dataSource={dataSource} //指定表格的数据
					columns={columns} //表格列的配置
					rowKey="_id" //指定唯一标识(默认值为key)
					expandable={{
						//onExpand:this.handleExpand ,//指定展开的回调
						onExpandedRowsChange:this.handleExpand,//指定展开的回调
						expandedRowKeys:expandedIds //展开哪些项(项id组成的数组)
					}}
					pagination={{ //分页器配置
						total:no1SubjectInfo.total, //数据总数
						pageSize:pageSize, //页大小
						showSizeChanger:true,//显示页大小切换器
						pageSizeOptions:['3','4','5','10','15'],
						current:pageNumber,//当前页码
						onShowSizeChange:(_,pageSize)=>{ //页大小改变的回调
							this.getNo1SubjectPaging(1,pageSize)
						},
						onChange:(pageNumber)=>{ //页码改变的回调
							this.getNo1SubjectPaging(pageNumber)
						}
					}}
				/>
			</Card>
		)
	}
}
