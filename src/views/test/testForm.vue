<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新公司</h3>
      <el-form
        ref="companyForm"
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
        <!--        <el-form-item label="地址:" prop="address">-->
        <!--          <el-input v-model="companyForm.address" />-->
        <!--        </el-form-item>-->
        <slot name="form" />
        <el-form-item>
          <slot name="operate" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addCompany } from '@/api/company'
export default {
  components: {},
  props: { form: Object },
  data() {
    return {
      companyForm: { },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        companyname: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入邮箱'
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '请输入正确邮箱格式'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ], address: [
          {
            required: true,
            message: '请输 号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}/,
            message: '请输入正确 号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    form: {
      handler: function() {
        this.companyForm = { ...this.companyForm, ...this.form }
      },
      deep: true
    }
  },
  created() {},
  methods: {
    async api() {
      // this.$router.push({ path: '/management/companies' })
      const res = await addCompany(this.companyForm)
    },
    async submit() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          this.api()
          this.$emit('submit')
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    },
    back() {
      this.$router.push({ path: '/management/companies' })
    }
  }
}
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
