<template>
  <div class="app-container" >

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
      numberToString()
    },
    back() {
      this.$router.push({ path: '/management/users' })
    }
  }
}
</script>

<style scope>
</style>
