<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新库存</h3>
      <el-form
        ref='yForm'
        :model='inventoryForm'
        :rules='rules'
        label-width='100px'

      >
        <el-row>
          
          <el-col :span="12">
            <el-form-item label='sn（sku）:' prop='sn'>
              <component  is='dragSelect'  v-model='inventoryForm.sn'
              :options="snOptions"  />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='数量:' prop='num'>
              <component  is='dragInput'  v-model='inventoryForm.num'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='颜色编号:' prop='color_id'>
              <component  is='dragInput'  v-model='inventoryForm.color_id'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='产品编号:' prop='product_id'>
              <component  is='dragInput'  v-model='inventoryForm.product_id'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='尺码:' prop='size'>
              <component  is='dragInput'  v-model='inventoryForm.size'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='零售价:' prop='retail_price'>
              <component  is='dragInput'  v-model='inventoryForm.retail_price'
               />
            </el-form-item>
          </el-col>
          
        <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('inventoryForm')">提交</el-button>
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
      inventoryForm: {  },
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
      size:[
        {required:true,
          message:'请输入尺码',
          trigger:'blur'},
      ],
      retail_price:[
        {required:true,
          message:'请输入零售价',
          trigger:'blur'},
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
      this.$router.push({ path: '/inventories' });
      const res = await addInventory(this.inventoryForm);
    },
    async submit(inventoryForm) {
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


async getsnList(){
  const response = await request({url:'/api/siteconfig/sns',method:'get'})
  response.data.map((option) => {
    this.snOptions.push({ value: option.id, label: option.name })
  })
},















back() {
      this.$router.push({ path: '/inventories' });
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
