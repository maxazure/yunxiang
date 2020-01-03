<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>修改品类</h3>
      <el-form
        ref='yForm'
        :model='catalogForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>
          
          <el-col :span="12">
         <el-form-item label='品类:' prop='name'>
          <component  is='YInput'  v-model='catalogForm.name'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='备注:' prop='remark'>
          <component  is='YInput'  v-model='catalogForm.remark'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='上级ID:' prop='parent_id'>
          <component  is='YInput'  v-model='catalogForm.parent_id'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='品类编码:' prop='catalog_id'>
          <component  is='YInput'  v-model='catalogForm.catalog_id'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='深度:' prop='depth'>
          <component  is='YInput'  v-model='catalogForm.depth'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('catalogForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCatalog, putCatalog } from '@/api/catalog';

import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
    catalogForm: {},
  //  apiList
  
     
     
     
     
     
    //  rules
    rules: {name:[
      {required:true,
        message:'请输入品类',
        trigger:'blur'},
      ],
    remark:[
      {required:true,
        message:'请输入备注',
        trigger:'blur'},
      ],
    parent_id:[
      {required:true,
        message:'请输入上级ID',
        trigger:'blur'},
      ],
    catalog_id:[
      {required:true,
        message:'请输入品类编码',
        trigger:'blur'},
      ],
    depth:[
      {required:true,
        message:'请输入深度',
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
      const response = await getCatalog(this.$route.query.id);
      this.catalogForm = response.data;
    },
//    getApiList







    async api() {
      const res = await putCatalog(this.catalogForm.id,this.catalogForm);
      if(res.code === '200') {
      this.$router.push({ path: '/infoManagement/catalogs' });
      }
    },
    async submit(catalogForm) {
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
