<template>
  <div>
    <Address @getOrdAdress="getOrdAdress"></Address>
    <myTable :dtList="dtList"></myTable>
    <productList  
      type="orderDetail" 
      :productList="orderList"
      :totalPrice="totalPrice">
      <a slot="payBtn" class="pay-btn-active" :class="{'pay-btn-ban': !orderAddress || totalPrice==0}" @click="payMent">确认订单</a>   
     </productList>
  </div> 
</template>

<script>
  import myTable from '@/components/table';
  import productList from '@/components/productList';
  import Address from './address';
  export default{
    data(){
      return{
        dtList:[{
           name:"商品",
           span:8
          },{
           name:"单价",
           span:4
          },{
           name:"数量",
           span:8
          },{
           name:"总价",
           span:4
          }],
        orderList:[],
        orderAddress:''
      }
    },
    components:{
      Address,
      myTable,
      productList
    },
    computed:{
      totalPrice(){
        let money = 0;       
        this.orderList.forEach((item)=>{          
          money+=item.salePrice*item.productNum
         });
         return money;                    
      }
    },
    created(){
      this.getOrder();
    },
    methods:{
      getOrdAdress(item){
        this.orderAddress = item;
      },
      async getOrder(){
        const res = await this.$http.get('/users/cartList');
        const cartList = res.data;  
        let orderItem;
        cartList.forEach((item)=>{
          if(item.checked == '1'){
              this.orderList.push(item);
            }
        });
      },
       async payMent(){
       if(this.orderAddress){
       const res = await this.$http.post('/users/payMent',{
          orderList:this.orderList,
          orderAddress:this.orderAddress,
          totalPrice:this.totalPrice
        });
            this.$router.push({
            path:'/orderSuccess?orderId='+res.data._id
        });              
       }  
      }
    }
  }
</script>