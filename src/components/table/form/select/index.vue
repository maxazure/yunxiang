<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { selectCompanies } from "@/api/user";
export default {
  props: { api: { type: Function, default: () => null } },
  data() {
    return {
      options: [],
      value: ""
    };
  },
  watch: {
    value: {
      handler: "get",
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    async get() {
      const res = await this.api();
      console.log(res)
      res.forEach(item => {
        this.options.push({ value: item.name, label: item.name });
      });
    }
  }
};
</script>
