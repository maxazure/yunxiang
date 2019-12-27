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
         <el-form-item label='分类名称:' prop='name'>
          <component  is='dragInput'  v-model='catalogForm.name'
            />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='备注:' prop='remark'>
          <component  is='dragInput'  v-model='catalogForm.remark'
            />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='上级ID:' prop='pid'>
          <component  is='dragInput'  v-model='catalogForm.pid'
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
        message:'请输入分类名称',
        trigger:'blur'},
      ],
    remark:[
      {required:true,
        message:'请输入备注',
        trigger:'blur'},
      ],
    pid:[
      {required:true,
        message:'请输入上级ID',
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
      this.$router.push({ path: '/catalogs' });
      const res = await putCatalog(this.catalogForm.id,this.catalogForm);
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
      this.$router.push({ path: '/catalogs' });
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
