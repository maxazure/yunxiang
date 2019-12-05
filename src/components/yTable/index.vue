<template>
  <div class="mTable">
    <el-table :data="tableData" style="width: 100%">
      <slot></slot>
    </el-table>
    <el-pagination
      background
      :layout="pagination.layout"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      @size-change="changePageSize"
      @current-change="changePage"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: Array,
    pagination: Object
  },
  created() {
    this.setPaginationDefault();
  },
  methods: {
    changePage(page) {
      this.pagination.pageNumber = page;
      this.$emit("changePage4List");
    },
    changePageSize(val) {
      this.pagination.pageSize = val;
      this.$emit("changePage4List");
    },
    setPaginationDefault() {
      if (!this.pagination.layout) {
        this.pagination.layout = "total, prev, pager, next, jumper, sizes";
      }
      if (!this.pagination.pageSizes) {
        this.pageSize.pageSizes = [10, 20, 30, 40, 50];
      }
    }
  }
};
</script>