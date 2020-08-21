## day01任务
		1.明确：
			(1).react项目服务器是放在本地的，在project_server里
			(2).react项目和之前的vue项目一样，不是一个从0到1的项目

		2.安装数据库：MongoDB（只是第一次做）
			(1).双击：react项目_stu\数据库相关_安装包\MongoDB\mongodb_4.0_64位.msi
			(2).next
			(3).勾选I accept ....
			(4).选择complete
			(5).默认就好
			(6).不要勾选！！！！！ Install MongoDB Compass
			(7).Install

		3.配置环境变量：（只是第一次做）
			将该路径：C:\Program Files\MongoDB\Server\4.0\bin 配置到环境变量中(path)

		4.建立数据库文件夹（不可随意更改，只是第一次做）
			在C盘根目录下创建如下结构的文件夹：
			-data
				-db
				-log

		5.启动服务器：
				进入该文件夹：react项目_stu\project_server
				(1).安装所有依赖：yarn  或 npm i (只是第一次做)
				(2).开启服务器：yarn start 或 npm start
				(3).若看到如下提示，即服务器成功开启：
						服务器启动成功，地址: http://localhost:5000
						接口文档创建成功，地址: http://localhost:5000/docs
						数据库连接成功!
						注意：此CMD窗口不要关，关了服务器就停了
				(4).初始化数据库中的数据：
						打开浏览器：访问http://localhost:5000/reset (只是第一次做)

		6.启动前端项目：（必须保证服务器已经开了）
				(1).清空浏览器所有的缓存：ctrl+shift+delete
				(2).进入该文件夹：react项目_stu\project_blank
				(3).安装所有依赖：yarn  或 npm i (只是第一次做)
				(4).运行项目：yarn start 或 npm start

		7.扩展知识（非必须）：
				1.安装了MongoDB，可以打开cmd靠命令去管理数据库，但是不好操作，也不美观。
				2.GUI工具，可以让程序员，更加舒服、高效的管理数据库中的数据。
				3.对于我们做项目来讲，其实不用GUI工具也可以，因为数据库的操作，我们全都交给了服务器。
				4.市面上这么多的GUI工具，我们选用哪个GUI工具去管理MongoDB？ —————— Studio-3T
				5.安装Studio-3T(随便安装)
				6.导入数据

		8.以上操作的总结：以后要启动项目的几个步骤
			(1).启动服务器
			(2).启动脚手架
			(3).等页面出来后，直接登录即可

		9. 项目文件、结构说明：
				(1).jsconfig.json ： vscode所特有的配置文件，为了让编码有更好提示。
				(2).config-overrides : 关于antd、装饰器、短路径的配置
				(3).src中的文件
							1).api文件夹：定义接口请求文件
										chapter.js：发送【章节】相关的ajax请求
										course.js：发送【课程】相关的ajax请求
										lesson.js:发送【课时】相关的ajax请求
										teacher.js:发送【讲师】相关的ajax请求
							2).utils文件夹：工具js
										request.js：对axios的二次封装
							3).components文件夹：可复用组件
							4).config文件夹：
										asyncComps.js：所有的路由组件，都在这里引入，随后暴露，否则系统不认。
							5).layouts文件夹：整体布局模块，分为公共的，私有的
							6).pages文件夹:所有的路由组件都在此定义
							7).redux:redux相关文件
			10.如何在系统中配置一个菜单：
						一、编码：
									(1).在src/pages/Edu 建立文件夹 Subject，随后在其中建立index.jsx
									(2).在src/config/asyncComps.js中，引入Subject，随后暴露
						二、去系统中配置
									(1).权限管理===>菜单管理===>点击教育管理后面的加号
											在弹窗中输入：
													1.菜单名称：学科管理
													2.访问路径: /subject/list
													3.组件路径：Subject
													4.菜单图标：不选
									(2).角色管理====>点击admin角色后面的小齿轮====>勾选【学科管理】==>确定

			11.做学科管理 ==== 课程分类管理
						1.画页面，用到：Card、Table组件。
										
## day02任务
		0.关于分页：
					真分页(后端分页):适用于数据量较大
					假分页(前端分页)：适用于数据量不是很大
		1.Table组件，列的配置中：render和dataIndex的配合
						(1).同时存在渲染结果以render返回值为准
						(2).dataIndex所指定的属性，会作为参数传给render
						(3).不写dataIndex，就传给render整个数据项
		2.提示组件：Tooltip
		3.可选操作：
						修改utils/request.js 131行追加一个 return new Promise(()=>{}) 
		4.postman测试接口
		5.去:src/api/subject.js 中定义一个请求分页数据的接口
		6.Subject组件中发送请求，数据维护进状态，Table组件读取并遍历
		7.Table中分页器的使用：（备注：页大小pageSize放在了state中，因为两个地方都在用）
				pagination={{ //分页器配置
						total:no1SubjectInfo.total, //数据总数
						pageSize:pageSize //页大小
					}}
		8.如何让表格的某行数据可展开
				(1).第一种办法：expandedRowRender适用于展开自身没来得及显示的属性，不适用于发请求。
							expandedRowRender:(item)=>{
								console.log('展开自身没展示出来',item);
								return item.gmtCreate
							}
				(2).第二种办法：借助数据自身的children属性

		9.给展开按钮加回调：
							第一种设置方式：使用onExpand
									写法：
											expandable={{
												onExpand:(expanded,recod)=>{此处写业务逻辑}
											}}
									优势：好判断是否展开
									劣势：无法重置展开的状态，需要很复杂的手动维护展开项id

							第一种设置方式：使用expandedRowKeys
									写法：
											expandable={{
												expandedRowKeys:(expandedIds)=>{此处写业务逻辑}
											}}
									优势：自动维护展开项id
									劣势：需要手动判断展开还是收缩(写法不难)

		10.请求回来的二级分类数据，追加到对应一级分类的children属性上
		11.loading效果

		备注1：要知道这个操作：
							let a = {no1Data:{total:10,items:[]}}
							let arr = [1,3,5,7,9]
							a = {...a.no1Data,items:0}
							console.log(a);
		备注2：如何获取数组中最后一个元素？
							(1) ids[ids.length - 1]
							(2) ids.reverse()[0]
							(3) ids.slice(-1)[0]







