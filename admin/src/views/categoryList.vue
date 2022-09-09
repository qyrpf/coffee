<template>
<div>
	<h3 style="margin-left: 10px">分类列表</h3>
	<el-main>
      <el-table :data="categoryList" height="300px" style="width: 100%">
        <el-table-column prop="_id" label="ID" width="300px">
        </el-table-column>
        <el-table-column prop="categoryName" label="名称" width="200px">
        </el-table-column>
        <el-table-column
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click='$router.push(`/categoryEdit?id=${scope.row._id}`)'>编辑</el-button>
              <el-button type="primary" size="small" @click='remove(scope.row._id)'>删除</el-button>
            </template>
         </el-table-column>
      </el-table>
    </el-main>
</div>
</template>
<script> 
export default{
  data () {
    return {
      model: {},
      categoryList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init(){
      const res = await this.$http.get('admin/categories');
      this.categoryList = res.data;
    },
    async remove (id) {
      await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      });
      const res = await this.$http.post('admin/categories/delete', {id: id});
      this.init();              
    }
  }
}
</script>
