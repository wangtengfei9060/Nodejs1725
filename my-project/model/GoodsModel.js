var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// 创建文档的定义
var Goods = new Schema({
	identifie   : String,
    goods_name  : String,
    goods_sn   : String,
    price       : String,
    img	        : String,
    virtual_sales : String,
    market_price : String,
    goods_stock  : String,
    create_date : { type: Date, default: Date.now }
});

// 创建model对象，与数据库中的文档（表）映射
var GoodsModel = mongoose.model('goods', Goods);
// commonJS规范(暴露接口)
module.exports = GoodsModel;