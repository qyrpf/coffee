
  const express = require('express');
  const router = express.Router({
    mergeParams:true
  });
  
  router.use((req,res,next)=>{
     req.Model = require(`../models/${req.params.resource}`);
      next();
  })


  //获取列表
  router.get('/',async(req,res,next)=>{
    const queryOptions = {},queryConditions = req.query || {}
    if(req.Model.modelName == 'goods'){
     queryOptions.populate = 'categoryId';
     let categoryId = req.query.categoryId;
   }
   const model = await req.Model.find(queryConditions).sort({_id: -1}).setOptions(queryOptions);//关联对象
   res.send(model)
  });

  //分页处理
  router.get('/paging',async(req,res)=>{
    const queryConditions = req.query || {};
    delete queryConditions.page;
    delete queryConditions.pageSize;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const skip = (page-1)*pageSize;
    const model = await req.Model.find(queryConditions).skip(skip).limit(pageSize);
    res.send({
     count:model.length,
     list:model
    });
  });



  router.get('/search',async(req,res)=>{
    const model = await req.Model.find({},{productName:1,salePrice:1})
    var search=[];
    model.forEach(item=>{
      if(item.salePrice > 30){
         search.push(item)
      }
    })
    res.send(search)
 })

  //新建
  router.post('/add',async(req,res)=>{
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  
  //通过id获取某个数据   
  router.get('/:id',async(req,res)=>{
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  }); 

 
  //修改
  router.put('/edit/:id',async(req,res)=>{
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body);
    res.send(model);
  });    
  //删除
  router.post('/delete',async(req,res)=>{
    const model = await req.Model.findByIdAndRemove(req.body.id);
    res.send(model);    
  });
  

  //图片上传
  const multer = require('multer');
  const upload = multer({dest:__dirname+'./../uploads'});
  router.post('/upload',upload.single('file'),async(req,res)=>{
    const file = req.file;
    file.url='http://localhost:3000/uploads/'+file.filename;
    res.send(file)
  });



module.exports = router;