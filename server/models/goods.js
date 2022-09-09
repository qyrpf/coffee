const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const produtSchema = new Schema({
  "productName":String,
  "productImage":String,
  "salePrice":Number,
  "productNum":Number,
  "categoryId":{type:mongoose.SchemaTypes.ObjectId,ref:'categories'},
  "checked":String
});

module.exports = mongoose.model('goods',produtSchema);
