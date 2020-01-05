<template>
  <div class="card-container">
    <test-form ref="form" @submitSuccess="submit" :form="form">
      <template slot="formitem">
        <el-form-item label="地址:" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="啥:" prop="address">
          <el-input v-model="form.some" />
        </el-form-item>
      </template>
      <template slot="operate">
        <el-button @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </template>
    </test-form>
  </div>
</template>

<script>
import testForm from './comForm'

export default {
  components: { testForm },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    back() {
      history.back()
    },
    submit() {
      this.$refs.form.submit()
    },
    submitAfter() {
      console.log('提交成功')
    }
  }
}
</script>
<style lang='scss' scope>
  .card-container {

  }
</style>
