<template>
  <div class="form">
    <div v-for="(o,i) in formList" :key="o.id" :index="i">
      <div v-if="o.type==='input'">
        <m-input :inputObj="o"></m-input>
      </div>
      <div v-if="o.type==='submit'">
        <m-submit :submitObj="o" v-on="$listeners"></m-submit>
      </div>
      <div v-if="o.type==='button'">
        <el-button type="primary">{{o.value}}</el-button>
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
  methods: {}
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>
