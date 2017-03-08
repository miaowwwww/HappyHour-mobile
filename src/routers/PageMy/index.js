module.exports = {
	path: "/my",
	getComponent(nextState, cb) {
		require.ensure([], function(require) {
			cb(null, require('./components/PageMy'))
		})
	}
};