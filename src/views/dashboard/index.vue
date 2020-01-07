<template>
  <div class="dashboard app-container">
    <el-row   type="flex">
      <el-col v-for="i in 4" :key="i">
        <el-card class="box-card">
          <el-row class="card-header">
            <el-col :span="18" class="title">title</el-col>
            <el-col :span="6" class="icon">icon</el-col>
          </el-row>
          <el-row>
            <el-col class="num">$123.456</el-col>
          </el-row>
          <el-row class="card-desc">
            <el-col>
              周同比12%
            </el-col>
          </el-row>
          <el-row class="card-ft">
            <el-col>日销售额</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {}
</script>
<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .dashboard{
    background-color: $colorBgGrey;
    min-height: 100vh;
    .box-card{
      margin:10px;
      .num{
        font-size: 30px;
      }
    }
  }

</style>
