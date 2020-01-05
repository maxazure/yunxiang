<template>
  <div class="warehouse app-container">
    <el-row class="body">
      <el-row class="row1">
        <el-card class="box-card" shadow="never" :body-style="{padding: '0px'}">
          <div slot="header" class="card-header clearfix">
            <el-col>
              <div>
                <span>款号:</span>
                <el-input v-model="product_id" size="small" placeholder="请输入款号" @change="getProduct" />
                <div class="float-right">
                  <el-button v-show="editable" type="primary" @click="addProductVisible = true">新增款号</el-button>
                </div>
                <span>{{ shortnoTips }}</span>
              </div>
              <el-row style="padding: 10px 0 0 0" type="flex" align="center">
                <el-col>{{ editProductForm.product_name }}</el-col>
                <el-col>{{ editProductForm.product_gender }}</el-col>
                <el-col>{{ editProductForm.catalog_id }}</el-col>
                <el-col>{{ editProductForm.product_year }}</el-col>
                <el-col>{{ editProductForm.product_season }}</el-col>
                <el-col>{{ editProductForm.brand_id }}</el-col>
                <el-col>{{ editProductForm.price }}</el-col>
              </el-row>
              <el-row type="flex" align="center" class="">
                <el-col>{{ editProductForm.fabric_id }}</el-col>
                <el-col>{{ editProductForm.description }}</el-col>
              </el-row>
              <el-button v-show="!editable" type="primary" plain @click="editProductVisible = true">编辑信息</el-button>

            </el-col>
          </div>
          <div class="form">

            <el-dialog
              title="添加款号"
              :visible.sync="addProductVisible"
              width="80%"
            >
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
                    <el-form-item label="品类:" prop="catalog_id"><el-popover
                      placement="bottom"
                      width="900"
                      trigger="hover"
                      :disabled="showCatalog"
                    >
                      <SelectCatalog
                        v-model="productForm.catalog_id"
                        :catalog-id-options="catalog_idOptions"
                        @input="handleSelectAddCatalog"
                      />
                      <el-button slot="reference" @click="showCatalog = false">{{ catalogPlaceholder }}</el-button>
                    </el-popover></el-form-item>
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
                          <y-select v-model="productForm.product_year" :options="addProductYearOptions" :disabled="addYearable" />
                        </el-form-item>

                      </el-col>
                      <el-col>
                        <el-form-item label="经典常年:" prop="perennial">
                          <component
                            is="YSwitch"
                            v-model="productForm.perennial"
                            @input="changeAddPerennial"
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
                        <el-button @click="addProductVisible = false">取消</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
            <el-dialog
              title="修改"
              :visible.sync="editProductVisible"
              width="80%"
            >
              <el-form
                ref="yForm"
                :model="editProductForm"
                :rules="rules"
                label-width="100px"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="品牌:" prop="brand_id">
                      <component
                        is="YSelect"
                        v-model="editProductForm.brand_id"
                        :options="brand_idOptions"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="商品性别:" prop="product_gender">
                      <component
                        is="YSelect"
                        v-model="editProductForm.product_gender"
                        :options="product_genderOptions"
                      />
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
                          v-model="editProductForm.catalog_id"
                          :catalog-id-options="catalog_idOptions"
                          @input="handleSelectEditCatalog"
                        />
                        <el-button slot="reference" @click="showCatalog = false">{{ catalogPlaceholder }}</el-button>
                      </el-popover>                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="商品名称:" prop="product_name">
                      <component
                        is="YInput"
                        v-model="editProductForm.product_name"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="款号:" prop="shortno">
                      <component
                        is="YInput"
                        v-model="editProductForm.shortno"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-row type="flex">
                      <el-col>
                        <el-form-item label="采购模式:" prop="purcash_model">
                          <component
                            is="YSelect"
                            v-model="editProductForm.purcash_model"
                            :options="product_purcash_modelOptions"
                          />
                        </el-form-item>
                      </el-col>

                      <el-col>

                        <el-form-item label="商品年份:" prop="product_year">
                          <y-select v-model="editProductForm.product_year" :options="editProductYearOptions" :disabled="editYearable" />
                          <select-year v-model="editProductForm.product_year" :disabled="editYearable"/>

                        </el-form-item>

                      </el-col>
                      <el-col>
                        <el-form-item label="经典常年:" prop="perennial">
                          <component
                            is="YSwitch"
                            v-model="editProductForm.perennial"
                            @input="changeEditPerennial"
                          />

                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="商品季:" prop="product_season">
                          <component
                            is="YSelect"
                            v-model="editProductForm.product_season"
                            :options="product_seasonOptions"
                          />
                        </el-form-item>
                      </el-col>

                      <el-col>
                        <el-form-item label="面料:" prop="fabric_id">
                          <component
                            is="YSelectInput"
                            v-model="editProductForm.fabric_id"
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
                        v-model="editProductForm.old_shortno"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="备注:" prop="description">
                      <component
                        is="yTextarea"
                        v-model="editProductForm.description"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <div class="float-right">
                      <el-form-item>
                        <el-button @click="editSubmit('editProductForm')">提交</el-button>
                        <el-button @click="editProductVisible = false">
                          返回
                        </el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
          </div>
          <div class="table-wrapper">
            <y-table class="table" :table-data="tableData" :pagination="pagination">
              <template>
                <el-table-column prop="member_id" label="款号" />
                <el-table-column prop="price" label="颜色" />
                <el-table-column prop="retail_price" label="尺码" />
                <el-table-column prop="payment_code" label="数量" />
                <el-table-column prop="inventory_id" label="价格" />
                <el-table-column prop="discounted_price" label="条码" />
                <el-table-column prop="discounted_price" label="原条码" />
                <el-table-column label="操作" width="100px">
                  <template slot-scope="{row}">
                    <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </template>
            </y-table>
          </div>
          <div class="bottom">
            <el-card shadow="never">
              <el-row>
                <el-col :span="18">
                  <el-form label-position="right" label-width="80px">
                    <el-form-item label="原条码:">
                      <el-input />
                    </el-form-item>
                    <el-form-item label="颜色:">
                      <el-select
                        v-model="test"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择标签"
                      >
                        <el-option
                          v-for="item in product_seasonOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="尺码:">
                      <el-input />
                    </el-form-item>
                    <el-form-item label="数量:">
                      <el-input />
                    </el-form-item>
                    <el-form-item label="价格:">
                      <el-input />
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="4">操作</el-col>
              </el-row>
            </el-card>
          </div>
        </el-card>
      </el-row>
    </el-row>
  </div>

