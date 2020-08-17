import React, { Component } from 'react'
import { Card,Button,Table,Tooltip} from 'antd';
import {PlusOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
import './index.less'

export default class Subejct extends Component {
	render() {
		//表格中的数据源(此时是假数据，后期一定通过请求从服务器那边获取)
		let dataSource = [
			{
				_id: '1', //数据的唯一标识
				name: '测试分类一', //名字
				caozuo:'操作'
			},
			{
				_id: '2',
				name: '测试分类二',
				caozuo:'操作'
			},
		];
		//表格的列配置(根据设计文档写)
		const columns = [
			{
				title: '分类名', //决定该列的名字
				dataIndex: 'name', //数据索引项——决定该列展示啥
				key: 'name',
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
				/>
			</Card>
		)
	}
}
