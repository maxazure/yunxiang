<template>
  <div class="app-container">
    <el-button @click="add">新blog </el-button>
    <y-table :tableData="tableData" :pagination="pagination" @changePage4List="getList">
      <template>

 <el-table-column prop="title" label="标题" ></el-table-column>

 <el-table-column prop="body" label="正文" ></el-table-column>

 <el-table-column prop="author" label="作者" ></el-table-column>

 <el-table-column prop="url" label="SEO路径" ></el-table-column>

 <el-table-column prop="thumbnail" label="缩略图" ></el-table-column>

 <el-table-column prop="catalog_id" label="类别ID" ></el-table-column>

 <el-table-column prop="url2" label="测试字段" ></el-table-column>

 <el-table-column prop="duzhe" label="读者" ></el-table-column>

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
import { getBlogs, delBlog} from "@/api/blog";
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
      const response = await getBlogs({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      });
      this.tableData = response.data.list;
      this.pagination.total = response.data.pagination.total;
    },

    add() {
      this.$router.push({ path: "blogs/add" });
    },
    edit(id) {
      this.$router.push({ path: "blogs/edit", query: { id: id } });
    },
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delBlog(id).then(response => {
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