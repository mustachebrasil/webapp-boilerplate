App.controller.login = new (function(){
	
	this.renderUserInfo = function(response){
    if(!response || response === null) return;
    
		$(".avatar-name").attr('href', '#/dashboard');
    $(".avatar-name").text(response.username); 
	}

  this.renderUserDisconnected = function(response){
    $(".avatar-mini").children().remove();
    $(".avatar-min").append('<a href="#/login"><i class="icon-user"></i></a>');

    $(".avatar-name").attr('href',"#/login");
    $(".avatar-name").text("Login");
  }


	this.skipToDashboard = function(response){
  	window.location.hash="#/dashboard";
	}


  this.signin = function(){
    App.controller.user.login({
      username: $(".form-signin input[name=\"username\"]").val(),
      password: $(".form-signin input[name=\"password\"]").val()
    }, signinSuccess, signinError);

    function signinSuccess(res){
      App.controller.login.skipToDashboard();
    }

    function signinError(res){
      $("#signin-alert").show();
    }
  }


  this.signup = function(){
    App.controller.user.signup({
      username: $(".form-signup input[name=\"username\"]").val(),
      password: $(".form-signup input[name=\"password\"]").val()
    }, signupSuccess, signupError);

    function signupSuccess(res){
      App.controller.login.skipToDashboard();
    }

    function signupError(res){
      $("#signup-alert").show();
    }    
  }


  this.logout = function(callback){

  }

	return(this);
})();