<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新角色</h3>
      <el-form
        ref="yForm"
        :model="roleForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
        <el-form-item label="角色名称:" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
              <el-form-item label="配置:" prop="config">
          <el-input v-model="roleForm.config"  type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit('roleForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getRole, addRole, selectCompanies, selectRoles } from "@/api/role";
export default {
  components: {},
  data() {
    return {
      roleForm: {  },
      companies: [],
      roles: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ]}
    };
  },
  created() {
    this.selectCompanies();
    this.selectRoles();
  },
  mounted() {},
  methods: {
    async api() {
      this.$router.push({ path: "/management/roles" });
      const res = await addRole(this.roleForm);
    },
    async submit(roleForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    async selectCompanies() {
      const res = await selectCompanies();
      res.data.forEach(item => {
        this.companies.push({ value: item.id, label: item.name });
      });
    },
    async selectRoles() {
      const res = await selectRoles();
      res.data.forEach(item => {
        this.roles.push({ value: item.id, label: item.name });
      });
    },
    back() {
      this.$router.push({ path: "/management/roles" });
    }
  }
};
</script>
<style lang='scss' scope>
.card-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: 100vh;
  .box-card {
    width: 600px;
  }
}
</style>