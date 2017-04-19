import React, {cloneElement} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import GlobalNav from './GlobalNav.js';
import '../css/App.less';
export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='App' >
				<CSSTransitionGroup
					component='div'
					className="App-content"
					transitionName={{
						enter: 'animate-from-right',
						leave: 'animate-to-left'
					}}
					transitionEnterTimeout={200}
					transitionLeaveTimeout={200}
				>
				{cloneElement(this.props.children, {key:this.props.location.pathname})}
				</CSSTransitionGroup>
				<GlobalNav />
			</div>
		)
	}
}