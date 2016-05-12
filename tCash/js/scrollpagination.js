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
	  console.log(opts.contentData.start,' ', opts.contentData.end)
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
                  'Authorization':"Basic " + token,
				  'content-type':'application/json'
			  },

			  url: opts.contentPage,
             data: { 'start': start, 'end': end },
			  success: function(data){
				  var newData =JSON.parse(data)
				  //var newData = [{"date":1461063365,"userId":"dEl8xXfDRe","name":"Branch 6","tCash":130,"type":"debit","action":"first_trip","actionDetail":"first_trip action tcash for - rVe_3agkeZ to dEl8xXfDRe"},{"date":1461063321,"userId":"dEl8xXfDRe","name":"Branch 6","tCash":20,"type":"credit","action":"rider_init","actionDetail":"rider_init action tcash for - rVe_3agkeZ to dEl8xXfDRe"},{"date":1461055316,"userId":"dEl8xXfDRe","name":"B Branch Rider","tCash":30,"type":"credit","action":"first_trip","actionDetail":"first_trip action tcash for - rElhn6AAkb to dEl8xXfDRe"},{"date":1461055133,"userId":"dEl8xXfDRe","name":"B Branch Rider","tCash":20,"type":"credit","action":"rider_init","actionDetail":"rider_init action tcash for - rElhn6AAkb to dEl8xXfDRe"}]

				  if((newData.length>0))
				  {
					  $("#w").show();
					  $("#w #tHead").text(newData.left);
					  $("#empty").hide();
				  }

				  $("#tCashTemplate").tmpl(newData).appendTo("#content");
				var objectsRendered = $(obj).children('[rel!=loaded]');


                  if (newData.length < 10){
                      // if more than 140 results already loaded, then stop pagination
                      $('#nomoreresults').fadeIn();
                      $('#content').stopScrollPagination();
                  }

				if (opts.afterLoad != null){
					opts.afterLoad(objectsRendered);
				}
			  },
             error:function(data){
                 $('#error').show();
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
			console.log("on scroll ", start," ",  end)
			if  ($(target).scrollTop() == $(document).height() - $(target).height()){
				$.fn.scrollPagination.loadContent(obj, opts);
				//page++;
                start+=10;
                end+=10;
			}
	 		//$.fn.scrollPagination.loadContent(obj, opts);
		}
		else {
			event.stopPropagation();
		}
	 });

	 $.fn.scrollPagination.loadContent(obj, opts);

 };

 $.fn.scrollPagination.defaults = {
      	 'contentPage' : null,
     	 'contentData' : {start:0,end:10},
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
