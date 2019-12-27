<template>
  <div class="app-container">

    home
  </div>
</template>

<script>
import { numberToString } from '../../utils'

export default {
  data() {
    return {
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      const test = { name: 'name', age: 2, child: { name: 'child', age: 2 }}
      const lits = ['name', 2, 'name']
      console.log(lits)
      numberToString(lits)
    },
    back() {
      this.$router.push({ path: '/management/users' })
    }
  }
}
</script>

<style scope>
</style>
