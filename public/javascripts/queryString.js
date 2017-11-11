// 处理查询字符串的库
!(function (exports) {
	'use strict';

	exports.queryString = {};
	exports.queryString.extract = function (str) {
		var queryStart = str.indexOf('?');
		if (queryStart === -1) {
			return '';
		}
		return str.slice(queryStart + 1);
	};

	exports.queryString.parse = function (str) {
		// var ret = Object.create(null);
		if (typeof str !== 'string') {
			return {};
		};
		str = str.trim().replace(/^(\?|#|&)/, '');
		if (!str) {
			return {};
		};
		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
			key = decodeURIComponent(key);

			val = val === undefined ? null : decodeURIComponent(val);
			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val]
			};
			return ret;
		}, Object.create(null));
	};

	exports.queryString.stringify = function (obj) {
			return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(val2); 
				}).join('&');
			}

			return encodeURIComponent(key) + '=' + encodeURIComponent(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};

})(this);