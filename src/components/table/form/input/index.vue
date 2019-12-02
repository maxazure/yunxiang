<template>
  <div class="input">
    <el-input v-model="inputObj.value" :placeholder="inputObj.placeholder"></el-input>
  </div>
</template>
<script>
export default {
  components: {},
  props: { inputObj: {} },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
      this.init()
  },
  mounted() {},
  methods: {
    init() {
      if (!this.inputObj.placeholder) {
        this.inputObj.placeholder = "请输入内容";
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
