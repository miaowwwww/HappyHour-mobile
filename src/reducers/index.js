// import { combineReducers } from 'redux-immutablejs';
import { combineReducers } from 'redux';
import user from './user.js';
import videos from './videos.js';
import comment from './comment.js';

const rootReducers = combineReducers({
	user,
	videos,
	comment
})

export default rootReducers;