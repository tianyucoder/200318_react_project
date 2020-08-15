import React, { Component } from 'react'
import {Card,Button,Table,Tooltip} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getLessonListByChapter,getChapterListSync} from '@/pages/Edu/Chapter/redux'
import {
	PlusOutlined,
	FormOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import PubSub from 'pubsub-js'
import screenfull from 'screenfull'
import './index.less'

@connect(
	(state)=>({chapterInfo:state.chapterInfo}),//用于给组件映射redux中的状态
	{getLessonListByChapter,getChapterListSync}//用于给组件映射简介操作状态的方法
)
@withRouter
class List extends Component {

	state = {
		expandedIds:[],//展开了哪些菜单
		isFull:false, //用于标识是否处于全屏状态
	}

	componentDidMount(){
		//订阅消息，用于清空expandedIds
		this.token = PubSub.subscribe('clearExpandedIds',()=>{
			this.setState({expandedIds:[]})
		});
		//检测浏览器页签变化===>无论使用哪一种方式让页签全屏，都会被screenfull检测到
		screenfull.on('change',()=>{
			//屏幕全屏发生变化时，调用该回调
			const {isFull} = this.state
			//切换全屏状态
			this.setState({isFull:!isFull})
		})
	}

	componentWillUnmount(){
		//取消订阅
		PubSub.unsubscribe(this.token);
		//清空redux中所保存的章节信息
		this.props.getChapterListSync({total:0,items:[]})
	}

	//展开某一个章节的回调
	handleExpanded = async(expandedIds)=>{
		//从状态中获取expandedKeys
		const {expandedIds:keys} = this.state
		const {chapterInfo} = this.props
		//判断是展开还是折叠，展开再发请求
		if(keys.length < expandedIds.length){
			//获取当前展开章节的_id
			const id =  expandedIds.slice(-1)[0]
			//获取当前展开的章节
			const currentChapter  = chapterInfo.items.find((chapterObj)=> chapterObj._id === id)
			if(!currentChapter.children.length) this.props.getLessonListByChapter(id)
		}
		//将当前的展开项的id数组，维护进状态
		this.setState({expandedIds})
	}


	render() {
		//获取redux中传递过来的章节信息
		const {chapterInfo} = this.props
		//从状态中获取展开的id数组
		const {
			expandedIds, //展开项的id数组
		} = this.state
		//表格列的配置
		const columns = [
			{ 
				title: '章节名称',
				dataIndex: 'title',
				key: 'title',
				width:'40%'
			},
			{ 
				title: '是否免费', 
				//dataIndex: 'free',
				key: 'free', 
				render:(item)=>(
					"free" in item ? item.free ? '是' : '否' : ''
				)
			},
			{ 
				title: '操作', 
				align:'center',
				//dataIndex: '_id',//数据索引(该列展示什么信息)
				key: 'option',
				render:(item)=>(
					<>
						<Tooltip placement="top" title="编辑">
							<Button 
									type="primary" 
									className="edit_btn" 
									icon={<FormOutlined />}
							>
							</Button>
						</Tooltip>
						<Tooltip placement="top" title="删除">
							<Button 
								type="danger" 
								icon={<DeleteOutlined />}
							></Button>
						</Tooltip>
					</>
				)
			},
		];
		
		return (
			<div ref="demo" className="wraper">
				{/* 章节列表 */}
				<Card 
					title="课程章节列表"
					extra={
						<>
							<Button type="primary" icon={<PlusOutlined />}>新增章节</Button>		
						</>
					}
					className="chapter_list"
				>
					<Table
						className="table_list"
						rowKey="_id" //唯一标识
						columns={columns} //表格中列的配置
						dataSource={chapterInfo.items}//表格的数据源(存储数据的数组)
						expandable={{ //配置展开属性
							onExpandedRowsChange:this.handleExpanded,//展开一项的回调
							expandedRowKeys:expandedIds //展开的菜单
						}}
					/>
				</Card>
			</div>
		)
	}
}
export default List
