import { combineReducers } from 'redux-immutablejs';
import user from './user.js';



const rootReducers = combineReducers({
	user
})

export default rootReducers;