## day03任务：
		1.编辑分类
				(1).在Tbale组件的列配置中，render与dataIndex的配合,获取当前分类信息
				(2).点击编辑将当前分类信息(_id,title)存入自身state---受控组件
				(3).Table组件中render属性中加判断，匹配状态中id，展示不同的内容
				(4).编写API请求更新分类信息
				(5).更新后，不要刷新当前页面，而是自己遍历更新数据(体验好)，用到了一个递归查找：
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
		2.删除分类
				(1).用到了Modal.confirm组件
						confirm({
								title:'xxxxx, //主标题
								icon: <QuestionCircleOutlined />,//图标
								content: '删除后无法恢复，请谨慎操作！',//副标题
								okText:'确认',
								cancelText:'取消',
								onOk:async()=> {} //弹窗中确认按钮的回调
								onCancel() {} //弹窗中取消按钮的回调
							});
				(2).执行删除
								(1).删除后重新请求当前页的最新数据
								(2).注意分页器中current属性的使用————用来指定当前页码
								(3).每次点击页码按钮后，将当前页码维护进状态
								(4).若当前不是第一页，且只有一条数据，删除后要请求前一页数据

				(3).配置添加分类菜单
								(1).创建组件：src/pages/Edu/Subject/components/AddSubject/index.jsx
								(2).在src/config/asyncComps.js引入新建的组件
								(3).配置权限
											1).权限管理===>菜单管理===>展开教育管理===>点击分类管理后的加号
														在弹窗中输入：
																1.菜单名称：添加分类
																2.访问路径: /subject/add
																3.组件路径：AddSubject
																4.按钮权限：subject.add
											2).角色管理====>点击admin角色后面的小齿轮====>勾选【添加分类】==>确定
											3).Subject组件中给【新增分类】按钮加事件，实现路由跳转

## day04任务：
	1.新增分类：
			(1).下拉框懒加载，所需属性dropdownRender，代码如下：
					<Select
						dropdownRender={(data)=>{
							return (
								<>
									{data}
									<hr/>
									<Button type="link">加载更多......</Button>
								</>
							)
						}}
					>
						正常的一个一个Option
						<Option>xxxxxx</Option>
						<Option>xxxxxx</Option>
						.........
					</Select>
			(2).完成添加

	2.应用国际化：
			1.什么是国际化？
					同一个网站，但可以根据用户的选择，进行语言的切换。
			2.什么系统考虑做国际化？
					后台管理系统，电商系统
			3.国际化是实时翻译吗？
					不是，是有指定语言包的
			4.国际化的两种级别？
					1.应用骨架的国际化
					2.应用数据的国际化	

	3.react项目中自定义国际化
			(1).定义语言包，并编写内容：
							src/locales/zh_CN.json
							src/locales/zh_TW.json
							src/locales/en.json
							src/locales/index.js =====> 汇总所有的语言包，随后暴露
			(2).安装依赖包：yarn add react-intl
			(3).打开src/index.js
							引入：import {IntlProvider} from 'react-intl'
							引入：import language from './locales'
							用IntlProvider包裹App组件，且传入所有语言：
											<IntlProvider messages={language.zh_CN}>
												<App/>
											</IntlProvider>

			(4).在需要做国际化的组件当中【第一种实现方式】(推荐)：
							(1).引入：
										import {FormattedMessage} from 'react-intl'
							(2).在用到文字的地方：
										<FormattedMessage id="add_subject"/>

			(5).在需要做国际化的组件当中【第二种实现方式】(兼容性好)：
							(1).引入：
										import {injectIntl} from 'react-intl'	
							(2).用injectIntl加工原组件，随后将加工的结果暴露出去=====>可以考虑用装饰器
							(3).在用到文字的地方：
										this.props.intl.formatMessage({id:'xxxxx'})

	4.react项目中antd的国际化
			(1).引入语言包：
						import {ConfigProvider} from 'antd'
			(2).使用ConfigProvider包裹App
					<ConfigProvider locale=你想用的语言包>
						<IntlProvider messages=你想用的语言包 locale="en">
							<App/>
						</IntlProvider>
					</ConfigProvider>

	5.分析项目中的redux结构，并自己编写一个，将subject信息存入redux

	6.实现右上角语言切换
				(1).确定组件位置：src/layouts/PrimaryLayout
				(2).找到下拉菜单的位置
				(3).给下拉菜单指定点击回调
				(4).点击回调中：a.获取用户选择的语言；b.将用户所选语言维护到redux
				(5).讲所有引入语言包、指定语言包的代码从index.js中移植到App.js
