var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/login', function(req, res, next) {
  res.render('login',{});
});

router.post('/api/login',function(req,res){
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
