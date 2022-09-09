<template>
	<el-main>
      <h3 style="margin: 10px">饮品列表</h3>
      <el-table :data="menuList" height="500px">
        <el-table-column prop="_id" label="ID" width="240px">
        </el-table-column>
        <el-table-column prop="categoryId.categoryName" label="类名">
        </el-table-column>
        <el-table-column prop="productImage" label="图片">
        	<template slot-scope="scope">
        		<img v-lazy="scope.row.productImage" style="height: 50px;">
        	</template>
        </el-table-column>
        <el-table-column prop="productName" label="名称" >
        </el-table-column>
        <el-table-column prop="salePrice" label="价格">
        </el-table-column>        
        <el-table-column
            label="操作"
            width="400">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click='$router.push(`/menuEdit?id=${scope.row._id}`)'>编辑</el-button>
              <el-button type="primary" size="small" @click='remove(scope.row._id)'>删除</el-button>
            </template>
         </el-table-column>
      </el-table>
    </el-main>

</template>
<script>
export default{
  data () {
    return {
      model: {},
      menuList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      const res = await this.$http.get('admin/goods');
    	this.menuList = res.data
    },
    async remove (id) {
      await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      });
      const res = await this.$http.post('admin/goods/delete', {id: id});
      this.init();              
    }
  }
}
</script>
