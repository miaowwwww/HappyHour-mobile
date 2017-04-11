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
	store（history）
	css
	images
	virtual_data
config

# 数据库设计MongoDB
```js
user={
	id, //自动生成
	accoundId,
	password,
	name,
	portrait,//头像
	follow:[{type:ObjectId,ref:'producer'}],//关注制作方
	collect:[{type:ObjectId,ref:'video'}],//收藏视频
	comment:[{type:ObjectId,ref:'comment'}],
		//记录
	meta: {
		//创建时间
		createTime: {
			type: Date,
			default: Date.now
		},
		//更新时间
		updateTime: {
			type: Date,
			default: Date.now
		}
	}
}
comment{
	content: String,
	//电影ID
	video: {		
		type: ObjectId,
		ref: 'video'
	},
	//发送人ID
	from: {		type: ObjectId,
		ref: 'User'
	},
	reply:[{
		from: {
			type: ObjectId,
			ref: 'User'
		},
		to: {
			type: ObjectId,
			ref: 'User'
		},
		content: String,
	}],
	
	meta: {
		//创建时间
		createTime: {
			type: Date,
			default: Date.now
		},
		//更新时间
		updateTime: {
			type: Date,
			default: Date.now
		}
	}
};
video={
	id,
	name,
	category,//广告，教育，记录，微笑
	durations,//时长
	poster,//海报
	summary,//简介
	flash,//影片链接
	release_date,//收录时间
	comment_count,//评论人数
	collect_count,//收藏人数
	good_count,//点赞数
	producer:{type: ObjectId,	ref: 'video'},//出品商id
		//记录
	meta: {
		//创建时间
		createTime: {
			type: Date,
			default: Date.now
		},
		//更新时间
		updateTime: {
			type: Date,
			default: Date.now
		}
	}
}
category={
	id,
	name: String,
  video: [{type: ObjectId, ref: 'Movie'}],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
}
manager={}
```