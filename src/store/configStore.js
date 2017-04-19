import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'; //开发版要去掉的

import rootReducers from '../reducers/index.js';

export default function configStore(preloadedState) {
	return createStore(
		rootReducers,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			createLogger()
		)
	)
}