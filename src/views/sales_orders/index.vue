<template>
  <div class='app-container'>
    <el-button @click='add'>新销售订单 </el-button>
    <y-table :tableData='tableData' :pagination='pagination' @changePage4List='getList'>
      <template>
        
        <el-table-column prop='member_id' label='会员编号'  ></el-table-column>
        
        <el-table-column prop='price' label='实付金额'  ></el-table-column>
        
        <el-table-column prop='retail_price' label='零售价'  ></el-table-column>
        
        <el-table-column prop='payment_code' label='支付凭证'  ></el-table-column>
        
        <el-table-column prop='inventory_id' label='关联库存编号'  ></el-table-column>
        
        <el-table-column prop='discounted_price' label='优惠金额'  ></el-table-column>
        
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
  import { getSalesOrders, delSalesOrder} from '@/api/sales_order';
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
        const response = await getSalesOrders({
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
            delSalesOrder(id).then(response => {
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
