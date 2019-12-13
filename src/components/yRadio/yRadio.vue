<template>
  <el-radio-group v-model="value" @change="change">
    <el-radio v-for="item of options" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
  </el-radio-group>
</template>
<script>
import request from '../../utils/request'

export default {
  components: {},
  props: { url: String },
  data() {
    return {
      options: [],
      value: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await request({ url: this.url, method: 'get' })
      this.options = res.data
      console.log(res)
    },
    change() {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
  .yRadio {
  }
</style>
