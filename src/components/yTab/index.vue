<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <slot />
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return { activeName: 'first' }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="scss">
  .tab-container {

  }
</style>
