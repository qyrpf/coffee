<template>
  <div class="cart-container">
    <div class="cart-list">
      <div class="cart-item">
        <div class="cart-item-head hidden-sm-and-down">
          <el-row>
            <el-col v-for="item in dtList" :key="item.name" :span="item.span">{{item.name}}</el-col>
          </el-row>
        </div>
      </div>
    </div>      
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
        return{
          cartList:[]
        }
    },
    props:['dtList']
    
  }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
      .cart-item-head{
        height: 40px;
        background: #605f5f;
        .el-row{
          .el-col{
            color:#fff;
            line-height: 40px;
            text-align: center;
          }
        }
      }

</style>
