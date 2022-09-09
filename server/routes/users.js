  const express = require('express');
  const router = express.Router();
  const User = require('../models/users');
  const Order = require('../models/orders');
  const Advice = require('../models/advices');
  const jwt = require('jsonwebtoken');
  
  router.use((req,res,next)=>{
    const token = req.headers.authorization;  
    if(!token){
      res.status(401).send({
        message:'请先登录'
      }); 
    }else{
      const {userId} = jwt.verify(token,'coffee')
      req.userId = userId;
      next(); 
    }
  })
  //加入到购物车
  router.post("/addCart", async(req,res)=>{
    const productId = req.body.productId;
    const user = await User.findById(req.userId);
    if(user){
      let goodsItem = '';
      user.cartList.forEach((item)=>{
        if(item.productId == productId){
          goodsItem = item;
          item.productNum ++;
        }
      });
      if(goodsItem){
        user.save();
      }else{
        user.cartList.push({
          ...req.body,
          productNum:1,
          checked:1
        });
        user.save();   
      }
      res.send(user);
    }else{
      res.status(401).send({
        message:'请先登录'
      });
    }
  });  
  //查询购物车信息
  router.get('/cartList',async(req,res)=>{
   const user = await User.findById(req.userId)
   const cartList = user.cartList;    
    res.send(cartList);   
  });
  
  //查询购物车数量
  router.get('/getCartCount',async(req,res)=>{
    const user = await User.findById(req.userId)
      const cartList = user.cartList;
      let cartCount = 0;
      cartList.forEach((item)=>{
        cartCount += parseInt(item.productNum);
      });
      res.send(cartCount);
  })

  //删除购物车商品
  router.post('/cartDel',async(req,res)=>{
    const userId = req.userId,delId = req.body.delId;
    await User.update({_id:userId},{$pull:{'cartList':{'_id':delId}}});
    res.send('success');
  });
  
  //修改商品数量
  router.post('/cartEdit',async(req,res)=>{
    var userId = req.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    await User.update({
      '_id':userId,
      'cartList._id':productId
    },{
      'cartList.$.productNum' : productNum,
      'cartList.$.checked' : checked
    });
    res.send('success');
  });
  
  
  //新增地址
  router.post('/addAddress',async(req,res)=>{
    const address = req.body.address;
    const user = await User.findById(req.userId) 
    if(user){
      if(user.addressList.length == 0){
        address.isDefault = true;
      }else{
        address.isDefault = false;
      }
      user.addressList.push(address);
      user.save();
      res.send(user.addressList[user.addressList.length-1]);
    }
  })
  //获取地址
  router.get('/addressList',async(req,res)=>{
    const user = await User.findById(req.userId)
    if(user){
      res.send(user.addressList);
    }
  });
 //删除地址
  router.post("/delAddress", async(req,res)=>{
  const userId = req.userId,addressId = req.body.addressId;
  await User.update({
    _id:userId
  },{
    $pull:{
      'addressList':{
        '_id':addressId
      }
    }
  });
    res.send('success');
  });

  //修改默认地址
  router.post("/setDefault",async(req,res)=>{
   const addressId = req.body.addressId;
   const user = await User.findById(req.userId)
   user.addressList.forEach((item)=>{
    if(item._id == addressId){
      item.isDefault = true;
    }else{
      item.isDefault = false;
    }
   });
   user.save();
   res.send(user);
  })
  
  // 创建订单功能
  router.post('/payMent',async(req,res)=>{
    const model = await Order.create({
      userId:req.userId,
      orderTime:new Date(),
      ...req.body
    });
    await User.update({_id:req.userId},{$pull:{'cartList':{'checked':1}}});
    res.send(model);
  })
   
  
  //我的订单 我的反馈
  router.get('/orders',async(req,res)=>{
    const model = await Order.find({userId:req.userId}).sort({_id: -1});
      res.send(model);
  });

  router.get('/advices',async(req,res)=>{
    const model = await Advice.find({userId:req.userId}).sort({_id: -1});
      res.send(model);
  });

  router.post('/advices/add',async(req,res)=>{
    const model = Advice.create({
      userId:req.userId,
      ...req.body
    });
    res.send(model);
  })

  module.exports = router;
