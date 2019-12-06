<template>
  <div class="yTable">
    <el-table :data="tableData" border style="width: 100%" :header-row-style="tableHeaderColor">
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
        this.pagination.pageSizes = [10, 20, 30, 40, 50];
      }
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "color: rgb(245, 245,245);font-weight: 300;height:20px";
      }
    }
  }
};
</script>
<style lang='scss' >
$border: #9bc2db;

.yTable {
  padding: 10px 0;
  // 设置边框
  .el-table--border:after,
  .el-table--group:after,
  .el-table:before {
    background-color: $border;
  }
  .el-table--border,
  .el-table--group {
    border-color: $border;
  }
  .el-table {
    font-size: 12px;
    border-color: $border;

    td {
      padding: 0;
      border-color: $border;
    }
    th {
      padding: 4px 0;
      border-color: $border;
      background-color: #448cbb;
    }
    .el-button {
      color: #448cbb;
    }
  }

  .el-pagination {
    padding: 10px 0;
  }
}
</style>