<template>
  <el-switch
    v-model="result"
    @change="change"
  />
</template>
<script>
export default {
  props: { value: Boolean },
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
    .ySwitch {
    }
</style>
