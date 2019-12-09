<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改member</h3>
      <el-form
        ref="yForm"
        :model="memberForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
      
         <el-form-item label="姓名:" prop="fullname">
          <el-input v-model="memberForm.fullname" />
        </el-form-item>

         <el-form-item label="手机:" prop="phone">
          <el-input v-model="memberForm.phone" />
        </el-form-item>

         <el-form-item label="地址:" prop="address">
          <el-input v-model="memberForm.address" />
        </el-form-item>

        <el-form-item>
          <el-button @click="submit('memberForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMember, addMember } from "@/api/member";
export default {
  components: {},
  data() {
    return {
      memberForm: {  },
      rules: { 
        
            fullname:[
                {
                    required:true,
                    message:"请输入姓名",
                    trigger:"blur"
                }
            ],
        
            phone:[
                {
                    required:true,
                    message:"请输入手机",
                    trigger:"blur"
                }
            ],
        
            address:[
                {
                    required:true,
                    message:"请输入地址",
                    trigger:"blur"
                }
            ]
        
        }
    };
  },
  created() {this.get() },
  mounted() {},
  methods: {
    async get() {
      const response = await getRole(this.$route.query.id);
      this.memberForm = response.data;
    },
    async api() {
      this.$router.push({ path: "/members" });
      const res = await addMember(this.memberForm);
    },
    async submit(memberForm) {
      this.$refs.yForm.validate(valid => {
        if (valid) {
          this.api();
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    back() {
      this.$router.push({ path: "/members" });
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