<template>
    <div>
      <myTable :dtList="dtList"></myTable>
      <el-row v-for="item in myOrders" :key="item._id">
        <el-col class="order-time">
           {{orderTime(item.orderTime)}}
        </el-col>
        <el-col :span="20" class="order-list"> 
          <productList 
            type="orderList" 
            :productList="item.orderList" 
            :totalPrice="item.totalPrice">   
           </productList>      
        </el-col>
        <el-col class="order-status" :span="4">            
          {{item.status==0?'配送中':'已配送'}}    
        </el-col>
      </el-row> 
    </div>
</template>
<script>
   import myTable from '@/components/table';
   import productList from '@/components/productList';
   import '../util'
  export default{
    data(){
      return{
        myOrders:[],
        dtList:[{
            name:"商品",
            span:7
           },{
            name:"单价",
            span:3
           },{
            name:"数量",
            span:7
           },{
            name:"总价",
            span:3
           },{
            name:"状态",
            span:4
           }] 
      }
    },
    components:{
       productList,
       myTable
    },
    created(){
     this.init();
    },
    methods:{
      async init(){
        const res = await this.$http.get('/users/orders');           
        this.myOrders = res.data;
      },
      orderTime(time){
       return new Date(time).Format("MM-dd hh:mm:ss");
     }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
  .el-row{
     position: relative;
     margin-top:40px;
     background-color: #fff;
     box-shadow:0px 3px 9px #eaeaea;
     .order-list{
       border-right: 1px solid $border-color;
       img{
        width: 50px;
       }
     }
     .order-time{
      position: absolute;
      top:-20px;
      margin-left: 20px;
      color: #666;
     }
    .order-status{
      position: absolute;
      left: 90%;
      top: 50%;
   }         
  }
    
</style>