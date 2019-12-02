<template>
  <div class="form">
    <div v-for="(o,i) in formList" :key="o.id" :index="i">
      <div v-if="o.type==='input'">
        <m-input :inputObj="o"></m-input>
      </div>
      <div v-if="o.type==='submit'">
        <m-submit :submitObj="o" :formList="formList"></m-submit>
      </div>
    </div>
  </div>
</template>
<script>
import mInput from "@/components/table/form/input";
import mSubmit from "@/components/table/form/submit";
export default {
  components: { mInput, mSubmit },
  props: { formList: Array },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    init() {}
  }
};
</script>

<style scoped lang="scss">
</style>
