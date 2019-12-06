<template>
  <div class="app-container">
    <el-button @click="add">新角色</el-button>
    <y-table :tableData="tableData" :pagination="pagination" @changePage4List="getList">
      <template>
        <el-table-column prop="key" label="编号" width="100px"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="edit(row.id)">修改</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>

<script>
import { getRoles, delRole } from "@/api/role";
import yTable from "@/components/yTable";
export default {
  components: { yTable },
  data() {
    return {
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const response = await getRoles({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      });
      this.tableData = response.data.list;
      this.pagination.total = response.data.pagination.total;
    },

    add() {
      this.$router.push({ path: "roles/add" });
    },
    edit(id) {
      this.$router.push({ path: "roles/edit", query: { id: id } });
    },
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delRole(id).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scope>
</style>