<template>
	<div class="login">
    <div class="login-header">
      <img src="/static/img/logo.png" alt="">
      <span>用户登录</span>
    </div>
    <div class="login-container">
      <div class="login-inner">
        <div class="login-top">
           <router-link 
           to="/login" 
           :class="{'nav-active':loginVisible}"
           >登录
           </router-link>
           <router-link 
           to="/register" 
           :class="{'nav-active':!loginVisible}"
           >注册
           </router-link>
        </div>
        <div class="login-content">
          <div class="login-info">
              <el-form label-width="60px">
                <el-form-item label="用户名">
                  <el-input placeholder="请输入用户名" v-model="model.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input placeholder="请输入密码" v-model="model.userPsw" show-password></el-input>
                </el-form-item>
              </el-form>
          </div>
        </div>
        <div class="login-btn">
          <a v-if="$route.path=='/login'" class="btn-text" @click="login">登录</a>
          <a v-else class="btn-text" @click="register">注册</a>        
        </div>
      </div>
    </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				redirect:'',
        msgFlag:false,
				model:{
					userName:'',
          userPsw:'',
          status:0
        }
			}
    },
    computed:{
      loginVisible(){
        return this.$route.path=='/login'
      }
    },
    created(){
     this.redirect = decodeURIComponent(this.$route.query.redirect || '/');
    },
		methods:{
      async login(){
        if(!this.model.userName || !this.model.userPsw){
          this.$message({
            type:'error',
            message:'账户或密码不能为空'
          })
        }else{
          const res = await this.$http.post("/login",this.model);           
          localStorage.token = res.data.token;
          this.$router.push({path:this.redirect});             
        }      
      },
      async register(){
        if(!this.model.userName || !this.model.userPsw){
          this.$message({
            type:'error',
            message:'账户或密码不能为空'
          })
        }else{
          const res = await this.$http.post('/login/register',this.model);
          this.$router.push(`/login`)
        }
      }
		}
	}
</script>
<style lang="scss">
  @import '@/assets/scss/index.scss';
  .login{
    width: 350px;
    margin: 120px auto;
    .login-header{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      img{
        height:80px;
      }
      span{
        display: inline-block;
        line-height:80px; 
        font-size: $font-size-lg;
        color: #393939;
      }
    }
  }
  .login-container{
    background: #fff;  
    box-shadow:0 12px 24px 0 rgba(28,31,33,.1); 
    border-radius: 10px;
    .login-inner{
      padding: 30px;
      .login-top{
        margin-bottom:40px;
        >a{
          font-weight: bold;
          &:hover,&.nav-active{
            color:$link-active-color;
          }
        }
        
      } 
      .login-content{
        margin-bottom: 40px;
        .err-msg{
          margin-bottom: 10px;
          color: $link-active-color;
        }
      }
      .login-btn{
       width: 100px;
       height: 40px;
       margin: 0 auto;
       background-color: $link-active-color;
       text-align: center;
       line-height: 40px;
       border-radius: 10px;
         .btn-text{
           color: #fff;
         }
       }
      }    
  }
</style>
