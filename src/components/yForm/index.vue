<template>
  <div class="yForm">
    <el-card class="box-card">
      <h3>{{title}}</h3>
      <el-form
        ref="yForm"
        :model="formData"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
        <slot></slot>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: { title: String, formData: Object, rules: Object },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    check() {
      return this.$refs.yForm.validate();
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
    width: 600px;
  }
}
</style>