import React, { Component } from 'react'
import { Card,Button,Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons'

export default class Subejct extends Component {
	render() {
		//表格中的数据源(此时是假数据，后期一定通过请求从服务器那边获取)
		const dataSource = [
			{
				_id: '1', //数据的唯一标识
				name: '测试学科一', //名字
				caozuo:'caozuo'
			},
			{
				_id: '2',
				name: '测试学科一',
				caozuo:'caozuo'
			},
		];
		//表格的列配置(根据设计文档写)
		const columns = [
			{
				title: '分类名', //决定该列的名字
				dataIndex: 'name', //数据索引项——决定该列展示啥
				key: '0',
			},
			{
				title: '操作',
				width:"200px",
				dataIndex:'caozuo',
				align:'center',
				key: '1',
			},
		];
		return (
			<Card title={<Button type="primary"><PlusOutlined />新增课程分类</Button>}>
				<Table dataSource={dataSource} columns={columns} rowKey="_id"/>
			</Card>
		)
	}
}
