import React from 'react';

import GlobalNav from './GlobalNav.js';
import '../css/App.less';
export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='App' >
				<div className='App-content'>{this.props.children}</div>
				<GlobalNav />
			</div>
		)
	}
}