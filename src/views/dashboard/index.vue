<template>
  <div class="app-container">
    <el-button type="primary" @click="set">set</el-button>
    <el-button type="primary" @click="get">get</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'selectApi'
    ])
  },
  created() {
  },
  methods: {

    set() {
      this.$store.dispatch('localStorage/setSelectConst')
    },
    get() {
      Message({
        message: this.$store.state.localStorage.all,
        duration: 3 * 1000
      })
    }
  }
}
</script>
