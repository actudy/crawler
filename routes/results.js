var request = require('request');
var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var bodyContent = '<?xml version="1.0" encoding="UTF-8"?><body>';

/* GET results listing. */
router.get('/results', function(req, res, next) {
	var q = req.query.q;
	console.log('[query = ' + q + ']');
	var target = req.query.site;
	console.log('[target = ' + target + ']');
	var tURL = '';
	switch(target) {
		case 'naver' : tURL = 'http://academic.naver.com/search.nhn?dir_id=0&query=' + q + '&x=0&y=0'; break;
		case 'naver_terms' : tURL = 'http://terms.naver.com/search.nhn?query=' + q + '&searchType=&dicType=&subject='; break;
		default: console.log('********** is not Selected **********');
	}
	
	request.get({
		url : tURL
	}, function(err, response, html) {
		console.log('[URL Request Called...]');
		if(err) {
			console.log(err); return;
		}
		var $ = cheerio.load(html);
		console.log('[Cheerio HTML Load...]');

		var data = '';
		switch(target) {
			case 'naver': $('.section_basic').each(function(item) {
				data = $(this).find('.txt_cont').text().trim();
			}); break;
			case 'naver_terms' : $('.srch_wrap').each(function(item) {
				data = $(this).find('.dsc').text().trim();
			}); break;
		}

		if(q === '') {
			data = '검색어를 입력하세요.';
		}
		
		res.render('results', { 
			title : 'Naver Search',
			desc : data
		});
	});
});

module.exports = router;
