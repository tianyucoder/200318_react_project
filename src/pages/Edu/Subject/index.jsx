import React, { Component } from 'react'
import { Card,Button,Table,Tooltip,Input} from 'antd';
import {PlusOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
import {reqNo1SubjectPaging,reqNo2SubjectById} from '@/api/edu/subject'
import './index.less'

export default class Subject extends Component {

	state = {
		no1SubjectInfo:{total:0,items:[]}, //一级分类数据
		pageSize:4, //页大小
		loading:false,//展示loading
		expandedIds:[],//展开的id
		editId:'',//当前正在编辑分类的id
		// editTitle:'',//当前正在编辑分类的title
	}

	componentDidMount (){
		//初始化一级分类数据
		this.getNo1SubjectPaging()
	}

	//请求所以一级分类数据
  getNo1SubjectPaging = async (pageNumber=1,pageSize=this.state.pageSize)=>{
		//展示loading
		this.setState({loading:true})
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

	//点击编辑按钮的回调
	handleEdit = ({_id})=>{
		this.setState({editId:_id})
	}

	//编辑时点击取消按钮的回调
	handleCancel = ()=>{
		this.setState({editId:''})
	}

	render() {
		const {no1SubjectInfo,pageSize,expandedIds,loading,editId} = this.state
		//表格中的数据源(此时是假数据，后期一定通过请求从服务器那边获取)
		let dataSource = no1SubjectInfo.items;
		//表格的列配置(根据设计文档写)
		const columns = [
			{
				title: '分类名', //决定该列的名字
				//dataIndex: 'title', //数据索引项——决定该列展示啥
				key: 'title',
				render:(item)=> item._id === editId ? 
								<Input defaultValue={item.title} className="edit_input" type="text"/> : 
								item.title
			},
			{
				title: '操作',
				width:"200px",
				//dataIndex:'_id', //数据索引项——决定该列展示啥
				align:'center',
				key: 'caozuo',
				render:(item)=>( //render返回啥，该列就展示啥
					item._id === editId ?
					<>
						<Button size="small" className="left_btn" type="primary">确定</Button>
						<Button size="small" onClick={this.handleCancel}>取消</Button>
					</>:
					<>
						<Tooltip placement="top" title="编辑分类">
							<Button onClick={()=>this.handleEdit(item)} type="primary" className="left_btn" icon={<FormOutlined/>}/>
						</Tooltip>
						<Tooltip placement="top" title="删除分类">
							<Button type="danger" icon={<DeleteOutlined/>}/>
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
						onShowSizeChange:(_,pageSize)=>{ //页大小改变的回调
							this.getNo1SubjectPaging(1,pageSize)
							this.setState({pageSize})
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
