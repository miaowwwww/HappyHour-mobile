const User = require('./user.js');

module.exports = function(app) {
	app.use(User.routes(), User.allowedMethods());
}