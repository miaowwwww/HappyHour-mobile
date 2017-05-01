import React, { Component, PropTypes} from 'react';

import History from '../store/history.js';

export default class Link extends Component {
	static DefaultProps = {
		to: PropTypes.string.isRequired
	}
	handleTouchEnd = () => {
		History.push({pathname: this.props.to});
		this.forceUpdate();
	}
	render() {
		const {activeClassName, to, ...other} = this.props;
		if(activeClassName && to === History.getCurrentLocation().pathname) {
			if(other.className) {
				other.className += ` ${activeClassName}`;
			}else{
				other.className = activeClassName;
			}
		};
		return (
			<a onTouchEnd={this.handleTouchEnd} {...other}>
				{this.props.children}
			</a>
		)
	}
}

