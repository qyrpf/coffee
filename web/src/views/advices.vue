<template>
<el-row>
  <el-col :span = "16">
    <div class="sub-advice">
    	<span>意见反馈</span>
    	<div>
    	   <el-form>
             <el-form-item>
               <el-input type="textarea" v-model="content" style="width: 90%"></el-input>
             </el-form-item>
             <el-button type="primary" size="small" @click="subimt">提问</el-button>  	
    	   </el-form>  	  	
    	</div>

    	<div v-if="myAdvices" class="my-advice">
   	      <span >我的反馈</span>
    	  <ul class="my-list">
    	  	<li v-for="item in myAdvices">
    	  		<p>提问 ： {{item.quize}}</p>
    	  		<p v-if = "item.reply" >回复 ： {{item.reply}}</p>
    	  	</li>
    	  </ul>    		
    	</div>
 
    </div>		  	
  </el-col>
  <el-col :span = "8">
    <div class="hot-problem">
  	  <span>热门问题</span>
  	  <ul class="hot-list">
  	  	<li v-for="item in hotAdvices">{{item.quize}}</li>
  	  </ul>
    </div>  
  </el-col>


</el-row>
</template>
<script>
	export default{
		data(){
			return{
              content:'',
              myAdvices:[],
              hotAdvices:[],
              dialogFormVisible:false
			}
		},
		created(){
			this.getAdvices()
		},
		methods:{
		   async getAdvices(){
              const res = await this.$http.get('/users/advices');
			  this.myAdvices = res.data;
              const hot = await this.$http.get('web/advices',{params:{type:'hot'}});
              this.hotAdvices = hot.data;
		   },
           async subimt(){
              const res = await this.$http.post('/users/advices/add',{
				  quize:this.content,
				  userName:localStorage.userName
              });
              this.content = '';
              this.getAdvices();
           }
		}
	}
</script>
<style lang="scss" scoped>
	.el-row{
		margin: 20px;
		.el-col{
			.sub-advice,.my-advice,.hot-problem{
				span:nth-of-type(1){
					display: inline-block;
					font-weight: bold;
					margin-bottom: 20px;
				}
			}
			.my-advice{
				margin-top: 60px;
			}
			ul{
				width: 90%;
			    li{
			    	background-color: #fff;
			    	padding: 10px;
			    	border-bottom:1px solid #eaeaea;			    	
			    	p{
			    		display: block;
			    		margin: 10px;
			    	}
			    }				
			}
      .my-list{
      	li{
            box-shadow:0px 3px 9px #eaeaea;
            margin-bottom: 20px;
      	}
      }
		}
	}

	
</style>