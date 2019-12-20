<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新产品表</h3>
      <el-form
        ref='yForm'
        :model='productForm'
        :rules='rules'
        label-width='100px'

      >
        <el-row>
          
          <el-col :span="12">
            <el-form-item label='产品编号:' prop='sku'>
              <component  is='dragInput'  v-model='productForm.sku'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='产品名称:' prop='product_name'>
              <component  is='dragInput'  v-model='productForm.product_name'
               />
            </el-form-item>
          </el-col>
          
        <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('productForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addProduct } from '@/api/product';
import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
      productForm: {  },
    //  apiList
  
     
     

      rules: {sku:[
        {required:true,
          message:'请输入产品编号',
          trigger:'blur'},
      ],
      product_name:[
        {required:true,
          message:'请输入产品名称',
          trigger:'blur'},
      ],
      }
    };
  },
  created() {
    //    getApiList
  
     
     

  },
  mounted() {},
  methods: {
    async api() {
      this.$router.push({ path: '/products' });
      const res = await addProduct(this.productForm);
    },
    async submit(productForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        } else {
          return false;
        }
      });
    },

//    getApiList








back() {
      this.$router.push({ path: '/products' });
    }
  }
};
</script>
<style lang='scss' scope>
.card-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: 100vh;
  .box-card {

  }
}
</style>
