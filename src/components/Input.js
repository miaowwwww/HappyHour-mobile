import React, { PureComponent, PropTypes} from 'react';

export default class Input extends PureComponent {
	static defaultProps = {
		ref: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		defaultValue: PropTypes.string,
		pattern: PropTypes.string,
		value: PropTypes.string
	}

	handleChange = (e) => {
		this.refs.ref.value = e.target.value;
	}

	render() {
		return (
			<input ref={} {...this.props} />
		)
	}
}

