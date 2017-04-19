import React, {PropTypes} from 'react';

export default class Options extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<dl className='Options' >
					<dt>我的消息</dt>
					<dt>我的关注</dt>
					<dt>我的缓存</dt>
					<dt>功能开关</dt>
				</dl>
		)
	}
}

