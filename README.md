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
		1.Table组件，列的配置中：render和dataIndex的配合
				(1).同时存在渲染结果以render返回值为准
				(2).dataIndex所指定的属性，会作为参数传给render
				(3).不写dataIndex，就传给render整个数据项
		2.提示组件





