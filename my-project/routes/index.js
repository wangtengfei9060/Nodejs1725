var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
//var md5  = require("md5")
//var GoodsModel = require("../model/Goods")
//var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//前台主页面
router.get('/index1', function(req, res, next) {
  res.render('index1', { title: 'Express' });
});
router.get('/index2', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});
router.get('/index3', function(req, res, next) {
  res.render('index3', { title: 'Express' });
});
router.get('/index4', function(req, res, next) {
  res.render('index4', { title: 'Express' });
});
router.get('/index5', function(req, res, next) {
  res.render('index5', { title: 'Express' });
});
router.get('/login', function(req, res,next) {
  res.render('login',{});
});

//后台登陆页面
router.get('/login', function(req, res,next) {
  res.render('login',{});
});
router.post('/api/login',function(req,res,next){
	var username = req.body.username;
	var pwd = req.body.pwd;
	
	var result = {
		status :1,
		message : "登陆成功"
	}
	UserModel.find({username : username , pwd : pwd},function(err,docs){
		if( !err && docs.length > 0 ){
			console.log("登陆成功");
			res.send(result);
		}else{
			console.log( "登录失败，请检查您的用户名或者密码" );
			result.status = -109;
			result.message = "登录失败，请检查您的用户名或者密码";
			res.send(result);
		}
	})
})

module.exports = router;
