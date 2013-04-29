//Check App is defined
if(!App) var App;

App = new (function(window, document){
	var self = this;

	this.controller = {};
	this.view = {};
	this.model = {};
	this.router;

	//hack for handlebars
	this.handlebars;

	this.checkAllResourcesLoaded = function(event){
		//Check All Resources Loaded
		self.resources_length -= 1;
		if(self.resources_length > 0) return;

		self.start();
	}

	this.load = function(){
		//URL of All Need Resources for start the Web App
		
		//Scripts
		var scripts = [];
		
		//Libs
		scripts.push("/js/libs/jquery/jquery-2.0.0.min.js");					//Jquery
		scripts.push("/js/libs/jquery/onhashchange_plugin.js");				//Jquery Plugin (hashchange)
		scripts.push("/js/libs/handlebars/handlebars.js");						//HandleBars (Default Template Engine)
		//scripts.push("/js/libs/ejs/ejs_production.js");							//EJS (Template Engine)

		//
		//	Web App
		//

		//Config
		scripts.push("/js/app/config.js");

		//Models

		//Views

		//Controllers
		scripts.push("/js/app/controllers/main.js");
		
		//Router
		scripts.push("/js/app/router.js");



		//Stylesheets
		var stylesheets = [];

		//Libs
		stylesheets.push("/css/bootstrap/bootstrap.min.css");							//Bootstrap
		stylesheets.push("/css/bootstrap/bootstrap-responsive.min.css");	//Bootstrap Responsive
		stylesheets.push("/css/fontawesome/font-awesome.min.css");				//Font Awesome
		stylesheets.push("/css/fontawesome/font-awesome-ie7.min.css");		//Font Awesome for ie7


		self.resources_length = scripts.length + stylesheets.length;

		for(i in stylesheets){
			var t = document.createElement('link');
			t.href = stylesheets[i];
			t.rel = "stylesheet";
			t.onload = self.checkAllResourcesLoaded;
			document.head.appendChild(t);
		}

		for(i in scripts){
			var s = document.createElement('script');
			s.src = scripts[i];
			s.onload = self.checkAllResourcesLoaded;
			document.head.appendChild(s);
		}

	}

	this.start = function(){
		if(window.location.hash.length === 0)	location.hash = "#/index";
	}

	//Listeners
	document.addEventListener('DOMContentLoaded', self.load, false);

	return(this);
})(window, document);
