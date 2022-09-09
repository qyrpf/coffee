<template>
    <div class="about">
    	<h3 style="margin: 30px">{{model.id?'编辑':'新建'}}分类</h3>
    	<el-form label-width="120px" @submit.native.prevent="save">
    		<el-form-item label="名称">
    			<el-input v-model="model.categoryName"></el-input>
    		</el-form-item>
    		<el-form-item>
    			<el-button type="primary" native-type="submit">保存</el-button>
    		</el-form-item>
    	</el-form>
    </div>
</template>
<script>
export default{
  data () {
    return {
      model: {id: '', categoryName: ''}
    }
  },
  created () {
    this.$route.query.id && this.fetch()
  },
  methods: {
    async save(){
      let res;
        if (!this.model.id) {
          res = await this.$http.post(`admin/categories/add`, this.model);
        }else{
          res = await this.$http.put(`admin/categories/edit/${this.model.id}`, this.model);
        }
        this.$router.push('/categoryList');
    },
    async fetch(){
    	this.model.id = this.$route.query.id
    	const res = await this.$http.get(`admin/categories/${this.model.id}`);
      this.model.categoryName = res.data.categoryName;
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
