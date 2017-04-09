import PageSelect from '../components/PageSelect';
import { connect } from 'react-redux';
import {getList} from 'actions/videos.js';

function mapStateToProps(state) {
	return {
		videos: state.getIn(['videos','list'])
	}
}
function mapDispatchToProps(dispatch) {
	return {
		getList: () => dispatch(getList())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PageSelect);
