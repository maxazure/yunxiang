<template>
  <el-input-number
    v-model="result"
    controls-position="right"
    :min="1"
    :max="100"
    @change="handleChange"
  />
</template>
<script>
export default {
  props: { value: Number },
  data() {
    return { result: this.value }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .drag-number {
  }
</style>
