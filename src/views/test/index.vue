<template>
  <div class="card-container">
        <test-form ref="form" :form="form" @submit="submitAfter">
          <template slot="form">
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
<!--    <select-year v-model="test" />-->
<!--    <select-year />-->
  </div>
</template>

<script>
import testForm from './testForm'
import selectYear from '../../components/selectYear'

export default {
  components: { selectYear, testForm },
  data() {
    return {
      form: {},
      test: '2000'
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
