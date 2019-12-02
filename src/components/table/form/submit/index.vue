<template>
  <div class="submit">
    <el-button type="primary" @click="submit">查询</el-button>
  </div>
</template>
<script>
export default {
  components: {},
  props: { submitObj: { data: {} }, formList: Array },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submit() {
      console.log("submit");
      console.log(this.submitObj);
      console.log(this.formList);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
