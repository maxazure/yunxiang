<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新产品信息</h3>
      <el-form
        ref='yForm'
        :model='productForm'
        :rules='rules'
        label-width='100px'

      >
        <el-row>
          
          <el-col :span="12">
            <el-form-item label='商品名称:' prop='product_name'>
              <component  is='dragInput'  v-model='productForm.product_name'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='品牌:' prop='brand'>
              <component  is='dragInput'  v-model='productForm.brand'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='商品性别:' prop='product_gender'>
              <component  is='dragCheckbox'  v-model='productForm.product_gender'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='品类编号:' prop='category_id'>
              <component  is='dragSelect'  v-model='productForm.category_id'
              :options="category_idOptions"  />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='商品年份:' prop='goods_year'>
              <component  is='dragDatepicker'  v-model='productForm.goods_year'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='商品季:' prop='goods_season'>
              <component  is='dragRadio'  v-model='productForm.goods_season'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='面料:' prop='fabric'>
              <component  is='dragInput'  v-model='productForm.fabric'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='款式细节:' prop='detail'>
              <component  is='dragInput'  v-model='productForm.detail'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='造型特点:' prop='characteristic'>
              <component  is='dragInput'  v-model='productForm.characteristic'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='版型:' prop='edition_type'>
              <component  is='dragInput'  v-model='productForm.edition_type'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='原款号:' prop='barcode'>
              <component  is='dragInput'  v-model='productForm.barcode'
               />
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label='款式编号:' prop='shortno'>
              <component  is='dragInput'  v-model='productForm.shortno'
               />
            </el-form-item>
          </el-col>
          
        <el-col :span="24">
        <el-form-item>
          <el-button @click="submit('productForm')">提交</el-button>
          <el-button @click='back'>返回</el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addProduct } from '@/api/product';
import request from '../../utils/request'

export default {
  components: {
  },
  data() {
    return {
      productForm: {  },
    //  apiList
  
     
     
     
    
  category_idOptions:[],
   
     
     
     
     
     
     
     
     

      rules: {product_name:[
        {required:true,
          message:'请输入商品名称',
          trigger:'blur'},
      ],
      brand:[
      ],
      product_gender:[
      ],
      category_id:[
        {required:true,
          message:'请输入品类编号',
          trigger:'blur'},
      ],
      goods_year:[
      ],
      goods_season:[
      ],
      fabric:[
      ],
      detail:[
      ],
      characteristic:[
      ],
      edition_type:[
      ],
      barcode:[
      ],
      shortno:[
        {required:true,
          message:'请输入款式编号',
          trigger:'blur'},
      ],
      }
    };
  },
  created() {
    //    getApiList
  
     
     
     
    
    this.getcategory_idList()
     
     
     
     
     
     
     
     
     

  },
  mounted() {},
  methods: {
    async api() {
      this.$router.push({ path: '/products' });
      const res = await addProduct(this.productForm);
    },
    async submit(productForm) {
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








async getcategory_idList(){
  const response = await request({url:'/api/siteconfig/catalogs',method:'get'})
  response.data.map((option) => {
    this.category_idOptions.push({ value: option.id, label: option.name })
  })
},





















back() {
      this.$router.push({ path: '/products' });
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
