<template>
  <el-date-picker
    v-model="result"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="change"
  />
</template>
<script>
export default {
  props: { value: Array },
  data() {
    return { result: this.value }
  },
  methods: {
    change() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .drag-datepicker {
  }
</style>
