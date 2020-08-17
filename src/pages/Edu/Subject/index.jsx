import React, { Component } from 'react'
import { Card,Button,Table,Tooltip} from 'antd';
import {PlusOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
import {reqNo1SubjectPaging} from '@/api/edu/subject'
import './index.less'

export default class Subject extends Component {

	state = {
		no1SubjectInfo:{total:0,items:[]}, //一级分类数据
		pageSize:4 //页大小
	}

	componentDidMount (){
		//初始化一级分类数据
		this.getNo1SubjectPaging()
	}

	//请求所以一级分类数据
  getNo1SubjectPaging = async (pageNumber=1,pageSize=this.state.pageSize)=>{
		const result = await reqNo1SubjectPaging(pageNumber,pageSize)
		let {total,items} = result
		//给每一个一级分类追加chidlren属性--目的是让antd显示展开按钮
		items =  items.map((subject)=>{
			subject.children = []
			return subject
		})
		this.setState({no1SubjectInfo:{total,items}})
	}

	handleExpand = (expanded)=>{
		if(expanded){
			console.log('发请求');
		}
	}

	render() {
		const {no1SubjectInfo,pageSize} = this.state
		//表格中的数据源(此时是假数据，后期一定通过请求从服务器那边获取)
		let dataSource = no1SubjectInfo.items;
		//表格的列配置(根据设计文档写)
		const columns = [
			{
				title: '分类名', //决定该列的名字
				dataIndex: 'title', //数据索引项——决定该列展示啥
				key: 'title',
				/* render:(name)=>{
					console.log(name);
					return '￥'+name
				} */
			},
			{
				title: '操作',
				width:"200px",
				dataIndex:'caozuo', //数据索引项——决定该列展示啥
				align:'center',
				key: 'caozuo',
				render:()=>( //render返回啥，该列就展示啥
					<>
						<Tooltip placement="top" title="编辑分类">
							<Button type="primary" className="left_btn" icon={<FormOutlined/>}/>
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
					dataSource={dataSource} //指定表格的数据
					columns={columns} //表格列的配置
					rowKey="_id" //指定唯一标识(默认值为key)
					expandable={{
						onExpand:this.handleExpand
					}}
					pagination={{ //分页器配置
						total:no1SubjectInfo.total, //数据总数
						pageSize:pageSize, //页大小
						showSizeChanger:true,//显示页大小切换器
						pageSizeOptions:['3','4','5','10','15'],
						onShowSizeChange:(_,pageSize)=>{
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
