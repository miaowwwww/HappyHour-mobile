import React, { PureComponent, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import style from './GlobalNav.less';

export default class GlobalNav extends PureComponent {
	constructor(props) {
		super(props);
	}
	handleTouch = () => {
		console.log(browserHistory)
		browserHistory.push({pathname:`/my`})
	}

	render() {

		return (
			<div className={style.nav} >
				<Link to={`/select`} activeClassName={style.activeTab} >精选</Link>
				<Link to={`/found`} activeClassName={style.activeTab} >发现</Link>
				<Link to={`/follow`} activeClassName={style.activeTab} >关注</Link>
				<Link to={`/my`} activeClassName={style.activeTab} >我的</Link>
				<a onTouchEnd={this.handleTouch} >我的</a>
			</div>
		)
	}
}
GlobalNav.contextType = {
	router: PropTypes.object,
	route: PropTypes.object,
	location: PropTypes.object
}