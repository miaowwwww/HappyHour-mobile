import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducers from './reducers/index.js';



export default function configureStore(preloadedState) {
	return createStore(
		rootReducers,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			createLogger()
		)
	)
}