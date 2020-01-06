<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新库存</h3>
      <el-form
        ref='inventoryAddForm'
        :model='inventoryAddForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>
          
          <el-col :span="12">
            <el-form-item label='sn（sku）:' prop='sn'>
              <component  is='YInput'  v-model='inventoryAddForm.sn'
              :options="snOptions"  />

            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='数量:' prop='num'>
              <component  is='YInput'  v-model='inventoryAddForm.num'
               />

            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='颜色编号:' prop='color_id'>
              <component  is='YInput'  v-model='inventoryAddForm.color_id'
               />

            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='产品编号:' prop='product_id'>
              <component  is='YInput'  v-model='inventoryAddForm.product_id'
               />

            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='尺码编号:' prop='size_id'>
              <component  is='YInput'  v-model='inventoryAddForm.size_id'
               />

            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='吊牌价:' prop='tag_price'>
              <component  is='YInput'  v-model='inventoryAddForm.tag_price'
               />

            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='原条码:' prop='old_barcode'>
              <component  is='YInput'  v-model='inventoryAddForm.old_barcode'
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
import { addInventory } from '@/api/inventory';
import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
      inventoryAddForm: {  },
    //  apiList
   
  snOptions:[],             

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
    };
  },
  created() {
    //    getApiList
  
    
    this.getsnList()  
     
     
     
     
     
     
  },
  mounted() {},
  methods: {
    async api() {
      const res = await addInventory(this.inventoryAddForm);
      if (res.code === '200') {
      this.$router.push({ path: '/inventories' });
      }
    },
    async submit() {
      this.$refs.inventoryAddForm.validate(valid => {
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
 
    async getsnList(){
      const res = await request({url:'',method:'get'})
      this.snOptions =res.data
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
