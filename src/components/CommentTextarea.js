import React, { PureComponent, Component, PropTypes } from 'react';
import { TextareaItem } from 'antd-mobile';
import '../css/CommentTextarea.less';
import Model from './Model.js';

import _history from '../store/history.js';

export default class CommentTextarea extends Model {
	constructor(props) {
		super(props);
		this.state = {text: ''};
	}


	componentDidMount() {
		window.addEventListener('hashchange', this.handleHide);
	}

	componentWillUnmount() {
		window.removeEventListener('hashchange', this.handleHide)
	}

	handleChange = (value) => {
		this.setState({text: value})
	}

	handleSend = () => {
		const {text} = this.state;
		if(!text) { return; }
		this._resolveView(this.state.text);
	}
	handleHide = () => {
		this._resolveView();
	}

	render() {
		return (
			<div className='CommentTextarea mask' >
				<div className="top" onClick={this.handleHide}></div>
				<div className="TextWrap">
					<TextareaItem
						count={140}
						rows={3}
						onChange={this.handleChange}
						value={this.state.text} 
						placeholder='说点什么...'/>
					<a onClick={this.handleSend}>发送</a>
				</div>
			</div>
		)
	}
}
