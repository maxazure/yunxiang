<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>
<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
