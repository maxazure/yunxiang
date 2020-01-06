<template>
  <div>
    <el-select
      v-model="result"
      filterable
      allow-create
      default-first-option
      :placeholder="placeholder"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-popover
      v-model="popVisible"
      placement="right"
      width="180"
    >
      <slot name="text" />
      <el-input v-model="newId" size="mini" />
      <div style="text-align: right; margin:5px 0">
        <el-button size="mini" type="text" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="confirm">确定</el-button>
      </div>
      <span slot="reference" />
    </el-popover>
  </div>
</template>
<script>
export default {

  props: {
    value: { type: String, required: true, default: '' },
    options: { type: Array, required: true, default: () => [] },
    placeholder: { type: String, default: '请选择' }
  },
  data() {
    return {
      result: this.value,
      popVisible: false,
      newId: ''
    }
  },
  watch: {
    value(val) {
      this.result = val
    }
  },
  methods: {
    change() {
      this.$emit('input', this.result)
      const isInOptions = this.options.find(item => item.value === this.result)
      if (!isInOptions) {
        this.popVisible = true
      }
    },
    cancel() {
      this.result = ''
      this.$emit('input', this.result)
      this.popVisible = false
    },
    confirm() {
      this.popVisible = false
      this.$emit('confirm', this.newId, this.result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .selectInput {
  }
</style>
