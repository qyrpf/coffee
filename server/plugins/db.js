module.exports = app =>{
  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost:27017/text',{ useNewUrlParser: true });
  
  mongoose.connection.on('connected',()=>{
  	console.log('MongoDB connected success')
  });
  
  mongoose.connection.on('error',()=>{
  	console.log('MongoDB connected fail')
  });
  
  mongoose.connection.on('disconnected',()=>{
  	console.log('MongoDB connected disconnected')
  });
}

