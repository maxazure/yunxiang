<template>
  <div class='app-container'>
    <el-button @click='add'>新<%= @brick[:cnname] %> </el-button>
    <y-table :tableData='tableData' :pagination='pagination' @changePage4List='getList'>
      <template>
        <% @brick.dfields.order('sort').each do |f| if f[:is_show_in_list]%>
        <el-table-column prop='<%= f[:field_ame] %>' label='<%= f[:cnname] %>' <% if f[:width]%>width='<%= f[:width] %>px'<%end%> ></el-table-column>
        <%end end%>
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
  import { get<%=titleize(@brick[:name_plural])%>, del<%=titleize(@brick[:name])%>} from '@/api/<%= @brick[:name]%>';
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
        const response = await get<%=titleize(@brick[:name_plural])%>({
          page: this.pagination.pageNumber,
          pagesize: this.pagination.pageSize
        });
        this.tableData = response.data.list;
        this.pagination.total = response.data.pagination.total;
      },

      add() {
        this.$router.push({ path: 'add' });
      },
      edit(id) {
        this.$router.push({ path: 'edit', query: { id: id } });
      },
      del(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            del<%=titleize(@brick[:name])%>(id).then(response => {
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
