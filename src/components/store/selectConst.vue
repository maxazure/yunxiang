<script>

export default {
  methods: {
    /**
     * 将对象中的常量属性转换为name_label添加到对象中并返回
     *
     * 以常量的value作为索引，需保证常量的value基0且有序
     *
     * @param form
     *
     */
    convertIdToLabel(form) {
      for (const arg in form) {
        if (form[arg] && this.$store.getters.selectConst[arg]) {
          const label = arg + '_label'
          const index = form[arg]
          const value = this.$store.getters.selectConst[arg][index]
          form[label] = value.label
        }
      }
      return form
    }
  }
}

</script>

