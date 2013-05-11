App.controller.user = new (function(){
	
	var self = this
		,	authResponse
		,	callbacks = {
				when_logged: [],
				when_logged_out: [],
				when_auth_success: []
		};

	this.getAuthResponse = function(){
		return(authResponse);
	}

	this.login = function(data, cbSuccess, cbError){
		$.ajax({
			type: "GET",
			url: "/login",
			data: data,
			success: function(res){
				authResponse = res;
				if(typeof(cbSuccess) === "function") cbSuccess(res);
				
				callbacks.when_auth_success.reverse();
				while(callbacks.when_auth_success.length > 0){
					var cb = callbacks.when_auth_success.pop();
					callbacks.when_logged.push(cb);	
				}
				
			},
			error: function(res){
				if(typeof(cbError) === "function") cbError(res);
			}
		});

		return(self);
	}


	this.logout = function(cbSuccess, cbError){
		$.ajax({
			type: "POST",
			url: "/logout",
			data: authResponse,
			success: function(res){
				authResponse = null;
				if(typeof(cbSuccess) === "function") cbSuccess(res);
				//authEventsObserver();
			},
			error: function(res){
				if(typeof(cbError) === "function") cbError(res);
			}
		});

		return(self);
	}

	this.signup = function(data, cbSuccess, cbError){
		$.ajax({
			type: "POST",
			url: "/users",
			data: data,
			success: function(res){
				authResponse = res;
				if(typeof(cbSuccess) === "function") cbSuccess(res);
				
				callbacks.when_auth_success.reverse();
				while(callbacks.when_auth_success.length > 0){
					var cb = callbacks.when_auth_success.pop();
					callbacks.when_logged.push(cb);	
				}

			},
			error: function(res){
				if(typeof(cbError) === "function") cbError(res);
			}
		});

		return(self);
	}


	this.logged = function(){
		var token = authResponse && authResponse.token;
		if(token !== null) return(true);
		if(token === null) return(false);
	}


	this.disconnected = function(callback){
		if(typeof(callback) !== "function") return;
		callbacks.when_logged_out.push(callback);
	}

	this.connected = function(callback){
		if(typeof(callback) !== "function") return;
		callbacks.when_logged.push(callback);
	}

	this.done = function(callback){
		if(typeof(callback) !== "function") return;
		callbacks.when_auth_success.push(callback);
	}

	//Observer (login/logout)
	function authEventsObserver(){
		var token = authResponse && authResponse.token;
		var	callback;

		if(token !== null){
			callbacks.when_logged.reverse();
			while(callbacks.when_logged.length > 0){
				callback = callbacks.when_logged.pop();
				callback(authResponse);
			}
		}

		if(token === null){
			callbacks.when_logged_out.reverse();
			while(callbacks.when_logged_out.length > 0){
				callback = callbacks.when_logged_out.pop();
				callback(authResponse); 
			}
		}
	}

	setInterval(authEventsObserver, 100);

	return(this);
});