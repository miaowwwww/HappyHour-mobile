import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import "../css/UserItem.less";
import utils from '../api/utils';

export default class UserItem extends Component {
	render() {
		const { user, className } = this.props;
		return (
			<div className={`UserItem ${className}`}>
				<Link to={`/person/${user._id}`}>
					<img src={utils.header(user.header)} className="UserItem-left-img" />
				</Link>
				<div className="UserItem-center">
					<h1>{user.name}</h1>
					<p>{user.summary}</p>
				</div>
				<i className="iconfont icon-xiayibu"></i>
			</div>
		)
	}
}

