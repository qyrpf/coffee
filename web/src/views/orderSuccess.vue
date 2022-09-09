<template>
<div class="order-success-container">
  <div class="title">下单成功！</div>
  <img src="/static/img/ok.gif">
  <div class="text">订单正在处理...</div>
  <div class="text">订单号：{{$route.query.orderId}}</div>
  <div class="btn-list">
    <div class="order-btn"><router-link :to="`/myOrders`">查看订单</router-link></div>
    <div class="order-btn"><router-link to="/cart">购物车</router-link></div>
  </div>
</div>
</template>

<script>
  export default{
    data(){
      return{
        
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/index.scss';
   .order-success-container{
    width: 300px;
    margin: 50px auto;
    font-size: $font-size-md;
     .title{
      text-align: center;
      line-height: 60px;
       font-size: $font-size-lg;
       font-weight: bold;
     }
     .text{
       text-align: center;
       line-height: 30px;
     }
     img{
      width: 100%;
      border-radius: 50%;
     }
     .btn-list{
        display: flex;
        font-weight: bold;
        justify-content: center;
        .order-btn{
          margin: 20px;
        }
     }
   }
</style>

