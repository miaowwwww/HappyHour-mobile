module.exports = {
	path: "/found",
	getComponent(nextState, cb) {
		require.ensure([], function(require) {
			cb(null, require('./components/PageFound'))
		})
	}
};