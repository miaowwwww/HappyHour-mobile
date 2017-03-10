import PageSelect from '../components/PageSelect';
import { connect } from 'react-redux';
import {getList} from 'actions/videos.js';

function mapStateToProps(state) {
	console.log('22222',state.getIn(['videos','list']).toJS())
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