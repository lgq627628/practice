var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function getDataFromDB(cb) {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'lgq1597535',
		port: '3333',
		database: 'db'
	});

	connection.connect();
	console.log('连接数据库成功');

	var sql = 'select * from user';
	connection.query(sql, function(err, result) {
		if(err){
			connection.close();
			return;
		}
		for (var i = 0; i < result.length; i++) {
			var rlt = result[i];
			var age = rlt['age'];

			console.log(age);
		};
		cb(result);
	});
}

function deleteDataFromDB(id, cb) {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'lgq1597535',
		port: '3333',
		database: 'db'
	});

	connection.connect();
	console.log('连接数据库成功');

	var sql = 'delete from user where id=' + id;
	connection.query(sql, function(err, result) {
		if(err){
			connection.close();
			return;
		}
		cb();
	});
}

function checkUser(username, userpwd, cb){
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'lgq1597535',
		port: '3333',
		database: 'db'
	});

	connection.connect();

	var sql = 'select * from user where loginname=? and password=?';
	var params = [username, userpwd];
	console.log(params);

	connection.query(sql, params, function(err, result) {
		var loginRlt = false;
		if(result.length == 1){
			loginRlt = true;
		}
		cb(loginRlt);
	});
}

module.exports = function(app){
	app.use('/', router);
};

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/login', function(req, res, next) {
	var username = req.query.uname;
	var userpwd = req.query.upwd;

	console.log(username, userpwd);
	checkUser(username, userpwd, function(loginRlt) {
		if(loginRlt){
			res.redirect('/info');
			return;
		}
		res.redirect('/error');
	})
});

router.get('/info', function(req, res, next) {
	getDataFromDB(function(rlt) {
		console.log('获取数据成功');
		res.render('info', {
			rlt: rlt
		});
	});
});

router.get('/deleteResult', function(req, res, next) {
	var delUserId = req.query.userid;
		console.log('要删除的id是' + delUserId);
	deleteDataFromDB(delUserId, function() {
		
		var content = '用户' + delUserId + '已被删除';
		res.render('deleteResult', {
			content: content
		})
	})
})

router.get('/user/detail', function(req, res, next) {
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
  	res.send(data);
});


