<template>
	<header>
    <div class="header-container container">
    	<div class="header-left">
            <a @click="overlayFlag = true">
              <img src="static/img/logo.png" alt="" class="header-logo">   
            </a>	
    	</div>
    	<div class="header-center" :class="{'nav-show':overlayFlag}">
	      <ul class="nav-list">
	      	<li class="nav-item" v-for = "(item,index) in headOpts" @click="overlayFlag=false">
	      		<router-link 
	      		:to="item.path" 
	      		:class="{'nav-active':$route.path == item.path}"
	      		>
	      	   {{item.name}}	   
	             </router-link>
	      	</li> 
	      </ul> 
    	</div>
    	<div class="header-right">
            <div class="user-item">
                <router-link to="/cart" class="cart nav-active">
                    <div class="el-badge">
                      <i class="el-icon-shopping-cart-2"></i>
                      <sup v-show="cartCount" class="el-badge__content el-badge__content--undefined is-fixed">{{cartCount}}</sup>  
                    </div>   
                </router-link>
            </div>          
            <div class="user-item">
                <template v-if="nickName">
                    <a href="javascript:;" class="user-name nav-active">
                        {{nickName}}                                
                    </a>
                    <a href="javascript:;" to="/exit" class="exit" @click="loginOut">[退出登录]</a>   
                </template>
                <template v-else>
                   <a href="javascript:;" @click="login">立即登录</a>
                   <a href="javascript:;"  @click="register">注册</a>
                </template>                 
            </div>	
    	</div>
    </div>
    <div class="overlay" v-show="overlayFlag" @click="overlayFlag = false"></div>    
    </header>
</template>
<script>
  export default{
	data(){
		return{
			navShow:false,
      overlayFlag:false,
      nickName:'',
			headOpts:[{
				name:'首页',
				path:'/'
			},{
				name:'菜单',
				path:'/menu'
			},{
			 	name:'我的订单',
			 	path:'/myOrders'
			 },{
			 	name:'意见反馈',
			 	path:'/advices'
			 }],		
		}
  },
  computed:{
    cartCount(){
      return this.$store.state.cartCount;
    }
  },
	created(){
    this.checkLogin();
	},
	methods:{
    login(){
      this.$router.push({path:`/login`});
    },
    register(){
      this.$router.push({path:`/register`})
    },         
	  loginOut(){ 
      localStorage.clear(); 
      this.$router.push({path:'/login'});    
    },
	  async checkLogin(){   
        const res = await this.$http.get('/login/check');
        this.$store.commit('initCartCount',res.data.cartCount);
        this.nickName = res.data.userName;
	    }
    }
  }
</script>
<style lang="scss">
  @import '@/assets/scss/index.scss';
  header{
   position: fixed;
   top: 0;
   z-index:999;
   background-color: $header-bgc;
   width: 100%;
   height: $header-height;
   margin-bottom: 20px;
  }
  .header-container{
    height: 100%; 
    .header-left {
      float: left;
      position:relative;
      img{
        height: $header-height;
      }
    }
    .header-center{
      float: left;
      width: 400px;
      margin:20px;
      ul{
        display: flex;
        justify-content: center;
        li{
          margin-right: 40px;
          a{
            margin-left: 5px;
            &:hover, &.nav-active{
              font-weight:bold;
              padding-bottom: 10px;
              color: $link-active-color;
            }
          }
        }
      }
    }
    .header-right{
      height: 100%;
      float: right;
      display: flex;
      align-items:center;
      .user-item{
        margin-right: 20px;
        .cart{
          i{
            font-size: $icon-font-size;
          }
          .el-badge__content{
            background-color: $link-active-color;
          }
        }
        a{
          margin: 1px;
          &:hover,&.nav-active{
             font-weight:bold;
             padding-bottom: 10px;
             color: $link-active-color;
          }
        }
      }
    }   
  
  }
  .overlay{
    display: none;
  }
  @media only screen and (max-width: 768px){
    .header-center{
      position:absolute;
      left: -500px;
      
      background-color:#fff;
      z-index: 999;
      ul{
       display: flex;
       flex-direction: column;
       padding-left:250px;
       li{
         margin: 20px;
       }
      }
      &.nav-show{
        left: -250px;
        margin:0px;
      }
    }
    .overlay{
      display: block;
    }
  }

</style>

