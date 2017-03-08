import React, { PropTypes } from 'react';
import Login from 'components/Login.js';
import {browserHistory} from 'react-router';

import style from './PageMy.less';
class Header extends React.Component {

	constructor(props, context) {
		super(props);
		this.state = {};
	}

	handleClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		browserHistory.push('login');
		
		// Login.show()
		// 	.then((data) => {
		// 		console.log(data);
		// 		this.setState({name: data.account})
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	})
	}

	render() {
		return (
				<header id={style.myHeader}>
					<i className={style.icon} >☺</i>
					<img onClick={this.handleClick} />
					<p>{this.state.name || '点击登陆后可评论'}</p>
					<ul>
						<li><i>♥</i>我的收藏</li>
						<li><i>✉</i>我的评论</li>
					</ul>
				</header>
		)
	}
};


export default Header;