<template>
	<el-main>
      <h3 style="margin: 10px">用户列表</h3>
      <el-table :data="userList" height="500px">
        <el-table-column prop="_id" label="ID" width="300px">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="100px">
        </el-table-column>
        <el-table-column prop="userName" label="创建时间" width="200px">
          <template slot-scope="scope">{{getTime(scope.row.creatTime)}}</template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click='remove(scope.row._id)'>注销</el-button>
            </template>
         </el-table-column>
      </el-table>
    </el-main>

</template>
<script>
import 'util'
export default{
  data () {
    return {
     userList:[]
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      const res = await this.$http.get('admin/users',{status:0},{_id:1,userName:1,creatTime:1});
    	this.userList = res.data;
    },
    async remove (id) {
      try{
        await this.$confirm('此操作将永久注销该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        });
        const res = await this.$http.post('admin/users/delete', {id});
        this.init();              
      }catch(e){

      }
    },
     getTime(time){
       return new Date(time).Format("yyyy-MM-dd");
     }
  }
}
</script>
