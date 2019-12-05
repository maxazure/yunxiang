<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改用户信息</h3>
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
        <el-form-item label="用户名:">
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
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        <el-form-item label="角色:" prop="role_name">
          <el-select v-model="userForm.role_id" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司:" prop="company_name">
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
          <el-button @click="submit('userForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getUser,
  addUser,
  selectCompanies,
  selectRoles,
  putUser
} from "@/api/user";
export default {
  components: {},
  data() {
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
        email: [
          {
            required: true,
            trigger: "blur",
            message: "请输入邮箱"
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确邮箱格式"
          }
        ],
        password: [
          {
            min: 6,
            message: "密码长度不少于6个字符",
            trigger: "blur"
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
        ]
      }
    };
  },
  created() {
    this.selectCompanies();
    this.selectRoles();
  },
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      const user = await getUser(this.$route.query.username);
      this.userForm = user.data;
    },
    async api() {
      const res = await putUser(this.userForm.username, this.userForm);
      this.$message({
        message: "添加成功",
        type: "success"
      });
      this.$router.push({ path: "/management/users" });
    },
    async submit(userForm) {
      console.log(this.$refs.userForm)
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.api();
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
 