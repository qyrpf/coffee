<template>
<div>
 <el-header>
 后台管理系统   
</el-header>
 <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="240px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1', '2']" :default-active="$route.path">
    	<el-menu-item index="/orderList">订单列表</el-menu-item>
        <el-submenu index="1">
          <template slot="title">菜单列表</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/creatCategory">新建分类</el-menu-item>
            <el-menu-item index="/categoryList">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">饮品</template>
            <el-menu-item index="/menuCreat">新增饮品</el-menu-item>
            <el-menu-item index="/menuList">饮品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/adviceList">意见反馈</el-menu-item> 
        <el-menu-item index="/userList">用户管理</el-menu-item>        
    </el-menu>
  </el-aside>
  <router-view></router-view>
</el-container>
</div>
</template>
<style>
  .el-header {
    line-height: 60px;
    font-size:20px;
  }
</style>
