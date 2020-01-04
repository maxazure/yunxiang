<template>
  <div class="">
    <el-row v-for="(o1,i) of sortData" :key="o1.value" type="flex" :index="i">
      <el-col :span="3">
        <el-button type="text" disabled>{{ o1[1].label }}</el-button>
      </el-col>
      <el-col v-for="(o2,i) of o1[1].child" :key="o2.value" :span="2" :index="i">
        <el-button type="text" @click="click(o2)">{{ o2.label }}</el-button>
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
      // order by parent_id 、value
      this.catalogData.sort((a, b) => {
        if (a.parent_id > b.parent_id) {
          return 1
        } else if (a.parent_id === b.parent_id && a.value > b.value) {
          return 1
        } else {
          return -1
        }
      })
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
    },
    click(e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog {
  }
</style>
