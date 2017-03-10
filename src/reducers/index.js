import { combineReducers } from 'redux-immutablejs';
import user from './user.js';
import videos from './videos.js';


const rootReducers = combineReducers({
	user,
	videos
})

export default rootReducers;