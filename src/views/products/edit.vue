<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改产品信息</h3>
      <el-form
        ref="yForm"
        :model="productForm"
        :rules="rules"
        label-width="100px"
      >
        <el-row>

          <el-col :span="8">
            <el-form-item label="品牌:" prop="brand">
              <component
                is="YSelect"
                v-model="productForm.brand"
              />
            </el-form-item>
          </el-col>  <el-col :span="8">
            <el-form-item label="商品性别:" prop="product_gender">
              <component is="YSelect" v-model="productForm.product_gender" :options="product_gender_options" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="品类:" prop="catalog_id">
              <component
                is="YSelect"
                v-model="productForm.catalog_id"
                :options="catalog_idOptions"
                :filterable="true"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品名称:" prop="product_name">
              <component
                is="YInput"
                v-model="productForm.product_name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="款号:" prop="shortno">
              <component
                is="YInput"
                v-model="productForm.shortno"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="采购模式:" prop="purcash_model">
              <component
                is="YSelect"
                v-model="productForm.purcash_model"
                :options="product_purcash_model_options"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="原条码:" prop="barcode">
              <component
                is="YInput"
                v-model="productForm.barcode"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品年份:" prop="goods_year">
                  <component
                    is="el-date-picker"
                    v-model="productForm.goods_year"
                    type="year"
                    format="yyyy"
                    value-format="yyyy"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经典常年:" prop="perennial">
                  <component
                    is="YSwitch"
                    v-model="productForm.perennial"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品季:" prop="goods_season">
              <component
                is="YSelect"
                v-model="productForm.goods_season"
                :options="product_season_options"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="面料:" prop="fabric">
              <component
                is="YSelectInput"
                v-model="productForm.fabric"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('productForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getProduct, putProduct } from '@/api/product'

import request from '../../utils/request'
import global from '../../utils/global'

export default {
  components: {
  },
  data() {
    return {
      productForm: {},
      //  apiList

      catalog_idOptions: [],

      //  rules
      rules: { product_name: [
        { required: true,
          message: '请输入商品名称',
          trigger: 'blur' }
      ],
      brand: [
      ],
      product_gender: [
      ],
      catalog_id: [
        { required: true,
          message: '请输入品类',
          trigger: 'blur' }
      ],
      goods_year: [
      ],
      goods_season: [
      ],
      fabric: [
      ],
      detail: [
      ],
      characteristic: [
      ],
      edition_type: [
      ],
      barcode: [
      ],
      shortno: [
        { required: true,
          message: '请输入款式编号',
          trigger: 'blur' }
      ],
      purcash_model: [
        { required: true,
          message: '请输入采购模式',
          trigger: 'blur' }
      ],
      perennial: [
      ],
      description: [
        { required: true,
          message: '请输入描述',
          trigger: 'blur' }
      ]
      },
      product_gender_options: global.product.product_gender,
      product_season_options: global.product.goods_season,
      product_purcash_model_options: global.product.purcash_model }
  },
  created() {
    this.get()
    //    getApiList

    this.getcatalog_idList()
  },
  mounted() {},

  methods: {
    async get() {
      const response = await getProduct(this.$route.query.id)
      this.productForm = response.data
    },
    //    getApiList

    async getcatalog_idList() {
      const response = await request({ url: '/api/siteconfig/catalogs', method: 'get' })
      response.data.map((option) => {
        this.catalog_idOptions.push({ value: option.id, label: option.name })
      })
    },

    async api() {
      this.$router.push({ path: '/products' })
      const res = await putProduct(this.productForm.id, this.productForm)
    },
    async submit(productForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    },
    back() {
      this.$router.push({ path: '/products' })
    }
  }
}
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
