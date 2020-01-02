<template>
  <div class='app-container'>
    <el-button @click='add'>新颜色 </el-button>
    <y-table :tableData='tableData' :pagination='pagination' @changePage4List='getList'>
      <template>

        <el-table-column prop='name' label='颜色名称'  ></el-table-column>

        <el-table-column prop='code' label='颜色代码'  ></el-table-column>

        <el-table-column label='操作' width='100px'>
          <template slot-scope='{row}'>
            <el-button type='text' size='small' @click='edit(row.id)'>修改</el-button>
            <el-button type='text' size='small' @click='del(row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>
<script>
  import { getPcolors, delPcolor} from '@/api/pcolor';
  import yTable from '@/components/yTable';

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
        const response = await getPcolors({
          page: this.pagination.pageNumber,
          pagesize: this.pagination.pageSize
        });
        this.tableData = response.data.list;
        this.pagination.total = parseInt(response.data.pagination.total);
      },

      add() {
        this.$router.push({ path: 'pcolors/add' });
      },
      edit(id) {
        this.$router.push({ path: 'pcolors/edit', query: { id: id } });
      },
      del(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delPcolor(id).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
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
