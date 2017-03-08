import React from 'react';

import GlobalNav from './GlobalNav.js';
import style from './App.less';
export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id={style.app} >
				<div className={style.content}>{this.props.children}</div>
				<GlobalNav />
			</div>
		)
	}
}