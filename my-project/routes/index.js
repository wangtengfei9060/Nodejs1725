var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
//var md5  = require("md5")
var GoodsModel = require("../model/GoodsModel")
var multiparty = require('multiparty');

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
//显示页面
router.get('/index4', function(req, res, next) {
	GoodsModel.find({},function(err,docs){
		res.render("index4",{list: docs});
	})
});
//addGoods
router.get('/index5', function(req, res, next) {
  res.render('index5', { title: 'Express' });
});

router.get('/login', function(req, res,next) {
  res.render('login',{});
})
//上传
router.post('/api/index5', function(req,res,next){
	var Form = new multiparty.Form({
		uploadDir: "./public/upload_imgs"
	});
	Form.parse(req , function(err,body,files){
		var x =  Math.floor(Math.random() * 1e6);
		var identifie = String( x );
		var goods_name = body.goods_name[0];
		var goods_sn = body.goods_sn[0];
		var shop_price = body.shop_price[0];
		var virtual_sales = body.virtual_sales[0];
		var market_price = 100;
		var goods_stock = body.integral[0];//库存
		var imgName = files.goods_img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\") + 1);
		//console.log(files);
		console.log( goods_name,goods_sn,shop_price,virtual_sales,market_price,imgName );
		//res.send("文件上传成功");
		
		
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.goods_sn = goods_sn;
		gm.price = shop_price;
		gm.virtual_sales = virtual_sales;
		gm.market_price = market_price;
		gm.goods_stock = goods_stock;
		gm.identifie = identifie;
		gm.img = imgName;
		gm.save(function(err){
			if(!err){
				res.send("商品保存成功");
			}else{
				res.send("商品保存失败");
			}
		})
	})
})


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

////updatagoods、后台商品管理页面 实时更新
//router.get('/updatagoods', function(req ,res ,next){
//	var pageIndex = parseInt( req.query.pageIndex );
//	var query = GoodsModel.find({});
//	query.count({},function(err,count){
//		query.skip(pageIndex).limit(5).exec('find',function(err,items){
//			var result = {
//				pageindex : count,
//				items : items
//			}
//			res.json(result);
//		});
//	});
//});

//删除商品
router.post('/removegoods', function(req, res, next){
	var result = {
			code: 1,
			message: "商品删除失败"
		};
	console.log(req.body.p)
		GoodsModel.remove({goods_name:req.body.goodId}, function (err,docs) {
			if(!err){
				result.code = -444;
    		result.message = "商品删除成功"
			}
			res.json(result)
		});
});


//模糊查询
router.get('/list', function(req,res,next){
	var condition = req.query.condition;
	
	GoodsModel.count({goods_name : {$regex : condition}}, function(err,count){
		var query = GoodsModel.find({ goods_name : {$regex:condition} })
		query.exec(function(err,docs){
			var result = {
				total : count,
				data : docs
			}
			console.log( count,docs );
			
			res.send(docs);
		});
	})
})
module.exports = router;
