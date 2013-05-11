//
//	Handlebars(tool)
//
if(App){
	App.handlebars = {
		load_template: function (url, data, element, callback){
			$.get(url, function(res){
				var template = Handlebars.compile(res);
				
				$(element).children().remove();
				$(element).append(template(data));

				if(typeof(callback) === "function") return(callback(template));
			});
		}
	};
}