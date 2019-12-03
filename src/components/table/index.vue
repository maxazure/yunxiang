<template>
  <div class="container">
    <m-form :formList="formList" v-on:submit="submit"></m-form>
    <el-table :data="tableObj.tableData" border style="width: 100%">
      <el-table-column
        ref="col"
        v-for="(o,i) in tableObj.tableHead"
        v-if="o!='key'"
        :key="o.id"
        :index="i"
        :prop="tableObj.tableFiled[i]"
        :label="o"
      ></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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
  components: { mPagination, mForm },
  props: {
    formList: Array,
    // tableObj: { tableData: [], tableFiled: [], tableHead: [] },
    tableObj: Object,
    pageObj: Object
  },
  data() {
    return {};
  },
  created() {
    this.style();
  },
  watch: {},
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
    },
    submit() {
      console.log("table submit");
      console.log(this.formList);
    },
    style() {
      console.log(this.$refs.col);
    },
    del(row) {
      console.log(row)
      this.$emit("del",row);
    }
  }
};
</script>
<style lang="scss">
.container {
}
</style>
