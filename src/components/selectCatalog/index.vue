<template>
  <div class="">
    <el-row v-for="(o1,i) of sortData" :key="o1.value" type="flex" :index="i">
      <el-col :span="3"> {{ o1[1].label }}</el-col>
      <el-col :span="2" v-for="(o2,i) of o1[1].child" :key="o2.value" :index="i">
        {{ o2.label }}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import request from '../../utils/request'

export default {
  data() {
    return {
      catalogData: [],
      sortData: {}
    }
  },
  created() {
    this.api()
  },
  methods: {
    async api() {
      const res = await request({ url: '/api/siteconfig/catalogs', methods: 'get' })
      this.catalogData = res.data
      const map = new Map()
      this.catalogData.sort((a, b) => {
        if (a.parent_id > b.parent_id) {
          return 1
        } else {
          return -1
        }
      })
      console.log('sort after', this.catalogData)
      this.catalogData.forEach(
        (item) => {
          if (item.parent_id === '0') {
            item.child = []
            map.set(item.value, item)
          } else {
            map.get(item.parent_id).child.push(item)
          }
        }
      )
      this.sortData = map
      console.log(this.sortData)
    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog {
  }
</style>
