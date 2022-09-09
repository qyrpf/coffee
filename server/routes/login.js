  const express = require('express');
  const router = express.Router();
  const User = require('./../models/users');
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');
  
  
  //注册user
  router.post('/register',async(req,res)=>{
    const user = await User.findOne({userName:req.body.userName});
    if(user){
      res.status(422).send({
        message:'用户已存在'
      }); 
    }else{
      await User.create(req.body);
      res.send({
        status:'0',
        message:'注册成功'
      })
    }    
  });

  //登录
  router.post('/',async(req,res)=>{
  //1.根据用户名找用户
    const {userName,userPsw,status} = req.body || '';
    const user = await User.findOne({userName,status});
    if(user){
    //2.校验密码
      if(userPsw == user.userPsw){
        const token = jwt.sign({userId:user._id},'coffee');
        //3.返回token   
        res.send({token});          
      }else{
        res.status(422).send({
          message:'密码错误'
        });
      } 
    }else{ 
      res.status(422).send({
        message:'用户不存在'
      });
    }    
  });

//检测登录状态
router.get('/check',async(req,res)=>{
  const token = req.headers.authorization;  
  if(!token){
    res.send({
      cartCount:0,
      userName:''
    }); 
  }else{
    const {userId} = jwt.verify(token,'coffee');
    const user = await User.findById(userId);
    if(user){
      const cartList = user.cartList;
      let cartCount = 0;
      cartList.forEach((item)=>{
        cartCount += parseInt(item.productNum);
      });
      res.send({
        cartCount,
        userName:user.userName
      });     
    }else{
      res.status(401).send({
        message:'请先登录'
      })
    }

  }
})
 
  
module.exports = router;