<template>
  <div class="app-container">
    <yForm ref="yForm" :formData="formData" :rules="rules">
      <template>
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password" />
        </el-form-item>
        <el-form-item label="确认密码:" prop="password_confirmation">
          <el-input v-model="formData.password_confirmation" />
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="角色:" prop="role_id">
          <el-select v-model="formData.role_id" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司:" prop="company_id">
          <el-select v-model="formData.company_id" placeholder="请选择">
            <el-option
              v-for="item in companies"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit('formData')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </template>
    </yForm>
  </div>
</template>

<script>
import { getUser, addUser, selectCompanies, selectRoles } from "@/api/user";

import yForm from "@/components/yForm";
export default {
  components: { yForm },
  data() {
    const checkPassword2 = (rule, value, callback) => {
      if (value && value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: { company_id: "", role_id: "" },
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
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
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
    async addUser() {
      this.$router.push({ path: "/management/users" });
      const res = await addUser(this.formData);
    },
    async submit(formData) {
      this.$refs.yForm.check(valid => {
        if (valid) {
          this.addUser();
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
        this.companies = res.data;
    },
    async selectRoles() {
      const res = await selectRoles();
        this.roles.push = res.data;
    },
    back() {
      this.$router.push({ path: "/management/users" });
    }
  }
};
</script>

<style scope>
</style>
