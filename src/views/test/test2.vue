<template>
  <div class="test2">
    {{ test2 }}
    <y-radio v-model="test2" :url="url" />
  </div>
</template>
<script>
import yTab from '@/components/yTab'
import add from '@/views/members/add'
import edit from '@/views/members/edit'
import YRadio from '../../components/yRadio/yRadio'

export default {
  components: { YRadio, yTab, add },
  data() {
    return {
      test2: '标题',
      url: 'api/siteconfig/companies'
    }
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
  .test2 {
  }
</style>
