import React, {PropTypes} from 'react';
import style from './PageMy.less';

class Options extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleClick = (e) => {
		if(e.which === 13 && e.target.value) {
			const { addOption } = this.props;
			addOption(e.target.value);
			e.target.value = '';
		}
	}
	render() {

		return (
				<dl id={style.myList}>
					<dt>我的消息</dt>
					<dt>我的关注</dt>
					<dt>我的缓存</dt>
					<dt>功能开关</dt>
				</dl>
		)
	}
}

export default Options;
