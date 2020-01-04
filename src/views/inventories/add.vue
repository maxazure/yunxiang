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
                <div class="float-right"><el-button v-show="editable" type="primary" @click="addProductVisible = true">新增款号</el-button>
                </div>
                <span>{{ shortnoTips }}</span>
              </div>
              <el-row style="padding: 10px 0 0 0" type="flex" align="center">
                <el-col>{{ productForm.product_name }}</el-col>
                <el-col>{{ productForm.product_gender }}</el-col>
                <el-col>{{ productForm.catalog_id }}</el-col>
                <el-col>{{ productForm.product_year }}</el-col>
                <el-col>{{ productForm.product_season }}</el-col>
                <el-col>{{ productForm.brand_id }}</el-col>
                <el-col>{{ productForm.price }}</el-col>
              </el-row>
              <el-row type="flex" align="center" class="">
                <el-col>{{ productForm.fabric_id }}</el-col>
                <el-col>{{ productForm.description }}</el-col>
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
              <addProduct :warehouse="warehouse" class="productForm" @success="addProductVisible=false" />
              <span slot="footer" class="dialog-footer">
                <el-button @click="addProductVisible = false">取 消</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="修改"
              :visible.sync="editProductVisible"
              width="80%"
            >
              <editProduct :warehouse-form="warehouseForm" class="productForm" @success="editProductVisible=false" />
              <span slot="footer" class="dialog-footer">
                <el-button @click="editProductVisible = false">取 消</el-button>
              </span>
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
  import addProduct from '../../views/products/add'
  import editProduct from '../../views/products/edit'
  import yTable from '../../components/yTable'
  import { getProduct } from '../../api/product'
  import { Message } from 'element-ui'
  import request from '../../utils/request'

  export default {
    components: {
      addProduct, editProduct, yTable
    },
    data() {
      return {
        test: '',
        productForm: {},
        showForm: 'addProduct',
        tableData: [],
        pagination: {
          pageNumber: 1,
          pageSize: 10
        },
        product_id: '',
        product_seasonOptions: [
          { value: '0', label: '春' },
          { value: '1', label: '夏' },
          { value: '2', label: '秋' },
          { value: '3', label: '冬' },
          { value: '5', label: '四季' },
          { value: '6', label: '春秋冬' },
          { value: '7', label: '春秋' },
          { value: '8', label: '其他' }
        ],
        shortnoTips: '',
        editable: true,
        addProductVisible: false,
        editProductVisible: false,
        warehouse: true,
        warehouseForm: null
      }
    },
    methods: {
      del(id) {
      },
      async getProduct(val) {
        const res = await request({ url: `api/products/finding?sn=${val}`, method: 'get' })
        if (!res.data) {
          this.shortnoTips = '款号不存在，请新增款号'
          this.editable = true
          this.warehouseForm = res.data
          this.productForm = ''
        } else {
          this.shortnoTips = ''
          this.editable = false
          this.warehouseForm = res.data
          this.productForm = this.warehouseForm
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

      .productForm {
        padding: 0px;
        min-height: 100%;
      }

      .table-wrapper {
        .table {
          padding: 0
        }
      }
    }

  }
</style>
