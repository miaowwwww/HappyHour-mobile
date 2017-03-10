// module.exports = {
// 	path: "/select",
// 	getComponent(nextState, cb) {
// 		require.ensure([], function(require) {
// 			cb(null, require('./components/PageSelect'))
// 		})
// 	}
// };
import PageSelect from './containers/pageSelect.js';
export default PageSelect;