// Crypto
var CryptoJS = require("crypto-js");

// User model
var model = {
	user: require("../models/users")
};


function create(req, res){
	//Check Parameters
	if((!req.body.username) || (!req.body.password)){ 
		res.send(400, "username and password is required");
		return;
	}


	//Check an user with same username
	model.user.findOne({username: req.body.username}).exec(function(err, user){
		if(err){res.send(500); return; }
		if(user || user !== null){res.send(403, "user already exists"); return; }
	
		var passwordHash = CryptoJS.HmacSHA512(req.body.password, "zykdrajstka").toString()
			,	token 			 = CryptoJS.HmacSHA1(Date.now().toString(), "rakmiahtktsuru").toString()
			,	query = { username: req.body.username, password: passwordHash, token: token }
			,	user = new model.user(query);

		user.save(createUser);

		function createUser(err, user){
			if(err){ res.send(500); return; }
			res.json({username: user.username, token: user.token});
		}
	});

}
exports.create = create;


function show(req, res){
	var username = req.params.user;
	model.user.findOne({username: username}).select("-password -token").exec(showUser);

	function showUser(err, user){
		if(err){ res.send(500); return; }
		if(user === null){ res.send(404); return;}
		res.json(user);
	}
}
exports.show = show;


function update(req, res){
	//Check Parameters
	if(req.body.username){ res.send(400, "Cannot update \"username\""); return; }
	if(req.body.token){ res.send(400, "Cannot update \"token\""); return; }

	var username = req.params.user;
	model.user.findOneAndUpdate({username: username}, req.body).exec(updateUser);

	function updateUser(err, user){
		if(err){ res.send(500); return; }
		if(user === null){ res.send(404); return;}
		res.send(200);
	}	
}
exports.update = update;


function remove(req, res){
	var username = req.params.user;
	model.user.findOneAndRemove({username: username}).exec(removeUser);

	function removeUser(err, user){
		if(err){ res.send(500); return; }
		//if(user === null){ res.send(200); return;}
		res.send(200);
	}
}
exports.remove = remove;


/*
 * 		Authentication
 */

function login(req, res){
	//Check Parameters
	if((!req.query.username) || (!req.query.password)){ 
		res.send(403, "username and password is required");
		return;
	}

	var passwordHash = CryptoJS.HmacSHA512(req.query.password, "zykdrajstka").toString()
		,	token 			 = CryptoJS.HmacSHA1(Date.now().toString(), "rakmiahtktsuru").toString()
		, query 			 = { username: req.query.username, password: passwordHash };

	model.user.findOneAndUpdate(query, {token: token}).select("-password").exec(loginUser);

	function loginUser(err, user){
		if(err){ res.send(500); return; }
		if(user === null){ res.send(403); return;}
		res.json(user);
	}
}
exports.login = login;


function logout(req, res){
	//Check parameters
	if((!req.body.username) || (!req.body.token)){
		res.send(400, "username and token is required");
		return;
	}

	model.user.findOneAndUpdate({
		username: req.body.username,
		token: req.body.token
	}, {token: ""}).exec(logoutUser);

	function logoutUser(err, user){
		if(err){ res.send(500); return; }
		if(user === null){ res.send(403); return;}
		res.send(200);
	}	
}
exports.logout = logout;


function auth(req, res, next){
	console.log(req.body);

	//Check Parameters
	var isValidate = true;
	if((!req.body.username) || (!req.body.token)){
		res.send(403, "username and token is required 1");
		isValidate = false;
	}
	if(((!req.query.username) || (!req.query.token)) && isValidate === false){
		res.send(403, "username and token is required 2");
		return;
	}

	if(!req.body.username){
		var data = { 
			username: req.query.username,
			token: req.query.token 
		};
	}else{
		var data = {
			username: req.body.username,
			token: req.body.token 
		};
	}

	model.user.findOne(data).exec(authUser);

	function authUser(err, user){
		if(err){res.send(500); return;}
		if(user === null){res.send(403, "Session Expired"); return;}
		next();
	}
}
exports.auth = auth;