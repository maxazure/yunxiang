<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新品类</h3>
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
            <el-form-item label='上级ID:' prop='pid'>
              <component  is='YInput'  v-model='catalogForm.pid'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='品类编码:' prop='catalog_id'>
              <component  is='YInput'  v-model='catalogForm.catalog_id'
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
  import { addCatalog } from '@/api/catalog';
  import request from '../../utils/request'

  export default {
    components: {
    },
    data() {
      return {
        catalogForm: {  },
        //  apiList






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
          pid:[
            {required:true,
              message:'请输入上级ID',
              trigger:'blur'},
          ],
          catalog_id:[
            {required:true,
              message:'请输入品类编码',
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
        const res = await addCatalog(this.catalogForm);
        if (res.code === '200') {
          this.$router.push({ path: '/infoManagement/catalogs' });
        }
      },
      async submit(catalogForm) {
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
        this.$router.push({ path: '/infoManagement/catalogs' });
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
