<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新尺码</h3>
      <el-form
        ref='yForm'
        :model='psizeForm'
        :rules='rules'
        label-width='100px'

      >
        <el-row>
          
          <el-col :span="12">
            <el-form-item label='名称:' prop='name'>
              <component  is='YInput'  v-model='psizeForm.name'
               />
            </el-form-item>
          </el-col>
          
        <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('psizeForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addPsize } from '@/api/psize';
import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
      psizeForm: {  },
    //  apiList
  
     

      rules: {name:[
        {required:true,
          message:'请输入名称',
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
      const res = await addPsize(this.psizeForm);
      if (res.code === '200') {
      this.$router.push({ path: '/psizes' });
      }
    },
    async submit(psizeForm) {
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
      this.$router.push({ path: '/psizes' });
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
