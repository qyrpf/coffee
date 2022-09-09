<template>
  <div>
    <el-row v-for='item in productList' :key="item._id" class="cart-list">
        <el-col :xs="16" :sm="12" :md="8">
            <div class="cart-info">
              <a v-if="isCart" class="item-check" :class="{'checked':item.checked == 1}" @click="editList('checked',item)">
                 <i class="el-icon-check"></i>
               </a>
              <div class="cart-pic">
                <img v-lazy="item.productImage">
              </div>
              <div class="cart-title">
                <div class="item-name">{{item.productName}}</div>
              </div>                      
            </div>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4">
          <div class="cart-info hidden-xs-only">
             <span class="item-price">￥{{item.salePrice}}</span>  
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8">
          <div class="cart-info">
            <div v-if="isCart" class="item-quantity">
              <a class="cart-icon input-sub" @click="editList('minu',item)">
                <i class="el-icon-remove icon"></i>
              </a>
               <span class="input-num">{{item.productNum}}</span>
              <a class="cart-icon input-add" @click="editList('add',item)">
                <i class="el-icon-circle-plus icon"></i>
              </a>
            </div>
            <div v-else>
              <span class="input-num">X{{item.productNum}}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="4">
          <div class="cart-info hidden-sm-and-down">
            <span class="item-price-total">￥{{item.salePrice*item.productNum}}</span>
          </div>
        </el-col>
    </el-row>
    <div class="empty-text" v-if="productList.length == 0">快去点杯咖啡吧~</div>
    <div class="cart-totalPrice">
        <slot></slot>
        <div class="item-pay">
            <div class="item-total">
              总价: <span class="total-price">￥{{totalPrice}}</span>
            </div>
            <slot name="payBtn"></slot>
            </a>              
        </div>            
    </div>
  </div> 
</template>

<script>
  export default{
    data(){
      return{  
        isCart:this.type == "cartList"
      }
    },
    props:['productList','type','totalPrice'],
    watch:{
       
    },
    methods:{
      editList(flag,item){
        this.$emit('editList',flag,item);     
      }
  }
}
</script>
<style lang="scss" scoped>

  
</style>

