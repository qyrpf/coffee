<template>
   <div>
      <div class="coffee-1">
            <img src="../../static/img/白色logo.png" >         
      </div>
      <div class="coffee-2">
         <span class="title">咖啡背景</span>
         <transition name="text">
            <span class="text" v-show="scrollTop>100">
               &nbsp;&nbsp;&nbsp;&nbsp;“咖啡”一词源自阿拉伯语“قهوة”，意思是“植物饮料”。在世界各地，人们越来越爱喝咖啡。随之而来的“咖啡文化”充满生活的每个时刻。无论在家里、还是在办公室、或是各种社交场合，人们都在品着咖啡、它逐渐与时尚、现代生活、工作和休闲娱乐联系在一起。
               <br>
               &nbsp;&nbsp;&nbsp;&nbsp;当地土著人经常把咖啡树的果实磨碎，再把它与动物脂肪掺在一起揉捏，做成许多球状的丸子。这些土著部落的人将这些咖啡丸子当成珍贵的食物，专供那些即将出征的战士享用。直到11世纪左右，人们才开始用水煮咖啡作为饮料。13世纪时，埃塞俄比亚军队入侵也门，将咖啡带到了阿拉伯世界。因为伊斯兰教义禁止教徒饮酒，有的宗教界人士认为这种饮料刺激神经，违反教义，曾一度禁止并关闭咖啡店，但埃及苏丹认为咖啡不违反教义，因而解禁，咖啡饮料迅速在阿拉伯地区流行开来。咖啡Coffee这个词，就是来源于阿拉伯语“قهوة（qahwa）”，意思是“植物饮料”，后来传到土耳其，成为欧洲语言中这个词的来源。咖啡种植，制作的方法也被阿拉伯人不断地改进而逐渐完善
            </span>            
         </transition>
      </div>
      <div class="coffee-3">
         <img src="../../static/img/4.jpg" alt="">
         <div class="right-content">       
         <transition name="text">
            <div v-show="scrollTop>800">
              <span class="title">咖啡种类</span> 
              <span class="text" >
                 美式咖啡Americano / 拿铁咖啡Caffé Latte / 卡布奇诺Cappuccino /摩卡咖啡Caffé Mocha
                 古巴咖啡<br/>
              </span> 
              <span class="title" >主要成分
              </span> 
              <span class="text">           
                 糖类、脂肪、蛋白质、纤维素、单宁、灰分、水分、咖啡因。
              </span>                           
            </div>
        
         </transition>


         </div> 
   
      </div>       
   </div>
</template>
<script>
 export default{
    data(){
       return{
          scrollTop:0
       }
    },
    created(){
        window.addEventListener('scroll',()=>{
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        })
    },
    methods:{
      handleScroll () {
        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
     }
    }
 }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
 .text-enter{
    opacity: 0;
    transform: translateY(200px);
    
 }
 .text-enter-active{
    transition: all 2s;
 }

.coffee-1{
   height: 600px;
   background: url('../../static/img/1.jpg');
   display: flex;
   justify-content: center;
   align-items: center; 
   img{
     opacity: 1;
     animation:logo 2s;
   }

  @keyframes logo
  {
   from {opacity: 0; transform: scale(2);}
   to {opacity: 1; transform: scale(1);}
  } 
}
.coffee-2{
   width: 100%;
   height:640px;
   background: url('../../static/img/3.jpg') no-repeat;
   background-size: cover;
   .title{
      font-size: $font-size-lg;
      margin: 20px auto;
      width: 80px;
      padding-bottom: 10px;
      border-bottom: 4px solid $link-active-color;
      display: block;     
   }
   .text{
      display: block;
      line-height: 30px;
   }
}
.coffee-3{
    background-color: #161515;
    width: 100%;
    height: auto;
    display: flex;
    .right-content{
      .title{
         width: 80px;
         padding-top: 20px;
         padding-bottom: 20px;
         border-bottom: 2px solid #6f3b27;
         display: block;
         margin-top: 20px;
         font-size: $font-size-lg;
         color: #fff; 
      } 
      .text{
         display: block;
         color: #fff;
         line-height: 30px;
         padding: 10px;
      }
    }

}
@media only screen and(max-width:1230px){
  .coffee-3{
     display: block;
     width: 100%;
     position: relative;
     height: auto;
    img{
       width: 100%;
       height: auto;
       opacity: 0.5;
    }
    .right-content{
       display: block;
       position: absolute;
       top: 0;
       .title{
          margin:0 auto;
       }
    }
  }   
}
</style>