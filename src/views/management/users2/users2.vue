<template>
  <div class="app-container">
    <el-button @click="add">新用户</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="text" size="small" @click="edit(row.username)">修改</el-button>
          <el-button type="text" size="small" @click="del(row.username)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  

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
</template>

<script>
import { getUsers, delUser } from "@/api/user";

export default {
  data() {
    return {
      tableData: [],
      pageObj: {
        layout: "total, prev, pager, next, sizes",
        total: 10,
        pageNumber: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getUsers({
        page: this.pageObj.pageNumber,
        pagesize: this.pageObj.pageSize
      }).then(response => {
        this.tableData = response.data.list;
        this.pageObj.total = response.data.pagination.total;
      });
    },
    edit(username) {
      console.log(username);
      this.$router.push({ path: "user2/edit", query: { username: username } });
    },
    del(username) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // method
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
    },

    changePage(page) {
      this.pageObj.pageNumber = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getList();
    },
    add() {
      this.$router.push({ path: "user2/add" });
    }
  }
};
</script>
<style lang='scss' scope>
</style>