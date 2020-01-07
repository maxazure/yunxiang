<template>
  <div class='app-container'>
    <el-button @click='add'>入库 </el-button>
    <y-table :tableData='tableData' :pagination='pagination' @changePage4List='getList'>
      <template>

        <el-table-column prop='sn' label='sn（sku）'  ></el-table-column>

        <el-table-column prop='num' label='数量'  ></el-table-column>

        <el-table-column prop='color_id' label='颜色编号'  ></el-table-column>

        <el-table-column prop='product_id' label='产品编号'  ></el-table-column>

        <el-table-column prop='size_id' label='尺码编号'  ></el-table-column>

        <el-table-column prop='tag_price' label='吊牌价'  ></el-table-column>

        <el-table-column prop='old_barcode' label='原条码'  ></el-table-column>

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
  import { getInventories, delInventory} from '@/api/inventory';
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
        const res = await getInventories({
          page: this.pagination.pageNumber,
          pagesize: this.pagination.pageSize
        });
        this.tableData = res.data.list;
        this.pagination.total = parseInt(res.data.pagination.total);
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
            delInventory(id).then(res => {
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
