<template>
  <el-radio-group v-model="result" @change="change">
    <el-radio v-for="item of options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>
<script>

export default {
  props: {
    value: String,
    options:
        {
          type: Array,
          require: false,
          default: () =>
            [
              { value: '1', label: '选项1' },
              { value: '2', label: '选项2' },
              { value: '3', label: '选项3' }
            ]
        }
  },
  data() {
    return {
      result: this.value
    }
  },
  created() {
  },
  watch: {
    value(val) {
      this.result = val
    }
  },
  methods: {
    change() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .drag-radio {
  }
</style>
