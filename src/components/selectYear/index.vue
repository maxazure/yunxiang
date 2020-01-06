<template>
  <y-select v-model="result" :options="options" :disabled="disabled" @input="change" />

</template>
<script>
export default {
  components: {},
  props: {
    value: {
      type: String
    },
    disabled: Boolean
  },
  data() {
    return {
      result: this.value,
      options: []
      // once: true
    }
  },
  computed: {},
  watch: {
    value: {
      handler(val) {
        this.result = val
        //     // 只执行一次,否则每次修改后都会触发
        //     if (this.once) {
        //       this.initYear()
        //       this.once = false
        //     }
        //   immediate: true
      }
    }

  },
  created() {
    this.initYear()
  },
  mounted() {
  },
  methods: {
    initYear() {
      this.options = []
      const startYear = new Date().getFullYear() - 10
      for (let i = 0; i < 20; i++) {
        this.options.push({ value: startYear + i, label: startYear + i })
      }
    },
    change() {
      this.$emit('input', this.result.toString())
    }
  }
}
</script>

<style scoped lang="scss">
  .index {
  }
</style>
