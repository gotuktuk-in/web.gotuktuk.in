/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
*/

(function( $ ){
	 
		 
 $.fn.scrollPagination = function(options) {

		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = obj; 
	 	}
		opts.scrollTarget = target;
	 
		return this.each(function() {
		  $.fn.scrollPagination.init($(this), opts);
		});

  };
  
  $.fn.stopScrollPagination = function(){
	  return this.each(function() {
	 	$(this).attr('scrollPagination', 'disabled');
	  });
	  
  };
  
  $.fn.scrollPagination.loadContent = function(obj, opts){
	  var books = [
		  { title: "ASP.NET 4 Unleashed", price: 37.79, picture: "AspNet4Unleashed.jpg" },
		  { title: "ASP.NET MVC Unleashed", price: 44.99, picture: "AspNetMvcUnleashed.jpg" },
		  { title: "ASP.NET Kick Start", price: 4.00, picture: "AspNetKickStart.jpg" },
		  { title: "ASP.NET MVC Unleashed iPhone", price: 44.99, picture: "AspNetMvcUnleashedIPhone.jpg" },
	  ];
	 var target = opts.scrollTarget;
	 var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(document).height() - $(target).height();
	 if (mayLoadContent){
		 if (opts.beforeLoad != null){
			opts.beforeLoad(); 
		 }
		 $(obj).children().attr('rel', 'loaded');
		 $.ajax({
			  type: 'GET',
			  headers:{
				  'Authorization':"Basic eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNGVTUWtMVGNnIiwicm9sZSI6ImRyaXZlciIsInBob25lIjoiKzkxODg4OTQ0NDQyMiIsInZ0IjoiYmlrZSIsImlhdCI6MTQ1OTc2NzU4NSwiZXhwIjoxNDYwMTI3NTg1LCJ0eXBlIjoiYmlrZSJ9.XmIuVeQ8I2EwNFn4QRhhIhfG754AR_EBmJBGf1jfieo",
				  'content-type':'application/json'
			  },
			  url: opts.contentPage,
			  data: opts.contentData,
			  success: function(data){
				//$(obj).append(data);
				  var newData =JSON.parse(data)
				  $("#tCashTemplate").tmpl(newData).appendTo("#content");
				var objectsRendered = $(obj).children('[rel!=loaded]');
				
				if (opts.afterLoad != null){
					opts.afterLoad(objectsRendered);	
				}
			  },
			  dataType: 'html'
		 });
	 }
	 
  };
  
  $.fn.scrollPagination.init = function(obj, opts){
	 var target = opts.scrollTarget;
	 $(obj).attr('scrollPagination', 'enabled');
	
	 $(target).scroll(function(event){
		if ($(obj).attr('scrollPagination') == 'enabled'){
	 		$.fn.scrollPagination.loadContent(obj, opts);		
		}
		else {
			event.stopPropagation();	
		}
	 });
	 
	 $.fn.scrollPagination.loadContent(obj, opts);
	 
 };
	
 $.fn.scrollPagination.defaults = {
      	 'contentPage' : null,
     	 'contentData' : {},
		 'beforeLoad': null,
		 'afterLoad': null	,
		 'scrollTarget': null,
		 'heightOffset': 0		  
 };	
})( jQuery );
function formattedDate(date) {
	var d = new Date(date*1000 || Date.now()),
		month = '' + GetMonthName((d.getMonth() + 1)),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
}

function GetMonthName(monthNumber) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return months[monthNumber - 1];
}