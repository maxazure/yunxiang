<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>修改库存</h3>
      <el-form
        ref='inventoryEditForm'
        :model='inventoryEditForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>
          
          <el-col :span="12">
         <el-form-item label='sn（sku）:' prop='sn'>
          <component  is='YInput'  v-model='inventoryEditForm.sn'
           :options="snOptions" 

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='数量:' prop='num'>
          <component  is='YInput'  v-model='inventoryEditForm.num'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='颜色编号:' prop='color_id'>
          <component  is='YInput'  v-model='inventoryEditForm.color_id'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='产品编号:' prop='product_id'>
          <component  is='YInput'  v-model='inventoryEditForm.product_id'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='尺码编号:' prop='size_id'>
          <component  is='YInput'  v-model='inventoryEditForm.size_id'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='吊牌价:' prop='tag_price'>
          <component  is='YInput'  v-model='inventoryEditForm.tag_price'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="12">
         <el-form-item label='原条码:' prop='old_barcode'>
          <component  is='YInput'  v-model='inventoryEditForm.old_barcode'
           

           
           />
        </el-form-item>
          </el-col>

          <el-col :span="24">
        <el-form-item>
          <el-button @click="submit">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getInventory, putInventory } from '@/api/inventory';

import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
    inventoryEditForm: {},
  //  apiList
  
    
  snOptions:[],
   
     
     
     
     
     
     
    //  rules
    rules: {sn:[
      {required:true,
        message:'请输入sn（sku）',
        trigger:'blur'},
      ],
    num:[
      {required:true,
        message:'请输入数量',
        trigger:'blur'},
      ],
    color_id:[
      {required:true,
        message:'请输入颜色编号',
        trigger:'blur'},
      ],
    product_id:[
      {required:true,
        message:'请输入产品编号',
        trigger:'blur'},
      ],
    size_id:[
      {required:true,
        message:'请输入尺码编号',
        trigger:'blur'},
      ],
    tag_price:[
      {required:true,
        message:'请输入吊牌价',
        trigger:'blur'},
      ],
    old_barcode:[
      ],
    }
        }
  },
  created() {
    this.get()
  //    getApiList
  
  
    this.getsnList()
   
   
   
   
   
   
   

  },
  mounted() {},
  methods: {
    async get() {
      const res = await getInventory(this.$route.query.id);
      this.inventoryEditForm = res.data;
    },
//    getApiList

          async getsnList(){
                const res = await request({url:'',method:'get'})
                this.snOptions = res.data
          },








    async api() {
      const res = await putInventory(this.inventoryEditForm.id,this.inventoryEditForm);
      if(res.code === '200') {
      this.$router.push({ path: '/inventories' });
      }
    },
    async submit() {
      this.$refs.inventoryEditForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          return false;
        }
      });
    },
    back() {
      history.back()
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
