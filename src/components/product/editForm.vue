<template>
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
              <select-year v-model="productForm.product_year" :disabled="productYearDisable" />
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
            <el-form-item label="面料:" prop="fabric">
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
      <slot name="formitem" />
      <slot name="operation" />
    </el-row>
  </el-form>
</template>
<script>
import { getProduct, putProduct } from '@/api/product'
import request from '../../utils/request'
import { mapGetters } from 'vuex'
import SelectCatalog from '../../components/selectCatalog/index'
import SelectYear from '../../components/selectYear'

export default {
  components: { SelectCatalog, SelectYear },
  props: {
    id: {
      type: String
    }
  },
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
        product_season: [],
        fabric_id: [],
        detail: [],
        characteristic: [],
        edition_type: [],
        old_shortno: [],
        shortno: [],
        purcash_model: [],
        perennial: [],
        description: []
      },
      product_genderOptions: [],
      product_seasonOptions: [],
      product_purcash_modelOptions: [],
      productYearDisable: false,
      catalogPlaceholder: '选择品类',
      productYearOptions: [],

      showCatalog: false
    }
  },
  watch: {
    id: {
      handler(val) {
        this.get()
      }
    }
  },
  created() {
    this.get()
    this.init()
    //    getApiList
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
      const response = await getProduct(this.id ? this.id : this.$route.query.id)
      this.productForm = response.data
      // 先后顺序
      this.getcatalog_idList()
      this.productYearDisable = this.productForm.perennial
    },
    //    getApiList
    async getbrand_idList() {
      const response = await request({ url: '/api/siteconfig/brands', method: 'get' })
      this.brand_idOptions = response.data
    },

    async getcatalog_idList() {
      const response = await request({ url: '/api/siteconfig/catalogs', method: 'get' })
      this.catalog_idOptions = response.data
      this.catalogPlaceholder = this.catalog_idOptions.find(item => item.value === this.productForm.catalog_id).label
    },

    async getfabric_idList() {
      const response = await request({ url: '/api/siteconfig/pfabrics', method: 'get' })
      this.fabric_idOptions = response.data
    },
    async api() {
      const res = await putProduct(this.productForm.id, this.productForm)
    },
    async submit(productForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
          this.$emit('submitAfter', this.productForm)
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
      this.productYearDisable = val
      this.productForm.product_year = null
    },
    handleSelectCatalog(e) {
      this.productForm.catalog_id = e.value
      this.catalogPlaceholder = e.label
      this.showCatalog = true
    }

  }
}
</script>

<style scoped lang="scss">
  .editForm {
  }
</style>
