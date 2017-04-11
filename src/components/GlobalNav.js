import React, { PureComponent, Component, PropTypes } from 'react';

import Link from './Link.js';

import '../css/GlobalNav.less';

export default class GlobalNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='GlobalNav' >
				<Link to={`/select`} activeClassName='GlobalNav-active-link' >精选</Link>
				<Link to={`/found`} activeClassName='GlobalNav-active-link' >发现</Link>
				<Link to={`/follow`} activeClassName='GlobalNav-active-link' >关注</Link>
				<Link to={`/my`} activeClassName='GlobalNav-active-link' >我的</Link>
			</div>
		)
	}
}
