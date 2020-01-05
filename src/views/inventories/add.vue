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
                        <!--                        <el-option-->
                        <!--                          v-for="item in product_seasonOptions"-->
                        <!--                          :key="item.value"-->
                        <!--                          :label="item.label"-->
                        <!--                          :value="item.value"-->
                        <!--                        />-->
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
import request from '../../utils/request'
import addProductForm from '../../components/product/addForm'
import EditProductForm from '../../components/product/editForm'

export default {
  components: {
    yTable, addProductForm, EditProductForm
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
      editFormId: ''
    }
  },
  computed: {},
  created() {

  },
  methods: {
    del(id) {
    },
    async getProduct(val) {
      const res = await request({ url: `api/products/finding?sn=${val}`, method: 'get' })
      if (!res.data) {
        this.shortnoTips = '款号不存在，请新增款号'
        this.editable = true
        this.editProductForm = {}
      } else {
        this.shortnoTips = ''
        this.editable = false
        this.editProductForm = res.data
        this.editFormId = res.data.id
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
