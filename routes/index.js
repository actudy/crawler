var request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title : 'Naver Search',
		desc : '검색을 실행하세요.'
	});
});

module.exports = router;
