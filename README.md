# HappyHour-mobile
毕业设计------移动web
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
