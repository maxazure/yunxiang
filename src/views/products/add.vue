<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新产品信息</h3>
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
                v-model="sugProductName"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="款号:" prop="shortno">
              <component
                is="YInput"
                v-model="sugShortno"
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
            <el-form-item label="原款号:" prop="barcode">
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
            <el-form-item label="面料:" prop="fabric">
              <component
                is="YSelectInput"
                v-model="productForm.fabric"
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
import { addProduct } from '@/api/product'
import request from '../../utils/request'
import global from '../../utils/global'
import { chineseToTitleCase } from '../../utils'

export default {
  components: {},
  data() {
    return {
      productForm: { purcash_model: '0' },
      //  apiList

      catalog_idOptions: [],

      rules: {
        product_name: [],
        brand_id: [],
        product_gender: [],
        catalog_id: [
          {
            required: true,
            message: '请输入品类编码',
            trigger: 'blur'
          }
        ],
        product_year: [],
        product_sesson: [],
        fabric: [],
        detail: [],
        characteristic: [],
        edition_type: [],
        barcode: [],
        shortno: [],
        description: []

      },
      product_genderOptions: global.product.product_gender,
      product_seasonOptions: global.product.product_sesson,
      product_purcash_modelOptions: global.product.purcash_model,
      goodsYearDisable: false
    }
  },
  computed: {
    sugShortno: {
      get() {
        const brand = this.productForm.brand_id ? chineseToTitleCase(this.productForm.brand_id) : ''
        const gender = this.productForm.product_gender ? this.productForm.product_gender : ''
        const no = '000'
        const catalog = this.productForm.catalog_id ? this.prefixInteger(this.productForm.catalog_id, 2) + no : ''
        const result = `${brand}${gender}${catalog}`
        this.$set(this.productForm, 'shortno', result)
        return result
      },
      set(val) {
        this.$set(this.productForm, 'shortno', val)
      }
    },
    sugProductName: {
      get() {
        // todo set brand select
        const brand = this.productForm.brand_id ? this.productForm.brand_id : ''
        let gender = ''
        if (this.productForm.product_gender) {
          gender = this.product_genderOptions.find(item =>
            item.value === this.productForm.product_gender
          ).label + '款'
        }
        let catalog = ''
        if (this.productForm.catalog_id) {
          catalog = this.catalog_idOptions.find(item =>
            item.value === this.productForm.catalog_id
          ).label
        }
        const result = `${brand}${gender}${catalog}`
        this.$set(this.productForm, 'product_name', result)
        return result
      },
      set(val) {
        this.$set(this.productForm, 'product_name', val)
      }
    }
  },
  watch: {},
  created() {
    //    getApiList
    this.getcatalog_idList()
  },
  mounted() {
  },
  methods: {
    async api() {
      const res = await addProduct(this.productForm)
      if (res.code === '200') {
        this.$router.push({ path: '/infoManagement/products' })
      }
    },
    async submit(productForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    },

    //    getApiList
    async getcatalog_idList() {
      const response = await request({ url: '/api/siteconfig/catalogs', method: 'get' })
      response.data.map((option) => {
        this.catalog_idOptions.push({ value: option.id, label: option.name })
      })
    },

    back() {
      this.$router.push({ path: '/infoManagement/products' })
    },
    /**
       * num前补全0
       * @param num
       * @param length
       * @returns {string}
       */
    prefixInteger(num, length) {
      return (Array(length).join('0') + num).slice(-length)
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
