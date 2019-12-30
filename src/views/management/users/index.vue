<template>
  <div class="app-container">
    <el-button @click="add">新用户</el-button>
    <y-table :tableData="tableData" :pagination="pagination" @changePage4List="getList">
      <template>
        <el-table-column prop="name" label="姓名" width="100px"></el-table-column>
        <el-table-column prop="username" label="用户名" width="140px"></el-table-column>
        <el-table-column prop="phone" label="电话" width="100px"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200px"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="100px"></el-table-column>
        <el-table-column prop="company_name" label="公司"></el-table-column>

        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="edit(row.username)">修改</el-button>
            <el-button type="text" size="small" @click="del(row.username)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>

<script>
import { getUsers, delUser } from "@/api/user";
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
      const response = await getUsers({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      });
      this.tableData = response.data.list;
      this.pagination.total = parseInt(response.data.pagination.total);
    },

    add() {
      this.$router.push({ path: "users/add" });
    },
    edit(username) {
      this.$router.push({ path: "users/edit", query: { username: username } });
    },
    del(username) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser(username).then(response => {
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

<style lang='scss' scope>
.app-container {
}
</style>
