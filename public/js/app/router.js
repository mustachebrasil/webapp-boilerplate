App.router = new (function(){
	//Check Dependecies
	if(!window.addHashChange) window.location.reload();
	if(!window.$) window.location.reload();

	var self = this;

	this.router = function(e){
		var pathname = location.pathname
			,	hash 		 = location.hash.replace('#','')
			,	regex;

		
		//	Routes
		//

		//Index
		regex = /\/index/;
		if(regex.test(hash) === true) App.controller.main.index();
	}

	//Listeners
	addHashChange(self.router);

	//Call self.router when reload page
	if(window.location.hash.length > 0)	$(function(){ self.router(); });

	return(this);
})();