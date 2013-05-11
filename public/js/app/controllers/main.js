App.controller.main = new (function(){

	this.index = function(){
		var data = {};
		App.handlebars.load_template('/js/app/views/index.hbs', data, $('.page')[0]);
	}

	this.login = function(){
		var data = {};
		App.handlebars.load_template('/js/app/views/login.hbs', data, $('.page')[0]);
	}

	this.renderUserInfo = function(response){
  	if(!response || response === null) return;
    
    $(".avatar-name").attr('href', '#/dashboard');
    $(".avatar-name").text(response.username);

    $("#start-btn").attr('href', "#/dashboard");
    
  }

	return(this);
})();