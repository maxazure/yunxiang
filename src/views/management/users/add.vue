<template>
  <div class="card-container">
    {{rules}}
    <el-card class="box-card">
      <h3>新用户</h3>
      <el-form
        ref="yForm"
        :model="userForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="userForm.password" />
        </el-form-item>
        <el-form-item label="确认密码:" prop="password_confirmation">
          <el-input v-model="userForm.password_confirmation" />
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        <el-form-item label="角色:" prop="role_id">
          <el-select v-model="userForm.role_id" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司:" prop="company_id">
          <el-select v-model="userForm.company_id" placeholder="请选择">
            <el-option
              v-for="item in companies"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="api('userForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUser, addUser, selectCompanies, selectRoles } from "@/api/user";
export default {
  components: {},
  data() {
    const checkPassword2 = (rule, value, callback) => {
      if (value && value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      userForm: { company_id: "", role_id: "" },
      companies: [],
      roles: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            message: "请输入邮箱"
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
            message: "请输入正确邮箱格式"
          }
        ],
        password: [
          {
            min: 6,
            required: true,
            message: "密码长度不少于6个字符",
            trigger: "blur"
          }
        ],
        password_confirmation: [
          {
            required: true,
            trigger: "blur",
            validator: checkPassword2
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /^1[3456789]\d{9}/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        role_id: [
          {
            required: true,
            message: "请选择角色",
            trigger: "blur"
          }
        ],
        company_id: [
          {
            required: true,
            message: "请选择公司",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.selectCompanies();
    this.selectRoles();
  },
  mounted() {},
  methods: {
    async api() {
      this.$router.push({ path: "/management/users" });
      const res = await addUser(this.userForm);
    },
    async submit(userForm) {
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
      this.$router.push({ path: "/management/users" });
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