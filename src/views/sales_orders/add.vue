<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新销售订单</h3>
      <el-form
        ref='yForm'
        :model='sales_orderForm'
        :rules='rules'
        label-width='100px'

      >
        <el-row>

          <el-col :span="12">
            <el-form-item label='会员编号:' prop='member_id'>
              <component  is='YInput'  v-model='sales_orderForm.member_id'
               />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='实付金额:' prop='price'>
              <component  is='YInput'  v-model='sales_orderForm.price'
               />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='零售价:' prop='retail_price'>
              <component  is='YInput'  v-model='sales_orderForm.retail_price'
               />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='支付凭证:' prop='payment_code'>
              <component  is='YInput'  v-model='sales_orderForm.payment_code'
               />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='关联库存编号:' prop='inventory_id'>
              <component  is='YSelect'  v-model='sales_orderForm.inventory_id'
              :options="inventory_idOptions"  />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='优惠金额:' prop='discounted_price'>
              <component  is='YInput'  v-model='sales_orderForm.discounted_price'
               />
            </el-form-item>
          </el-col>

        <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('sales_orderForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addSalesOrder } from '@/api/sales_order';
import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
      sales_orderForm: {  },
    //  apiList






  inventory_idOptions:[],



      rules: {member_id:[
        {required:true,
          message:'请输入会员编号',
          trigger:'blur'},
      ],
      price:[
        {required:true,
          message:'请输入实付金额',
          trigger:'blur'},
      ],
      retail_price:[
        {required:true,
          message:'请输入零售价',
          trigger:'blur'},
      ],
      payment_code:[
        {required:true,
          message:'请输入支付凭证',
          trigger:'blur'},
      ],
      inventory_id:[
        {required:true,
          message:'请输入关联库存编号',
          trigger:'blur'},
      ],
      discounted_price:[
        {required:true,
          message:'请输入优惠金额',
          trigger:'blur'},
      ],
      }
    };
  },
  created() {
    //    getApiList






    this.getinventory_idList()



  },
  mounted() {},
  methods: {
    async api() {
      this.$router.push({ path: '/sales_orders' });
      const res = await addSalesOrder(this.sales_orderForm);
    },
    async submit(sales_orderForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        } else {
          return false;
        }
      });
    },

//    getApiList










async getinventory_idList(){
  const response = await request({url:'/api/siteconfig/inventories',method:'get'})
  response.data.map((option) => {
    this.inventory_idOptions.push({ value: option.id, label: option.name })
  })
},







back() {
      this.$router.push({ path: '/sales_orders' });
    }
  }
};
</script>
<style lang='scss' scope>
.card-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: 100vh;
  .box-card {

  }
}
</style>
