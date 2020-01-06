<template>
  <div class="warehouse app-container">
    {{ tableData }}
    <el-row class="body">
      <el-row class="row1">
        <el-card class="box-card" shadow="never" :body-style="{padding: '0px'}">
          <div slot="header" class="card-header clearfix">
            <el-col>
              <div>
                <h4 class="">产品信息</h4>
                <span>款号:</span>
                <el-input
                  v-model="inventoryAddForm.product_id"
                  size="small"
                  placeholder="请输入款号"
                  @change="getProduct"
                  @keydown.enter="getProduct"
                />
                <span>{{ shortnoTips }}</span>
                <el-button
                  v-show="isAdd"
                  style="font-size: 16px"
                  type="text"
                  @click="addProductVisible = true"
                >
                  新增款号
                </el-button>
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
              <add-product-form ref="addForm" @submitAfter="submitAfterAdd">
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
              <edit-product-form :id="editFormId" ref="editForm" @submitAfter="submitAfterEdit">
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
          <div v-show="!isAdd" class="inventoryAddForm">
            <el-card shadow="never">
              <el-row>
                <el-col :span="18">
                  <el-form label-position="right" label-width="80px" size="small">
                    <h4 class="">库存信息</h4>
                    <el-row type="flex">
                      <el-col>
                        <el-form-item label="颜色:">
                          <select-input
                            v-model="inventoryAddForm.color_id"
                            :options="colorsOptions"
                            @confirm="confirmColor"
                          >
                            <template slot="text">
                              <p>请输入颜色代码</p>
                            </template>
                          </select-input>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="尺码:">
                          <select-input
                            v-model="inventoryAddForm.size_id"
                            :options="sizesOptions"
                            @confirm="confirmSize"
                          >
                            <template slot="text">
                              <p>请输入尺码代码</p>
                            </template>
                          </select-input>

                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="数量:">
                          <el-input v-model="inventoryAddForm.num" />
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="吊牌价:">
                          <el-input v-model="inventoryAddForm.tag_price" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row type="flex">
                      <el-col>
                        <el-form-item label="条码:">
                          <el-input v-model="inventoryAddForm.sn" />
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="原条码:">
                          <el-input v-model="inventoryAddForm.old_barcode" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>
                <el-col :span="4">
                  <el-button class="float-right" type="primary" plain @click="addInventory">确认入库</el-button>
                </el-col>
              </el-row>
            </el-card>
          </div>

          <div v-show="!isAdd" class="table-wrapper">
            <y-table :table-data="tableData" :pagination="pagination">
              <template>

                <el-table-column prop="sn" label="sn（sku）" />

                <el-table-column prop="num" label="数量" />

                <el-table-column prop="color_id" label="颜色编号" />

                <el-table-column prop="product_id" label="产品编号" />

                <el-table-column prop="size_id" label="尺码编号" />

                <el-table-column prop="tag_price" label="吊牌价" />

                <el-table-column prop="old_barcode" label="原条码" />

                <el-table-column label="操作" width="100px">
                  <template slot-scope="{row}">
                    <el-button type="text" size="small" @click="edit(row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="del(row)">删除</el-button>
                  </template>
                </el-table-column>
              </template>
            </y-table>
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
import SelectInput from '../../components/select/selectInput'
import { convertIdToLabel } from '../../utils'
import { addPcolor } from '../../api/pcolor'
import { addPsize } from '../../api/psize'
import { addInventory, delInventory } from '../../api/inventory'

export default {
  components: {
    yTable, addProductForm, EditProductForm,
    SelectInput
  },
  data() {
    return {

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
    async getProduct(val) {
      const res = await request({ url: `api/products/finding?sn=${val}`, method: 'get' })
      if (!res.data) {
        this.shortnoTips = '款号不存在，请'
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
    submitAfterAdd(form) {
      this.addProductVisible = false
      // bug 赋值后无法输入
      // this.inventoryAddForm.product_id = form.shortno
      this.$set(this.inventoryAddForm, 'product_id', form.shortno)
      // 添加后马上是查询不到=》数据库未插入成功=》延迟请求
      setTimeout(() => {
        this.getProduct(form.shortno)
      }
      , 300)
    },
    submitAfterEdit(editForm) {
      this.editProductForm = editForm
      this.editProductVisible = false
      convertIdToLabel(this.editProductForm)
    },
    submitAddForm() {
      this.$refs.addForm.submit()
    },
    submitEditForm() {
      this.$refs.editForm.submit()
    },
    async addInventory() {
      const res = await addInventory(this.inventoryAddForm)
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
      this.tableData.push(res.data)
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
    },
    edit(id) {
      this.$router.push({ path: 'edit', query: { id: id }})
    },
    del(item) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delInventory(item.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            const index = this.tableData.indexOf(item)
            this.tableData.splice(index, 1)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
