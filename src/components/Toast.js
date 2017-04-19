import React, { PureComponent, PropTypes } from 'react';
import Model from './Model.js';
import '../css/Toast.less';

export default class Toast extends Model {
	constructor(props) {
		super(props);
		this.timer = '';
	}

	static defaultProps = {
		time: 1000
	}
	static PropTypes = {
		text: PropTypes.string.isRequired,
		time: PropTypes.number
	}

	componentDidMount() {
		this.timer = setTimeout(() => {
			this._removeView();
		}, this.props.time);
	}

	render() {
		return (
			<div className="Toast">
				<p>{this.props.text}</p>
			</div>
		)
	}
}