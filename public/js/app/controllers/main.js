App.controller.main = new (function(){

	this.index = function(){
		Handlebars.registerHelper('link_to', function(context) { return "<a href='" + context.url + "'>" + context.body + "</a>"; });
		var data = { posts: [{url: "/", body: "Hello World!"}] };
		App.handlebars.load_template('/js/app/views/index.hbs', data, $('.page')[0]);
		
	}

	return(this);
})();