<template>
  <div>
    <h3 style="margin: 10px">意见反馈</h3>
    <el-card v-for="item in advicesList" :key="item._id" class="box-card">
      <div :key="item._id" slot="header" class="clearfix">
        <span> 提问 : {{item.quize }}</span>
        <el-button v-if="!item.reply" type="text" @click="replayId = item._id" class="reply">回复</el-button>
        <el-button v-else class="reply" type="text" @click="setType(item)">{{item.type == 'hot'?'移除':'设为热门问题'}}</el-button>
      </div>    
     <div v-if="item.reply" class="text item">
        回复 : {{item.reply }}
      </div>
      <div v-else>
        <div v-show="replayId == item._id">
          <el-input type="textarea" v-model="replayContent"></el-input>		
          <el-button type="primary" @click="setReply(item)">确定</el-button>        
        </div>          
      </div>

 
    </el-card>
  </div>
</template>
<script>
	export default{
		data(){
			return{
        advicesList:[],
        replayId: '',
        replayContent:''
			}
		},
		created(){
       this.init();
		},
		methods:{
			async init(){
				const res = await this.$http.get('admin/advices');
				this.advicesList = res.data;				
			},
      async setReply(item){
        console.log(item)
        item.reply = this.replayContent;
        await this.$http.put(`admin/advices/edit/${item._id}`,item);
        this.replayId = '';
        this.replayContent = '';
      },
      async setType(item){
        item.type == 'hot'?item.type = 'ord':item.type = 'hot';
        await this.$http.put(`admin/advices/edit/${item._id}`,item);
      }
		}
	}
</script>
<style lang="scss" scoped>
  div{
  	width: 100%;
     .el-card{
        width: 90%;
        margin: 20px auto;
     }  	
  }
  .reply{
  	float: right;
  }
  .el-button{ 
    float: right;
		margin: 10px;	
	}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>