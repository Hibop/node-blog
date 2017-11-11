$(document).ready(function(){
  var selectCategory = $('#js-category');
  var selectAuthor = $('#js-author');
  // 列表筛选事件
  $('#js-filter-submit').on('click', function () {
  	
  	var category = selectCategory.val();
  	var author = selectAuthor.val();
  	var query =  queryString.parse(location.search);
  	console.log(query)

  	if (category) {
  		query.category = category;
  	} else {
  		delete query.category;
  	}

  	if (author) {
  		query.author = author;
  	} else {
  		delete query.author;
  	}
  	window.location.url = window.location.origin + window.location.pathname + queryString.stringify(query);
  	
  });
});