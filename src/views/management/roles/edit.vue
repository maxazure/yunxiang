<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改角色信息</h3>
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
        <el-form-item label="角色名称:" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="配置:" prop="config">
          <el-input v-model="roleForm.config" type="textarea" />
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
import {
  getRole,
  addRole,
  selectCompanies,
  selectRoles,
  putRole
} from "@/api/role";
export default {
  components: {},
  data() {
    return {
      roleForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      const role = await getRole(this.$route.query.id);
      this.roleForm = role.data;
    },
    async api() {
      const res = await putRole(this.roleForm.id, this.roleForm);
      this.$message({
        message: "修改成功",
        type: "success"
      });
      this.$router.push({ path: "/management/roles" });
    },
    async submit(roleForm) {
      console.log(this.$refs.roleForm);
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.api();
        } else {
          return false;
        }
      });
    },
    async selectCompanies() {
      const res = await selectCompanies();
      this.companies =res.data
    },
    async selectRoles() {
      const res = await selectRoles();
        this.roles=res.data;
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
