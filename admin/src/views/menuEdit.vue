<template>
    <div class="about">
      <h3 style="margin: 30px">{{model._id?'编辑':'新建'}}饮品</h3>
      <el-form label-width="120px">
        <el-form-item label="分类">
          <el-select v-model="model.categoryId">
            <el-option v-for="item in categories" :key="item._id" :label="item.categoryName"  :value='item._id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="model.productName"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="model.salePrice"></el-input>
        </el-form-item>        
        <el-form-item label="图片">
          <el-upload
                    class="avatar-uploader"
                    action="admin/goods/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    >
                <img v-if="model.productImage" :src="model.productImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default{

  data () {
    return {
      model: {},
      categories: []
    }
  },
  created () {
    this.$route.query.id && this.fetch()
    this.fetchCategories()
  },
  methods: {
    save () {
      let res;
      if (!this.model._id) {
        res = this.$http.post(`admin/goods/add`, this.model)
      }else{
        res = this.$http.put(`admin/goods/edit/${this.model._id}`, this.model)
      }
      res.then((res) => {
        this.$router.push('/menuList');
      })
    },
    async fetch(){
      this.model._id = this.$route.query.id
      const res = await this.$http.get(`admin/goods/${this.model._id}`);
      this.model = res.data;
    },
    async fetchCategories(){
      this.model._id = this.$route.query.id
      const res = await this.$http.get('admin/categories');
          this.categories = res.data
    },
    handleAvatarSuccess(res){
      this.$set(this.model, 'productImage', res.url);
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
