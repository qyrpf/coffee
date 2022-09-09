<template>
	<el-main>
      <h3 style="margin: 10px">订单列表</h3>
      <h3 style="padding-right: 140px;float:right">今日营业额：￥{{todayMoney}}</h3>
      <el-table :data="orders" height="600px">
        <el-table-column prop="_id" label="ID" width="240px">
        </el-table-column>
        <el-table-column prop="orderAddress.name" label="用户名">
        </el-table-column>
        <el-table-column prop="orderList" label="订单详情" width="160px">
          	<template slot-scope="scope">
        		<div v-for="item in scope.row.orderList">{{item.productName}} x{{item.productNum}}</div>
        	</template>
        </el-table-column>
        <el-table-column prop="orderAddress.address" label="地址" width="160px">    
        </el-table-column>
        <el-table-column prop="orderAddress.telephone" label="电话" width="140px">    
        </el-table-column>
        <el-table-column prop="totalPrice" label="总价">
            <template slot-scope="scope">
             ￥{{ scope.row.totalPrice}}
            </template>
        </el-table-column>
        <el-table-column prop="orderTime" label="下单日期" width="150px">
          <template slot-scope="scope">
             	{{orderTime(scope.row.orderTime)}}
          </template>
        </el-table-column>                 
        <el-table-column
            label="操作"
            width="400">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click='deliverEdit(scope.row)' :disabled="scope.row.status == 1">{{scope.row.status==1?'已送达':'确认送达'}}</el-button>
            </template>
         </el-table-column>
      </el-table>
    </el-main>
</template>
<script>
import util from '../util.js'
	export default{
		data(){
			return{
        orders:[],
			}
    },
    computed:{
     todayMoney(){
       let money=0;
       this.orders.forEach(item=>{
         if(new Date(item.orderTime).getDate() != new Date().getDate()){
           return;
         }
        money += item.totalPrice ;
       })
        return money;
     }     
    },
		created(){
      this.init();
		},
		methods:{
			async init(){
        const res = await this.$http.get('admin/orders');
        this.orders = res.data;
			},
			async deliverEdit(order){
			  order.status = 1;
        await this.$http.put(`admin/orders/edit/${order._id}`,order);          	
			},
      totalPrice(list){
         let money = 0;
         list.orderList.forEach((item)=>{
           money+=item.salePrice*item.productNum
         });
       
        return money;          
     },
     orderTime(time){
       return new Date(time).Format("MM-dd hh:mm:ss");
     }
		}
	}
</script>
