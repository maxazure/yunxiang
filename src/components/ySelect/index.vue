<template>
  <el-select v-model="val" placeholder="请选择" @change="handleChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import request from "@/utils/request";
export default {
  props: { url: { type: String }, val: String },
  data() {
    return {
      options: []
    };
  },
  created() {
    this.get();
  },
  mounted() {},
  methods: {
    async get() {
      const res = await request({ url: this.url, method: "get" });
      res.data.forEach(item => {
        this.options.push({ value: item.id, label: item.name });
      });
    },
    handleChange() {
      this.$emit("update:val", this.val);
    }
  }
};
</script>
