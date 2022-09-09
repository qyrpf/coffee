const Goods = require('../models/goods')
const router = require( '../plugins/curd')
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
});

module.exports = router;