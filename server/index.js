const express = require("express");
const app = express();
const path =require("path");

const admin = require('./routes/admin');
const login = require('./routes/login');
const goods = require('./routes/goods');
const users = require('./routes/users');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

require('./plugins/db')(app);

app.use('/admin/:resource',admin);

app.use('/login',login);

app.use('/users',users);
 
app.use('/web/:resource',goods);

app.listen(3000,()=>{
   console.log('http://localhost:3000');
});