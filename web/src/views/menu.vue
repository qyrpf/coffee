<template>
    <div> 
      <el-row class="menu-container" :gutter="10">
         	<div class="menu-nav">
            <dl>
              <dt>菜单:</dt>
              <dd v-for="(item,index) in categories" :key="index">
                <a href="javascript:;" @click="setCategory(item._id)" :class="{'nav-active':categoryId == item._id}">{{item.categoryName}}</a>
              </dd>
            </dl>                		
         	</div>
        <el-col class="menu-list">
          <el-col :xs="24" :sm="8" :md="6" :lg="4" v-for="(item,index) in menuList" :key="index">
             <div class="menu-item">
                <div class="pic">
                   <img v-lazy="item.productImage">
                </div>
                <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">￥{{item.salePrice}}</div>
                  <div class="btn-area">
                     <a  @click="addCart(item)">
                      <i class="el-icon-circle-plus icon"></i>
                    </a>
                  </div>
                </div>                         
             </div>
           </el-col>
        </el-col> 
      </el-row>    
        <div class="view-more-normal"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-immediate-check=false
             infinite-scroll-distance="20">
            <img src="/static/img/loading.gif" v-show="loading">
        </div>
     </div>
</template>
<script>
	export default{
		data(){
			return{
        categories:[],
        categoryId:'',
        menuList:[],
        busy:true,
        loading:false,
        page:1,
        pageSize:18,
			}
		},
		async created(){
			await this.getCategoryList();
			await this.setCategory(this.categoryId);
		},
		methods:{
		  async getCategoryList(){
        const res = await this.$http.get('/web/categories');
        this.categories = res.data;
        this.categories.unshift({
        	_id:'',
        	categoryName:'全部'
        })
		  },
		  setCategory(categoryId){
		  	this.page = 1;
        this.categoryId = categoryId;
        this.getMenuList();
		  },
		  async getMenuList(){
		  	let params = {
		  		page:this.page,
		  		pageSize:this.pageSize
        }
        if(this.categoryId){
          params.categoryId = this.categoryId;
        }
        const res = await this.$http.get('/admin/goods/paging',{params:params});
        this.loading = false;
        if(this.page > 1){
         	this.menuList = this.menuList.concat(res.data.list);	
         	this.busy = false;
         	if(res.data.count == this.pageSize){
         		this.busy = false;
         	}else{
         		this.busy = true;
         	}		  		
		  	}else{
		  		this.menuList = res.data.list;
          this.busy = false;
		  	} 
		  },
		  loadMore() {
        this.busy = true;
        this.loading = true;
        setTimeout(() => {
          this.page ++;
          this.getMenuList();
        }, 1000);
      },
      async addCart(item){
        const res = await this.$http.post('/users/addCart',{
          productId:item._id,
          productName:item.productName,
          productImage:item.productImage,
          salePrice:item.salePrice
        });  
          alert('添加成功')      
          this.$store.commit('updateCartCount',1);  
      }      
		}
	}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.menu-container{
  display: flex;
  .menu-nav{
    width: 230px;
    padding: 0 20px 0 20px;
    font-size: $font-size-md;
    transition: right .5s ease-out;
    dl{
      min-height: 180px;
      margin-bottom: 50px;
      dt{
        margin-bottom: 30px;
        font-weight: bold;
      }
      dd{
         margin: 20px 0;
         a{
          padding: 5px 0;
          display: block;
          transition: padding-left .3s ease-out;
         }
         a:hover,.nav-active{
          border-left: 2px solid $link-menu-color;
          color:$link-menu-color;
          transition: padding-left .3s ease-out;
          padding-left: 15px;
         }
      }   
    }
  } 
  .menu-list{
    padding-left:230px;
    .menu-item{
      position: relative;
      background-color: #fff;
      border: 2px solid #f3f3f3;
      border-radius:10px;
      overflow: hidden;
      .pic{ 
        img{
           width: 100%;
           overflow: hidden;
        }
      }
      .main{
        width: 100%;
        .name,.price,.btn-area{
          margin: 10px;
          font-size: $font-size-md;
        }
        .name{   
          font-weight: bold;
        }
        .price{
          display: inline-block;
          color: $link-active-color;
        }
        .btn-area{
          display: inline-block;
          float: right;
        }
      }
    }
  } 
}


@media only screen and (max-width: 768px){
  .menu-list{
    .menu-item{
      display: flex;
      .pic{
        width: 100px;
        img{
          width: 100%;
        }
      }
    }

  }
}
.view-more-normal{
  img{
  display:block;
  width:50px;
  margin:20px auto;
  }
}
</style>
