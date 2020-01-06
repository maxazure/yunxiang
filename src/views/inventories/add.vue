<template>
  <div class="warehouse app-container">
    <el-row class="body">
      {{ inventoryAddForm }}
      <el-row class="row1">
        <el-card class="box-card" shadow="never" :body-style="{padding: '0px'}">
          <div slot="header" class="card-header clearfix">
            <el-col>
              <div>
                <span>款号:</span>
                <el-input v-model="inventoryAddForm.product_id" size="small" placeholder="请输入款号" @change="getProduct" />
                <div class="float-right">
                  <el-button v-show="isAdd" type="primary" @click="addProductVisible = true">新增款号</el-button>
                </div>
                <span>{{ shortnoTips }}</span>
              </div>
              <div v-if="!isAdd" class="editForminfo">
                <el-row style="padding: 10px 0 0 0" type="flex" align="center">
                  <el-col>商品名称：{{ editProductForm.product_name }}</el-col>
                </el-row>
                <el-row type="flex" align="center" class="">
                  <el-col>商品性别：{{ editProductForm.product_gender_label }}</el-col>
                  <el-col>品类：{{ editProductForm.catalog_id }}</el-col>
                  <el-col>商品年份：{{ editProductForm.product_year }}</el-col>
                  <el-col>商品季：{{ editProductForm.product_season_label }}</el-col>
                  <el-col>品牌：{{ editProductForm.brand_id }}</el-col>
                  <el-col>价格：{{ editProductForm.price }}</el-col>
                  <el-col>面料：{{ editProductForm.fabric_id }}</el-col>
                </el-row>
                <el-col>描述：{{ editProductForm.description }}</el-col>
              </div>
              <el-button v-show="!isAdd" type="primary" plain @click="editProductVisible = true">编辑信息</el-button>
            </el-col>
          </div>
          <div class="form">

            <el-dialog
              title="添加款号"
              :visible.sync="addProductVisible"
              width="80%"
            >
              <add-product-form ref="addForm" @submitAfter="submitAfter">
                <template slot="operation">
                  <el-col>
                    <div class="float-right">
                      <el-form-item>
                        <el-button @click="submitAddForm">提交</el-button>
                        <el-button @click="back">返回</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </template>
              </add-product-form>
            </el-dialog>
            <el-dialog
              title="修改"
              :visible.sync="editProductVisible"
              width="80%"
            >
              <edit-product-form :id="editFormId" ref="editForm" @submitAfter="submitAfter">
                <template slot="operation">
                  <el-col>
                    <div class="float-right">
                      <el-form-item>
                        <el-button @click="submitEditForm">提交</el-button>
                        <el-button @click="back">返回</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </template>
              </edit-product-form>
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
                      <el-input v-model="inventoryAddForm.old_barcode" />
                    </el-form-item>
                    <el-form-item label="颜色:">
                      <select-input
                        v-model="inventoryAddForm.color_id"
                        :options="colorsOptions"
                        @confirm="confirmColor"
                      >
                        <template slot="text">
                          <p>请输入颜色</p>
                        </template>
                      </select-input>
                    </el-form-item>
                    <el-form-item label="尺码:">
                      <select-input v-model="inventoryAddForm.size_id" :options="sizesOptions" @confirm="confirmSize">
                        <template slot="text">
                          <p>请输入尺码</p>
                        </template>
                      </select-input>

                    </el-form-item>
                    <el-form-item label="数量:">
                      <el-input v-model="inventoryAddForm.num" />
                    </el-form-item>
                    <el-form-item label="吊牌价:">
                      <el-input v-model="inventoryAddForm.tag_price" />
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="4">

                  <el-button type="primary" plain @click="addInventory">确认入库</el-button>

                </el-col>
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
import request from '../../utils/request'
import addProductForm from '../../components/product/addForm'
import EditProductForm from '../../components/product/editForm'
import { convertIdToLabel } from '../../utils'
import SelectInput from '../../components/select/selectInput'
import { addPcolor } from '../../api/pcolor'
import { addPsize } from '../../api/psize'
import { addInventory } from '../../api/inventory'

export default {
  components: {
    yTable, addProductForm, EditProductForm,
    SelectInput
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

      shortnoTips: '',
      isAdd: true,
      addProductVisible: false,
      editProductVisible: false,
      editFormId: '',
      inventoryAddForm: {},
      colorsOptions: [],
      sizesOptions: []
    }
  },
  computed: {},
  created() {
    this.initList()
  },
  methods: {
    del(id) {
    },
    async getProduct(val) {
      const res = await request({ url: `api/products/finding?sn=${val}`, method: 'get' })
      if (!res.data) {
        this.shortnoTips = '款号不存在，请新增款号'
        this.isAdd = true
        this.editProductForm = {}
      } else {
        this.shortnoTips = ''
        this.isAdd = false
        this.editProductForm = res.data
        this.editFormId = res.data.id
        convertIdToLabel(this.editProductForm)
      }
    },

    back() {
      this.addProductVisible = false
      this.editProductVisible = false
    },
    submitAfter(editForm) {
      this.editProductForm = editForm
      this.addProductVisible = false
      this.editProductVisible = false
    },
    submitAddForm() {
      this.$refs.addForm.submit()
    },
    submitEditForm() {
      this.$refs.editForm.submit()
    },
    async addInventory() {
      const res = await addInventory(this.inventoryAddForm)
      console.log(res)
    },
    initList() {
      this.getColorsList()
      this.getSizesList()
    },
    async getColorsList() {
      const res = await request({ url: '/api/siteconfig/pcolors', methods: 'get' })
      this.colorsOptions = res.data
    },

    async getSizesList() {
      const res = await request({ url: '/api/siteconfig/psizes', methods: 'get' })
      this.sizesOptions = res.data
    },

    async confirmColor(value, label) {
      await addPcolor({ code: value, name: label })
      this.colorsOptions.push({ value, label })
      this.inventoryAddForm.color_id = value
    },

    async confirmSize(value, label) {
      await addPsize({ code: value, name: label })
      this.sizesOptions.push({ value, label })
      this.inventoryAddForm.size_id = value
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
