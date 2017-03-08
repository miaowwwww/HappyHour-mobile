import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';

import style from './GlobalNav.less';

export default class GlobalNav extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className={style.nav} >
				<Link to={`/select`} activeClassName={style.activeTab} >精选</Link>
				<Link to={`/found`} activeClassName={style.activeTab} >发现</Link>
				<Link to={`/follow`} activeClassName={style.activeTab} >关注</Link>
				<Link to={`/my`} activeClassName={style.activeTab} >我的</Link>
			</div>
		)
	}
}
GlobalNav.contextType = {
	router: PropTypes.object,
	route: PropTypes.object,
	location: PropTypes.object
}