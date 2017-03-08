import { connect } from 'react-redux';
import Options from '../components/Options';
import { addOption } from '../../../actions/index'; 


const mapStateToProps = (state, ownProps) => {
  return {
    options: state.myPage.options
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addOption: (option) => {
    dispatch(addOption(option))
  }
})

const VisitableOptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Options)

export default VisitableOptions;
