<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改公司信息</h3>
      <el-form
        ref="yForm"
        :model="companyForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
        <el-form-item label="公司名:" prop="name">
          <el-input v-model="companyForm.name" />
        </el-form-item>
        <el-form-item label="手机:" prop="phone">
          <el-input v-model="companyForm.phone" />
        </el-form-item>
        <el-form-item label="邮编:" prop="postcode">
          <el-input v-model="companyForm.postcode" />
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="companyForm.address" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit('companyForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCompany, addCompany, putCompany } from "@/api/company";
export default {
  components: {},
  data() {
    return {
      companyForm: {},
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
    this.get();
  },
  methods: {
    async get() {
      const response = await getCompany(this.$route.query.id);
      this.companyForm = response.data;
    },
    async api() {
      const res = await putCompany(this.companyForm.id, this.companyForm);
      this.$message({
        message: "修改成功",
        type: "success"
      });
      this.$router.push({ path: "/management/companies" });
    },
    async submit(companyForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
        } else {
          return false;
        }
      });
    },
    back() {
      this.$router.push({ path: "/management/companies" });
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
 