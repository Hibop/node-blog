$(document).ready(function(){
  console.log('load custom.js');
  var selectCategory = $('#js-category');
  var selectAuthor = $('#js-author');
  // 列表筛选事件
  $('#js-filter-submit').on('click', function () {
  	
  	var category = selectCategory.val();
  	var author = selectAuthor.val();
  	var query =  queryString.parse(location.search);

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
  	console.log(queryString.stringify(query))
  	window.location.url = window.location.origin + window.location.pathname + queryString.stringify(query);

  });
  // 列表筛选重置
  $('#js-filter-reset').on('click', function () {
  	selectCategory.val('');
  	selectAuthor.val('');
  	console.log(location.search)
  	var query =  queryString.parse(location.search);

  	delete query.category;

  	delete query.author
  	
  	// console.log(queryString.stringify(query))
  	// window.location.url = window.location.origin + window.location.pathname;

  });

});