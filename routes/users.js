// User controller
var controller = {
	user: require("../controllers/users")
};


function create(req, res){
	controller.user.create(req, res);
}
exports.create = create;


function show(req, res){
	controller.user.show(req, res);
}
exports.show = show;


function update(req, res){
	controller.user.update(req, res);
}
exports.update = update;


function remove(req, res){
	controller.user.remove(req, res);
}
exports.remove = remove;


// Authentication
function login(req, res){
	controller.user.login(req, res);
}
exports.login = login;


function logout(req, res){
	controller.user.logout(req, res);
}
exports.logout = logout;


function auth(req, res, next){
	controller.user.auth(req, res, next);
}
exports.auth = auth;