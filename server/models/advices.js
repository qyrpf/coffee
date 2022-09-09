const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adviceSchema = new Schema({
  "userId":String,
  "userName":String,
  "quize":String,
  "reply":String,
  "type":{type:String,default:"ord"}
});

module.exports = mongoose.model('advices',adviceSchema);
