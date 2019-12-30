<template>
  <div class="app-container">
    <div class="oprate">
      <el-button @click="add">新会员</el-button>
    </div>
    <!--    todo 搜索表单模板-->
    <el-form
      ref="searchForm"
      class="searchForm"
      :model="searchForm"
      :rules="rules"
      label-width="100px"
    >
      <el-row type="flex">
        <el-col>
          <el-row type="flex">
            <el-form-item label="活动名称1">
              <el-input v-model="searchForm.name1" />
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input v-model="searchForm.name2" />
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input v-model="searchForm.name3" />
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-form-item>
              <el-button type="text" @click="log">搜索</el-button>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>

    </el-form>

    <y-table :table-data="tableData" :pagination="pagination" @changePage4List="getList">
      <template>

        <el-table-column prop="name" label="姓名" width="100px" />

        <el-table-column prop="enname" label="英文名" width="100px" />

        <el-table-column prop="mobile" label="手机" width="100px" />

        <el-table-column prop="gender" label="性别" width="50px" />

        <el-table-column prop="birthday" label="生日" width="100px" />

        <el-table-column prop="vipid" label="会员卡号" width="100px" />

        <el-table-column prop="wechatid" label="微信号" width="160px" />

        <el-table-column prop="address" label="地址" />

        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="edit(row.id)">修改</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </y-table>
  </div>
</template>
<script>
import { getMembers, delMember } from '../../api/member'
import yTable from '../../components/yTable'

export default {
  components: { yTable },
  data() {
    return {
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      searchForm: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const response = await getMembers({
        page: this.pagination.pageNumber,
        pagesize: this.pagination.pageSize
      })
      this.tableData = response.data.list
      this.pagination.total = parseInt(response.data.pagination.total)
    },

    add() {
      this.$router.push({ path: 'add' })
    },
    edit(id) {
      this.$router.push({ path: 'edit', query: { id: id }})
    },
    del(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delMember(id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    log() {
      console.log('searchForm', this.searchForm)
    }
  }
}
</script>

<style lang='scss' scope>
  .app-container {
  }
</style>
