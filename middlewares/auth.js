exports.auth = function (req, res, next) {
	if (req.user) {
		next();
	} else {
		next(new Error('请登录才可以访问!'))
	};

};