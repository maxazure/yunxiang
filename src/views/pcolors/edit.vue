<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>修改颜色</h3>
      <el-form
        ref='yForm'
        :model='pcolorForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>

          <el-col :span="12">
         <el-form-item label='颜色名称:' prop='name'>
          <component  is='YInput'  v-model='pcolorForm.name'



           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='颜色代码:' prop='code'>
          <component  is='YInput'  v-model='pcolorForm.code'



           />
        </el-form-item>
          </el-col>

          <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('pcolorForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getPcolor, putPcolor } from '@/api/pcolor';

import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
    pcolorForm: {},
  //  apiList



    //  rules
    rules: {name:[
      {required:true,
        message:'请输入颜色名称',
        trigger:'blur'},
      ],
    code:[
      {required:true,
        message:'请输入颜色代码',
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
      const response = await getPcolor(this.$route.query.id);
      this.pcolorForm = response.data;
    },
//    getApiList






    async api() {
      const res = await putPcolor(this.pcolorForm.id,this.pcolorForm);
      if(res.code === '200') {
      this.$router.push({ path: '/infoManagement/pcolors' });
      }
    },
    async submit(pcolorForm) {
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
      this.$router.push({ path: '/infoManagement' });
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
