module.exports = {
	path: "/select",
	getComponent(nextState, cb) {
		require.ensure([], function(require) {
			cb(null, require('./components/PageSelect'))
		})
	}
};
