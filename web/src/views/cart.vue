<template>
  <div>
    <myTable :dtList="dtList"></myTable>
    <productList 
      type="cartList" 
      :productList="cartList"
      :totalPrice = "totalPrice" 
      @editList="editList">
      <a slot="payBtn" class="pay-btn-active" :class="{'pay-btn-ban':totalPrice==0}" @click="checkOut">结算</a>
    </productList>
  </div>
</template>
<script>
 import productList from '@/components/productList'
 import myTable from '@/components/table' 
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
        cartList:[]
      }
    },
    components:{
      productList,
      myTable
    },
    computed:{
      totalPrice(){
        let money = 0;       
        this.cartList.forEach((item)=>{
           if(item.checked == 1){
             money+=item.salePrice*item.productNum
           }
         });
         return money;                    
      }
    },
    created(){
      this.init()
    },
    methods:{
      async init(){
        const res = await this.$http.get('/users/cartList');
          this.cartList=res.data;
       },
      async delCart(delId){ 
          await this.$confirm('确定删除该商品?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          });      
          const res = await this.$http.post('/users/cartDel',{delId});
          this.init();
          this.$store.commit('updateCartCount',-1);
       }, 
      async editList(flag,item){
        if(flag == 'add'){
          item.productNum++;
          this.$store.commit('updateCartCount',1);
         }else if(flag == 'minu'){
            if(item.productNum <=1){
              this.delCart(item._id);
            }else{
              item.productNum--;
              this.$store.commit('updateCartCount',-1);
            }    
         }else if(flag == 'checked'){
          item.checked = (item.checked == 1) ? 0 : 1
        }
        await this.$http.post('/users/cartEdit',{
          productNum:item.productNum,
          productId:item._id,
          checked:item.checked
        });
       },
       checkOut(){
        if(this.totalPrice>0){
          this.$router.push({path:'/orderConfirm'});
        }
       }
    }
  }
</script>