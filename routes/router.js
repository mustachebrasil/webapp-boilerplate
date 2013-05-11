var router = {
		main: require("../routes/index"),
		users: require("../routes/users")
	};

function parse(app){
	app.get('/', router.main.index);

	//Users
	app.post("/users", router.users.create);
	app.get("/users/:user", router.users.show);
	app.put("/users/:user", router.users.auth, router.users.update);
	app.del("/users/:user", router.users.auth, router.users.remove);

	app.get("/login", router.users.login);
	app.post("/logout", router.users.logout);
}
exports.parse = parse;