<template>
  <div class="login-container">
    <el-card header="后台登录入口" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.userPsw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>      
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      model: {
        userName:'',
        userPsw:'',
        status:1
      }
    }
  },
  methods: {
    async login(){
      const res = await this.$http.post('/login', this.model)
      if(res.data.status=='402'){      
         this.$message({
           type: 'error',
           message: res.data.message
         })
      }else{
        localStorage.token = res.data.token
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
.login-card{
  width: 25rem;
  margin: 5rem auto;
}
</style>
