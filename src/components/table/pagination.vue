<template>
  <div class="pagination">
    <div class="pagination-container">
      <el-pagination
        background
        :layout="pageObj.layout"
        :total="pageObj.total"
        :page-size="pageObj.pageSize"
        :page-sizes="pageObj.pageSizes"
        @size-change="handleSizeChange"
        @current-change="changePage"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    pageObj: {}

  },
  data() {
    return {}
  }, computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    changePage(page) {
      this.pageObj.pageNumber = page
      this.$emit('changePage')
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val
      this.$emit('changePage')
    },
    init() {
      if (!this.pageObj.layout) {
        this.pageObj.layout = 'total, prev, pager, next, jumper, sizes'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .pagination {
  }
</style>
