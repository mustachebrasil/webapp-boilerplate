//Check App is defined
if(!App){ var App;}

App = new (function(window, document){
	var self = this
		,	scripts = []
		,	stylesheets = [];

	this.controller = {};
	this.view = {};
	this.model = {};

	this.load = function(){
		//URL of All Need Resources for start the Web App
		
		//	Scripts
		//

		scripts.push("/js/libs/jquery/onhashchange_plugin.js");				//Jquery Plugin (hashchange)
		scripts.push("/js/libs/handlebars/handlebars.js");						//HandleBars (Default Template Engine)
		//scripts.push("/js/libs/ejs/ejs_production.js");							//EJS (Template Engine)
		scripts.push("/js/libs/bootstrap/bootstrap.min.js");					//Boostrap

		//
		//	Web App
		//

		//Config
		scripts.push("/js/app/config.js");

		//Models

		//Views

		//Controllers
		scripts.push("/js/app/controllers/main.js");
		scripts.push("/js/app/controllers/user.js");
		scripts.push("/js/app/controllers/login.js");
		
		//Router
		scripts.push("/js/app/router.js");


		//	Stylesheets
		//
		stylesheets.push("/css/bootstrap/bootstrap.min.css");							//Bootstrap
		stylesheets.push("/css/bootstrap/bootstrap-responsive.min.css");	//Bootstrap Responsive
		stylesheets.push("/css/fontawesome/font-awesome.min.css");				//Font Awesome
		stylesheets.push("/css/fontawesome/font-awesome-ie7.min.css");		//Font Awesome for ie7

		// * loadScripts will be invoked after this function
		loadStylesheets(stylesheets, stylesheets.length); 
	}


	function loadScripts(scripts, length){
		if(scripts.length === length) scripts.reverse();
		if(scripts.length < 1) return;
		var script = scripts[scripts.length - 1];
		loadScript(script, scripts, length);		
	}

	function loadScript(url, scripts, length){
		$.get(url, function(res){
			var s = document.createElement('script');
			s.innerHTML = res;
			document.head.appendChild(s);
			console.log("Loaded script, from: " + scripts.pop());
			loadScripts(scripts, length);
		});
	}

	function loadStylesheets(stylesheets, length){
		if(stylesheets.length === length) stylesheets.reverse();
		if(stylesheets.length === 0) loadScripts(scripts, scripts.length);	//invoke loadScripts()
		if(stylesheets.length < 1) return;
		var stylesheet = stylesheets[stylesheets.length -1];
		loadStylesheet(stylesheet, stylesheets, length);
	}

	function loadStylesheet(url, stylesheets, length){
		$.get(url, function(res){
			var s = document.createElement("style");
			s.innerHTML = res;
			document.head.appendChild(s);
			console.log("Loaded stylesheet, from: " + stylesheets.pop());
			loadStylesheets(stylesheets, length);
		});
	}


	//Listeners
	document.addEventListener('DOMContentLoaded', self.load, false);

	return(this);
})(window, document);
