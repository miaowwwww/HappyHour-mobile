# HappyHour-mobile
毕业设计------移动web

# 启动
1. 环境配置
	安装node， mongodb
2. 开发环境
	mongodb文件夹目录下执行命令启动数据库服务
	mongod.exe -f D:\mystudy\MongoDB\mongodb.conf
3. 安装依赖
	npm inistall  
4. 开发环境启动
	npm start  
	npm run server  
	访问localhost:9999
5. 生产坏境
	npm build 
	npm run server
	访问localhost:3000

# 目录结构
server
src
	actions
	constants
	components
	container
	reducers
	routers
	store/(history,configStore)
	css
	images
config
uploda
# 为什么要用session 
1. 对于敏感操作，需要验证当前的 user._id 是否跟前端返回的 _user._id 一致
例如修改用户的信息。前端要返回 _user._id, 如果没有 session.user._id, 那是不是，我可以把其他人的user._id 写上
2. 移动端不可使用session 需要使用token代替

# 需求
1. 我的收藏（视频列表）
2. 我的关注（用户列表）
3. 无限滚动加载