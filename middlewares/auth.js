exports.auth = function (req, res, next) {
	if (req.user) {
		next();
	} else {
		req.flash('error', '请先登陆!');
		res.redirect('/admin/users/login');
	};

};