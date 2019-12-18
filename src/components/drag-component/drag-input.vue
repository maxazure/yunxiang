<template>
  <el-input  v-model="result" placeholder="请输入"  @input="input" />
</template>
<script>
export default {
  components: {},
  props: { value: String },
  data() {
    return {
      result: this.value
    }
  },
  computed: {},
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    input() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
