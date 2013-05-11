if(!App.router){

	App.router = (function(){
		var self = this;

		this.route = function(e){
			var pathname = location.pathname
				,	hash 		 = location.hash.replace('#','')
				,	regex;

			console.log("Loading ", hash);

			//	Routes
			//

			//Index
			regex = /\/index/;
			if(regex.test(hash) === true){ App.controller.main.index(); return;}

			//Login
			regex = /\/login/;
			if(regex.test(hash) === true){ App.controller.main.login(); return;}

		}

		addHashChange(self.route);
		
		return(this);
	})();


	if(window.location.hash.length === 0)	$(function(){window.location.hash = "#/index";});			 			//Call App.router.route when init app
	else if(window.location.hash.length > 0)	$(function(){ self.route(); });													//Call self.router when reload page
}	