<template>
  <el-select v-model="value" placeholder="请选择" @change="handleChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
import request from '@/utils/request'

export default {
  props: { url: { type: String }, value: String },
  data() {
    return {
      options: []
    }
  },
  created() {
    this.get()
  },
  watch: {
    value(val) {
      this.result = val
    }
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await request({ url: this.url, method: 'get' })
      this.options.push = res.data
    },
    handleChange() {
      this.$emit('input', this.value)
    }
  }
}
</script>
