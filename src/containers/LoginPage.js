import LoginPage from 'components/Loginpage.js';
import { connect } from 'react-redux';

import { login } from '../actions/user.js';

function mapStateToProps(state) {
	return {
		user: state.user
	}
}
function mapDispatchToProps(dispatch) {
	return {
		onSubmit: (user) => {
			dispatch(login(user));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);