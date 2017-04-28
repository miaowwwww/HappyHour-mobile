// import { combineReducers } from 'redux-immutablejs';
import { combineReducers } from 'redux';
import user from './user.js';
import videos from './videos.js';


const rootReducers = combineReducers({
	user,
	videos
})

export default rootReducers;