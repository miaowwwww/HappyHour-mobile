module.exports = {
	path: "/follow",
	getComponent(nextState, cb) {
		require.ensure([], function(require) {
			cb(null, require('./components/PageFollow'))
		})
	}
};

