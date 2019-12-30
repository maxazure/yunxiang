<template>
  <div class="pos app-container">
    <div class="header">
      <div>店铺收银台</div>
    </div>
    <el-row gutter="10" class="row2" type="flex" justify="space-between" align="middle">
      <el-col :span="4">
        <el-input v-model="settleForm.barcode" size="small" placeholder="请输入商品条码" />
      </el-col>
      <el-col :span="12">
        <el-row gutter="10" type="flex" align="middle">
          <el-col>
            <el-select size="mini" type="text" placeholder="请选择导购员" />
          </el-col>
          <el-col>
            <span>操作员</span>
          </el-col>
          <el-col>
            <span>销售单号</span>
          </el-col>
          <el-col>
            <span>日期</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row gutter="10">
      <el-col class="left" :span="20">

        <div class="main">
          <el-card class="table box-card" shadow="never" :body-style="cardPadding">
            <div slot="header" class="clearfix">
              <span>商品信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-table
              :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />

              <el-table-column
                prop="date"
                label="商品条形码"
              />
              <el-table-column
                prop="date"
                label="商品名"
              />
              <el-table-column
                prop="date"
                label="年份"
              />
              <el-table-column
                prop="date"
                label="季节"
              />
              <el-table-column
                prop="date"
                label="吊牌价"
              />
              <el-table-column
                prop="date"
                label="优惠金额"
              />
              <el-table-column
                prop="date"
                label="折率"
              />
              <el-table-column
                prop="date"
                label="零售价"
              />
            </el-table>
          </el-card>
        </div>
        <div class="bottom">
          <el-row gutter="10" class="bottom-card" type="flex" justify="space-between">
            <el-col>
              <el-card shadow="never" class="box-card" :body-style="cardPadding">
                <div slot="header" class="clearfix">
                  <span>支付信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <el-row class="payment" :gutter="10">
                  <el-col :span="6">
                    <el-form ref="form" :model="form" label-width="80px" size="mini">
                      <el-form-item class="payment-type" label="付款方式:">
                        <el-radio-group v-model="settleForm.type">
                          <el-radio class="" label="1">现金
                          </el-radio>
                          <el-radio class="" label="2">微信
                          </el-radio>
                          <el-radio class="" label="3">支付宝
                          </el-radio>
                          <el-radio class="" label="4">POS
                          </el-radio>
                        </el-radio-group>

                      </el-form-item>
                      <el-form-item label="总数量:">
                        <el-input v-model="settleForm.total" />
                      </el-form-item>
                      <el-form-item label="应收金额:">
                        <el-input v-model="settleForm.total" />
                      </el-form-item>
                      <el-form-item label="实收金额:">
                        <el-input v-model="settleForm.total" />
                      </el-form-item>
                      <el-form-item label="找零:">
                        <el-input v-model="settleForm.total" />
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col class="bottom-card-right" :span="18">
                    <el-row type="flex">
                      <el-col :span="5">
                        <el-button>
                          <el-row type="flex" justify="center" style="padding: 10px;">
                            <span>打印小票</span>
                          </el-row>
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="bottom-info" type="flex" justify="end">
                  <el-col :span="2">状态信息</el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>

        </div>
      </el-col>
      <el-col class="right" :span="4">
        <el-card shadow="never" class="box-card" :body-style="cardPadding">
          <el-row slot="header" class="clearfix">
            <el-col :span="12">会员信息</el-col>
          </el-row>
          <div v-for="o in 10" :key="o" class="member-info">
            {{ '会员信息 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  data() {
    return {
      cardPadding: { padding: '10px' },
      settleForm: {}
    }
  },
  methods: {}
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  .pos {
    color: $colorBlueDeep;
    padding: 0;

    .el-card__header {
      padding: 10px 5px;

    }

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      background-color: $colorBlueDeep;
      color: $colorWhite;

    }

    .row2 {
      height: 50px;
      background-color: $colorGreyMiddle;
      padding: 0 20px
    }

    .left {
      .main {
        .table {
          min-height: 500px;

          .table-header {
            height: 30px;
            background-color: $colorGrey;
            padding: 0 20px

          }

        }
      }
    }

    .bottom {
      .bottom-header {
        background-color: $colorGrey;
        height: 30px;
        padding: 0 20px;

        .el-col {

        }
      }

      .bottom-card {
        padding: 10px 0;

        .payment {
          .el-radio {
            margin-right: 10px;
          }
        }

        .bottom-card-right {
          position: relative;

          .bottom-info {
            position: absolute;
            bottom: 30px;
            right: 10px;
          }
        }

      }

    }

    .right {
      .el-card {
        min-height: 85vh;
      }
    }
  }
</style>
