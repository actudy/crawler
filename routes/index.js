var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();

var q = '';

/* GET home page. */
router.get('/', function(req, res, next) {
	request.get({
		url : 'http://academic.naver.com/search.nhn?dir_id=0&query=' + q + '&x=0&y=0'
	}, function(err, response, src) {
		console.log('[URL Request Called...]');
		if(q === '') {
			src = '검색을 실행하세요.';
		}
		res.render('index', { 
			title : 'Naver Academic Search',
			desc : src
		});
	});
});

module.exports = router;