</template>
<script>
import yTable from '../../components/yTable'
import { addProduct, putProduct } from '../../api/product'
import { Message } from 'element-ui'
import request from '../../utils/request'
import { chineseToTitleCase } from '../../utils'
import { mapGetters } from 'vuex'
import SelectCatalog from '../../components/selectCatalog'
import SelectYear from '../../components/selectYear'

export default {
  components: {
    yTable, SelectCatalog,SelectYear
  },
  data() {
    return {
      test: '',
      productForm: { purcash_model: '0' },
      editProductForm: {},
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      product_id: '',
      shortnoTips: '',
      editable: true,
      addProductVisible: false,
      editProductVisible: false,
      catalog_idOptions: [],
      brand_idOptions: [],
      fabric_idOptions: [],
      addYearable: false,
      editYearable: false,
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
        old_shortno: [],
        shortno: [],
        description: []
      },
      catalogPlaceholder: '选择品类',
      showCatalog: false,
      editProductYearOptions: [],
      addProductYearOptions: []
    }
  },
  created() {
    this.init()
    //    getApiList
    this.getcatalog_idList()

    this.getbrand_idList()
    this.getfabric_idList()
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
  methods: {
    del(id) {
    },
    async getProduct(val) {
      const res = await request({ url: `api/products/finding?sn=${val}`, method: 'get' })
      this.editProductYearOptions = []
      if (!res.data) {
        this.shortnoTips = '款号不存在，请新增款号'
        this.editable = true
        this.editProductForm = {}
        this.catalogPlaceholder = '选择品类'
      } else {
        this.shortnoTips = ''
        this.editable = false
        this.editProductForm = res.data
        this.catalogPlaceholder = this.catalog_idOptions.find(item => item.value === this.editProductForm.catalog_id).label
        this.editYearable = this.editProductForm.perennial
        this.initEditYear()
      }
    },
    init() {
      this.product_genderOptions = this.selectConst.product_gender
      this.product_seasonOptions = this.selectConst.product_season
      this.product_purcash_modelOptions = this.selectConst.purcash_model
      // this.productForm.product_year = new Date().getFullYear().toString()
      this.initAddYear()
    },

    async api() {
      const res = await addProduct(this.productForm)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.addProductVisible = false
      this.productForm = {}
      this.catalogPlaceholder = '请选择'
    },
    async submit(productForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
        } else {
          return false
        }
      })
    },
    async editApi() {
      const res = await putProduct(this.editProductForm.id, this.editProductForm)
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.editProductVisible = false
    },
    async editSubmit(editProductForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.editApi()
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
      this.addProductVisible = false
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
    changeAddPerennial(val) {
      this.addYearable = val
      this.productForm.product_year = null
    },
    changeEditPerennial(val) {
      this.editYearable = val
      this.editProductForm.product_year = null
    },

    handleSelectAddCatalog(e) {
      this.productForm.catalog_id = e.value
      this.catalogPlaceholder = e.label
      this.showCatalog = true
    },
    handleSelectEditCatalog(e) {
      this.editProductForm.catalog_id = e.value
      this.catalogPlaceholder = e.label
      this.showCatalog = true
    },
    initAddYear() {
      const nowYear = new Date().getFullYear().toString()
      this.productForm.product_year = nowYear
      const startYear = nowYear - 20
      for (let i = 0; i < 60; i++) {
        this.addProductYearOptions.push({ value: startYear + i, label: startYear + i })
      }
    },
    initEditYear() {
      const nowyear = this.editProductForm.product_year ? this.editProductForm.product_year : new Date().getFullYear().toString()
      const startYear = nowyear - 20
      for (let i = 0; i < 60; i++) {
        this.editProductYearOptions.push({ value: startYear + i, label: startYear + i })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .warehouse {
    color: $colorBlueDeep;
    padding: 0;

    .row1 {
      .card-header {
        .el-input {
          width: 200px
        }

      }

      .table-wrapper {
        .table {
          padding: 0
        }
      }
    }

  }
</style>
