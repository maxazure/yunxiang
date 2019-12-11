<template>
  <div class="card-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <el-button style="float: right;" type="primary">保存</el-button>
        <el-button style="float: right;" type="primary">保存</el-button>
      </div>
      <slot />
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  props: { title: String },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .card-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: 100vh;
    .box-card {
    }
  }
</style>
