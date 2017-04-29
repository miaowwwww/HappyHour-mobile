import { 
	VIDEO_REQUESTPOST, 
	VIDEO_REQUESTSUCCESS, 
	VIDEO_REQUESTERROR,
	QUERYVIDEOSING,
	QUERYVIDEOSEND,
	QUERYVIDEOSERROR,
	GOODVIDEOBEGIN,
	GOODVIDEOEND,
	GOODVIDEOERROR
} from '../actions/videos.js';

const initialState = {
	list: [],
	isFetching: false,
	lastFecthingTime: '',
	requestErrorMsg: ''
};

export default function video(state = initialState, action) {
	switch (action.type) {
		/* 获取列表 */
		case QUERYVIDEOSING:
			return {...state, isFetching: true};
		case QUERYVIDEOSEND:
			return {
				...state,
				isFetching: false,
				lastFecthingTime: new Date(),
				list: state.list.concat(action.list)
			};
		case QUERYVIDEOSERROR:
			return {...state, requestErrorMsg: '网络 错误', isFetching: false};
		
		/* 点赞视频 */
		case GOODVIDEOBEGIN: 
			return state;
		case GOODVIDEOEND:
			return {
				...state,
				list: state.list.map(item => {
					if(item._id === action.videoId) {
						return {...item, goodCount: item.goodCount++}
					}
					return item;
				})
			};
			return 
		case GOODVIDEOERROR:
			return {...state, requestErrorMsg: '网络 错误', isFetching: false};
		
		default:
			return state;
	}
}