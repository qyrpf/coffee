var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPsw":String,
  "creatTime":{type:String,default:new Date()},
  "status":{type:Number,default:0},
  "cartList":[
    {
      "productId":{type:mongoose.SchemaTypes.ObjectId,ref:'goods'},
      "productName":String,
      "productImage":String,
      "salePrice":Number,
      "productNum":Number,
      "checked":Number,
      "productNum":String
    }
  ],
  "addressList":[{
    "name":String,
    "address":String,
    "telephone":Number,
    "isDefault":Boolean
  }]
});

module.exports = mongoose.model("User",userSchema);
