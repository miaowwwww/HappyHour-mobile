// import { combineReducers } from 'redux-immutablejs';
import { combineReducers } from 'redux';
import user from './user.js';
import videos from './videos.js';
import comment from './comment.js';
import person from './person.js';

const rootReducers = combineReducers({
	user,
	videos,
	comment,
	person,
})

export default rootReducers;