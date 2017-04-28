import { 
	VIDEO_REQUESTPOST, 
	VIDEO_REQUESTSUCCESS, 
	VIDEO_REQUESTERROR,
	QUERYVIDEOSING,
	QUERYVIDEOSEND,
	QUERYVIDEOSERROR
} from '../actions/videos.js';

const initialState = {
	list: [],
	isFetching: false,
	lastFecthingTime: '',
	requestErrorMsg: ''
};

export default function videoReducer(state = initialState, action) {
	switch (action.type) {
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

		default:
			return state;
	}
}