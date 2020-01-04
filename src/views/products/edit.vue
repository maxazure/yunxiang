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
            <el-form-item label="品牌:" prop="brand_id">
              <component
                is="YSelect"
                v-model="productForm.brand_id"
                :options="brand_idOptions"

              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品性别:" prop="product_gender">
              <component is="YSelect" v-model="productForm.product_gender" :options="product_genderOptions" />
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
                :options="product_purcash_modelOptions"
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
                <el-form-item label="商品年份:" prop="product_year">
                  <component
                    is="el-date-picker"
                    v-model="productForm.product_year"
                    type="year"
                    format="yyyy"
                    value-format="yyyy"
                    :disabled="goodsYearDisable"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经典常年:" prop="perennial">
                  <component
                    is="YSwitch"
                    v-model="productForm.perennial"
                    @input="changePerennial"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品季:" prop="product_sesson">
              <component
                is="YSelect"
                v-model="productForm.product_sesson"
                :options="product_seasonOptions"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="面料:" prop="fabric_id">
              <component
                is="YSelectInput"
                v-model="productForm.fabric_id"
                :options="fabric_idOptions"

              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="描述:" prop="description">
              <component
                is="YInput"
                v-model="productForm.description"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <div class="float-right">
              <el-form-item>
                <el-button @click="submit('productForm')">提交</el-button>
                <el-button v-if="!warehouseForm" @click="back">返回</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getProduct, putProduct } from '@/api/product'

import request from '../../utils/request'
import { mapGetters } from 'vuex'

export default {
  props: { warehouseForm: Object },
  data() {
    return {
      productForm: {},
      //  apiList
      catalog_idOptions: [],
      brand_idOptions: [],
      fabric_idOptions: [],

      //  rules
      rules: {
        product_name: [],
        brand_id: [],
        product_gender: [],
        catalog_id: [
          {
            required: true,
            message: '请输入品类',
            trigger: 'blur'
          }
        ],
        product_year: [],
        product_sesson: [],
        fabric_id: [],
        detail: [],
        characteristic: [],
        edition_type: [],
        barcode: [],
        shortno: [],
        purcash_model: [],
        perennial: [],
        description: []
      },
      product_genderOptions: [],
      product_seasonOptions: [],
      product_purcash_modelOptions: [],
      goodsYearDisable: false,
      routeId: this.$route.query.id
    }
  },
  created() {
    this.init()
    if (this.routeId) {
      this.get()
    }
    if (this.warehouseForm) {
      this.productForm = this.warehouseForm
    }
    //    getApiList
    this.getcatalog_idList()
    this.getbrand_idList()
    this.getfabric_idList()
  },
  computed: {
    ...mapGetters([
      'selectConst'
    ])
  },
  mounted() {
  },
  methods: {
    init() {
      this.product_genderOptions = this.selectConst.product_gender
      this.product_seasonOptions = this.selectConst.product_season
      this.product_purcash_modelOptions = this.selectConst.purcash_model
    },
    async get() {
      const response = await getProduct(this.routeId)
      this.productForm = response.data
    },
    //    getApiList

    async getbrand_idList() {
      const response = await request({ url: '/api/siteconfig/brands', method: 'get' })
      this.brand_idOptions = response.data
    },

    async getcatalog_idList() {
      const response = await request({ url: '/api/siteconfig/catalogs', method: 'get' })
      this.catalog_idOptions = response.data
    },

    async getfabric_idList() {
      const response = await request({ url: '/api/siteconfig/pfabrics', method: 'get' })
      this.fabric_idOptions = response.data
    },
    async api() {
      const res = await putProduct(this.productForm.id, this.productForm)
      if (!this.warehouseForm) {
        this.$router.push({ path: '/infoManagement/products' })
      } else {
        this.$emit('success')
      }
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
      this.$router.push({ path: '/infoManagement/products' })
    },
    changePerennial(val) {
      this.goodsYearDisable = val
      this.productForm.product_year = null
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
