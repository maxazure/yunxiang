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
              <el-popover
                placement="bottom"
                width="900"
                trigger="hover"
                :disabled="showCatalog"
              >
                <SelectCatalog
                  v-model="productForm.catalog_id"
                  :catalog-id-options="catalog_idOptions"
                  @input="handleSelectCatalog"
                />
                <el-button slot="reference" @click="showCatalog = false">{{ catalogPlaceholder }}</el-button>
              </el-popover>
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

          <el-col :span="24">
            <el-row type="flex">
              <el-col>
                <el-form-item label="采购模式:" prop="purcash_model">
                  <component
                    is="YSelect"
                    v-model="productForm.purcash_model"
                    :options="product_purcash_modelOptions"
                  />
                </el-form-item>
              </el-col>

              <el-col>

                <el-form-item label="商品年份:" prop="product_year">
                  <y-select v-model="productForm.product_year" :options="productYearOptions" :disabled="goodsYearDisable" />
                </el-form-item>

              </el-col>
              <el-col>
                <el-form-item label="经典常年:" prop="perennial">
                  <component
                    is="YSwitch"
                    v-model="productForm.perennial"
                    @input="changePerennial"
                  />
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="商品季:" prop="product_season">
                  <component
                    is="YSelect"
                    v-model="productForm.product_season"
                    :options="product_seasonOptions"
                  />
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="面料:" prop="fabric_id">
                  <component
                    is="YSelectInput"
                    v-model="productForm.fabric_id"
                    :options="fabric_idOptions"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="24">
            <el-form-item label="原款号:" prop="old_shortno">
              <component
                is="YInput"
                v-model="productForm.old_shortno"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="备注:" prop="description">
              <component
                is="yTextarea"
                v-model="productForm.description"
              />
            </el-form-item>
          </el-col>
          <el-col>
            <div class="float-right">
              <el-form-item>
                <el-button @click="submit('productForm')">提交</el-button>
                <el-button @click="back">返回</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addProduct } from '@/api/product'
import request from '../../utils/request'
import { chineseToTitleCase } from '../../utils'
import { mapGetters } from 'vuex'
import SelectCatalog from '../../components/selectCatalog'

export default {
  components: { SelectCatalog },
  props: {},
  data() {
    return {
      productForm: { purcash_model: '0', product_year: '' },
      //  apiList
      catalog_idOptions: [],
      brand_idOptions: [],
      fabric_idOptions: [],
      goodsYearDisable: false,
      product_genderOptions: [],
      product_seasonOptions: [],
      product_purcash_modelOptions: [],
      rules: {
        product_name: [],
        brand_id: [],
        product_gender: [],
        catalog_id: [
          {
            required: true,
            message: '请选择品类',
            trigger: 'blur'
          }
        ],
        product_year: [],
        product_season: [],
        fabric_id: [],
        detail: [],
        characteristic: [],
        edition_type: [],
        shortno: [],
        description: []
      },
      catalogPlaceholder: '选择品类',
      showCatalog: false,
      productYearOptions: []
    }
  },
  computed: {
    ...mapGetters([
      'selectConst'
    ]),

    sugShortno: {
      get() {
        // const brand = this.productForm.brand_id ? chineseToTitleCase(this.productForm.brand_id) : ''
        let brand = ''
        if (this.productForm.brand_id) {
          const brandLabel = this.brand_idOptions.find(item =>
            item.value === this.productForm.brand_id
          ).label
          brand = chineseToTitleCase(brandLabel)
        }
        const gender = this.productForm.product_gender ? this.productForm.product_gender : ''
        const no = '00'
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
        let brand = ''
        if (this.productForm.brand_id) {
          brand = this.brand_idOptions.find(item =>
            item.value === this.productForm.brand_id
          ).label
        }

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
    this.getbrand_idList()
    this.getfabric_idList()
    this.init()
    this.initYear()
  },
  mounted() {
  },
  methods: {
    init() {
      this.product_genderOptions = this.selectConst.product_gender
      this.product_seasonOptions = this.selectConst.product_season
      this.product_purcash_modelOptions = this.selectConst.purcash_model
      this.productForm.product_year = new Date().getFullYear().toString()
    },

    async api() {
      const res = await addProduct(this.productForm)
      this.$router.push({ path: '/infoManagement/products' })
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
    },

    handleSelectCatalog(e) {
      this.productForm.catalog_id = e.value
      this.catalogPlaceholder = e.label
      this.showCatalog = true
    },
    initYear() {
      const nowYear = new Date().getFullYear()
      const startYear = nowYear - 20
      for (let i = 0; i < 60; i++) {
        this.productYearOptions.push({ value: startYear + i, label: startYear + i })
      }
    },

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
