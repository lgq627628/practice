var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/user/detail', function(req, res, next) {
	var uid = req.query.uid;
	var obj = {
		"success": true,
		"data": {
			"uid": "11111111",
			"nickname": "张三",
			"bio": "Hello World!",
			"weibo": 333,
			"following": 222,
			"followers": 111
		}
	}
	var data = JSON.stringify(obj);	
	if(uid == '' || isNaN(uid)){
		res.send('请输入正确的uid');
	}else{
		res.send(data);
	}	
});

module.exports = router;
