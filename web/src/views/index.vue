<template>
   <div class="pages">
     <my-header></my-header>     
     	<div class="container">
        <router-view></router-view>
      </div>
     <my-footer></my-footer> 
   </div>
</template>
<script>
	import MyHeader from '@/components/header';
	import MyFooter from '@/components/footer';
	export default{
     components:{
     	MyHeader,
     	MyFooter
     }
	}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
.container{
  padding-top:$header-height;
}
</style>