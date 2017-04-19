import Immutable from 'immutable';
import { VIDEO_REQUESTPOST, VIDEO_REQUESTSUCCESS, VIDEO_REQUESTERROR } from '../actions/videos.js';

const initialState = Immutable.Map({
	list: Immutable.List(),
	isFetching: false,
	lastFecthingTime: '',
	requestErrorMsg: ''
});

export default function videoReducer(state = initialState, action) {
	switch (action.type) {
		case VIDEO_REQUESTPOST:
			return state.set('isFetching', true);

		case VIDEO_REQUESTSUCCESS:
			return state.merge({
				isFetching: false,
				lastFecthingTime: new Date(),
			}).updateIn(['list'], list => list.concat(action.videos));

		case VIDEO_REQUESTERROR:
			return state.merge({requestErrorMsg: '网络 错误', isFetching: false});

		default:
			return state;
	}
}