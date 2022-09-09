<template>
    <div class="order-address">      
      <div class="address-list">
        <div class="address-top">
          <span class="address-text">收获地址</span>
          <a class="select-address" @click="addressVisible=true;getAdresList()">选择地址</a>
        </div>
        <el-row>
          <el-col :span="4">{{orderAdress.name}}</el-col>
          <el-col :span="8">{{orderAdress.address}}</el-col>
          <el-col :span="10">{{orderAdress.telephone}}</el-col>
        </el-row>      
      </div>
      <el-dialog title="选择地址" :visible.sync="addressVisible" >
        <el-row class="address-item" v-for="item in addressList" :key="item._id">
          <el-col :span="18">
            <el-row @click.native=selectAddress(item)>
              <el-col :span="4">{{item.name}}</el-col>
              <el-col :span="8">{{item.address}}</el-col>
              <el-col :span="8">{{item.telephone}}</el-col>
            </el-row>               
          </el-col>
          <el-col :span="6">
            <a @click="setDefault(item._id)">{{item.isDefault?'默认地址':'设为默认地址'}}</a>
            <a @click="delAddress(item._id)">
              <i class="el-icon-delete"></i>
            </a> 
          </el-col>
        </el-row>
        <a class="add-adress" @click="addConfirm=true;getAdresList()">+新增地址</a>
      </el-dialog>
      <el-dialog title="新增地址" :visible.sync="addConfirm">
         <el-form>
            <el-form-item label="姓名">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="model.telephone"></el-input>
            </el-form-item>
            <el-form-item label="地址" >
              <el-input v-model="model.address"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="addConfirm = false">取 消</el-button>
            <el-button type="primary" @click="addAddress">确 定</el-button>
         </div>               
      </el-dialog>
    </div>
</template>
<script>
  export default{
    data(){
      return{
        model:{},
        addressList:[],
        orderAdress:{},
        isDispatch:false,
        addressVisible:false,
        addConfirm:false
      }
    },
    async created(){
      await this.getAdresList();
      this.setOrdAdress();
    },
    methods:{
      async getAdresList(){
        const res = await this.$http.get('/users/addressList');
        this.addressList = res.data;
      },
      setOrdAdress(item){
        if(item){
          this.orderAdress = item;
          this.orderAdress._id = item._id;
        }else{
          this.orderAdress = '';
          this.addressList.forEach((item)=>{
            if(item.isDefault){
              this.orderAdress = item;
            }
          });          
        }
        this.$emit('getOrdAdress',this.orderAdress);
      },
      selectAddress(item){
        this.addressVisible = false;
        this.setOrdAdress(item);
      },
      async addAddress(){
        const res = await this.$http.post('/users/addAddress',{address:this.model}); 
        this.addConfirm = false;
        this.addressVisible = false;
        this.setOrdAdress(res.data);
      },
      async delAddress(addressId){
        console.log(addressId,this.orderAdress)
        if(addressId == this.orderAdress._id){
          this.orderAdress = '';     
        }       
          await this.$http.post('/users/delAddress',{addressId});     
          this.getAdresList();
      },
      async setDefault(addressId){
        await this.$http.post('/users/setDefault',{addressId});
        this.getAdresList();             
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.order-address{
  .address-list{
      background:#fff;
      margin: 10px;
      border:1px solid #e9e9e9; 
      padding: 20px;
    .address-top{
      height: 50px;
      .address-text{
        font-size: $font-size-md;
        font-weight: bold;
        float: left;
      }
      .select-address{
        float: right;
        color: $link-active-color;
      }
    }  

  }
  .el-dialog__body{
    .address-item{
      cursor: pointer;
      &:hover{
      	background:#ffeaea;
      }
      .el-col{
      	display: inline-block;
      	text-align: center;
        line-height: 50px;      	
      }
    }
    .add-adress{
        margin-top: 10px;
        float:right;
    }
  } 
}
</style>