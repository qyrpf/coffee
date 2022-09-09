var mongoose = require('mongoose')
var Schema = mongoose.Schema;
const produtSchema = new Schema({
  "userId":String,
  "orderList":[{
    "productName":String,
    "productImage":String,
    "salePrice":Number,   
    "productNum":String,    
    }],
  "totalPrice":Number,
  "orderAddress":{
    "name":String,
    "address":String,
    "telephone":Number
  },
  "orderTime":String,
  "status":{type:Number,default:0}
});

module.exports = mongoose.model('orders',produtSchema);
