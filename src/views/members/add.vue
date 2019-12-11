<template>

  <y-card :title="title" class="add">
    <template>
      <el-form
        ref="yForm"
        :model="memberForm"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="memberForm.name" />
            </el-form-item>
            <el-form-item label="手机:" prop="mobile">
              <el-input v-model="memberForm.mobile" />
            </el-form-item>
            <el-form-item label="微信号:" prop="wechatid">
              <el-input v-model="memberForm.wechatid" />
            </el-form-item>

            <el-form-item label="地址:" prop="address">
              <el-input v-model="memberForm.address" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="英文名:" prop="enname">
              <el-input v-model="memberForm.enname" />
            </el-form-item>

            <el-form-item label="性别:" prop="gender">
              <el-input v-model="memberForm.gender" />
            </el-form-item>
            <el-form-item label="生日:" prop="birthday">
              <el-input v-model="memberForm.birthday" />
            </el-form-item>

            <el-form-item label="会员卡号:" prop="vipid">
              <el-input v-model="memberForm.vipid" />
            </el-form-item>

          </el-col>
          <el-col>
            <el-form-item>
              <el-button @click="submit('memberForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
    </template>
  </y-card>

</template>

<script>
import { addMember } from '@/api/member'
import yCard from '@/components/yCard'

export default {
  components: { yCard },
  data() {
    return {
      title: '新会员',
      memberForm: {},
      rules: {
        name: [],
        mobile: [
          {
            required: true,
            message: '请输入手机',
            trigger: 'blur'
          },

          {
            pattern: /^1[3456789]\d{9}/,
            message: '请输入正确的手机号码格式',
            trigger: 'blur'
          }
        ],
        address: [],
        gender: [],
        wechatid: [],
        vipid: [],
        birthday: [],
        enname: []
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async api() {
      this.$router.push({ path: '/members' })
      const res = await addMember(this.memberForm)
    },
    async submit(memberForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api()
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
      this.$router.push({ path: '/members' })
    }
  }
}
</script>
<style lang='scss' scope>
  .add {
    /*区分单卡片与多卡片*/
    /*min-height: 90vh;*/
  }

</style>
