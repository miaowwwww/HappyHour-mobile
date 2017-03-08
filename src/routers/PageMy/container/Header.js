import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleLoginView } from '../../../actions/index'; 


const mapStateToProps = (state, ownProps) => {
	return {
		username: state.myPage.username
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleLoginView: () => {
    dispatch(toggleLoginView())
  }
})


export default connect(
	mapStateToProps,
  mapDispatchToProps
)(Header);
