<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改产品信息</h3>
      <edit-product-form ref="editForm" @submitAfter="submitAfter">
        <template slot="operation">
          <el-col>
            <div class="float-right">
              <el-form-item>
                <el-button @click="submit">提交</el-button>
                <el-button @click="back">返回</el-button>
              </el-form-item>
            </div>
          </el-col>
        </template>
      </edit-product-form>
    </el-card>
  </div>
</template>

<script>
import EditProductForm from '../../components/product/editForm'

export default {
  components: { EditProductForm },
  methods: {
    back() {
      history.back()
    },
    submitAfter() {
      this.$router.push({ path: '/infoManagement/products' })
    },
    submit() {
      this.$refs.editForm.submit()
    }
  }

}
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
