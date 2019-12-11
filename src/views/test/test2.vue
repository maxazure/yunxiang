<template>
  <div class="test2">
    <y-tab>
      <template>
        <el-tab-pane label="配置管理" name="first">
          <add></add>
        </el-tab-pane>
        <el-tab-pane label="配置管理2" name="second">
          配置管理2
        </el-tab-pane>
      </template>
    </y-tab>

  </div>
</template>
<script>
import yTab from '@/components/yTab'
import add from '@/views/members/add'
import edit from '@/views/members/edit'

export default {
  components: { yTab ,add},
  data() {
    return { test2: '标题' }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .test2 {
  }
</style>
