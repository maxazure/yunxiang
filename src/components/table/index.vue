<template>
  <div>
    <m-form :formList="formList"></m-form>
    <el-table :data="tableObj.tableData" border style="width: 100%">
      <el-table-column
        v-for="(o,i) in tableObj.tableHead"
        :key="o.id"
        :index="i"
        :prop="tableObj.tableFiled[i]"
        :label="o"
      />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">添加</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <m-pagination :page-obj="pageObj" @changePage="changePage" />
  </div>
</template>

<script>
import mPagination from "@/components/table/pagination";
import mForm from "@/components/table/form";

export default {
  components: { mPagination,mForm },
  props: {
    formList: Array,
    tableObj: Object,
    pageObj: Object
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(row) {
      this.$router.push({
        path: "detail",
        query: {
          id: row.id
        }
      });
    },
    changePage() {
      this.$emit("changePage");
    }
  }
};
</script>
