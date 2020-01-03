<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>修改品牌</h3>
      <el-form
        ref='yForm'
        :model='brandForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>
          
          <el-col :span="12">
         <el-form-item label='名称:' prop='name'>
          <component  is='YInput'  v-model='brandForm.name'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('brandForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getBrand, putBrand } from '@/api/brand';

import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
    brandForm: {},
  //  apiList
  
     
    //  rules
    rules: {name:[
      {required:true,
        message:'请输入名称',
        trigger:'blur'},
      ],
    }
        }
  },
  created() {
    this.get()
  //    getApiList
  
   

  },
  mounted() {},
  methods: {
    async get() {
      const response = await getBrand(this.$route.query.id);
      this.brandForm = response.data;
    },
//    getApiList

          


    async api() {
      const res = await putBrand(this.brandForm.id,this.brandForm);
      if(res.code === '200') {
      this.$router.push({ path: '/infoManagement/brands' });
      }
    },
    async submit(brandForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          return false;
        }
      });
    },
    back() {
      history.back()
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
