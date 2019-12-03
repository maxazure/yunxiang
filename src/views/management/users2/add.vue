<template>
  <div class="app-container">
    <div class="container">
      <div class="title">
        <div>
          <span class="text">name</span>
        </div>
        <div>
          <el-input v-model="user.name" placeholder="name" />
        </div>
        <div>
          <el-input v-model="user.username" placeholder="username" />
        </div>
        <div>
          <el-input v-model="user.email" placeholder="email" />
        </div>
        <div>
          <el-input v-model="user.password" placeholder="password" />
        </div>
        <div>
          <el-input v-model="user.password_confirmation" placeholder="password_confirmation" />
        </div>
        <div>
          <el-input v-model="user.phone" placeholder="phone" />
        </div>
        <div>
          <el-input v-model="user.role_id" placeholder="role_id" />
        </div>
        <div>
          <el-input v-model="user.company_id" placeholder="company_id" />
        </div>
      </div>
      <div>
        <el-button @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser } from "@/api/user";
export default {
  data() {
    return {
      user: { username: "", name: "" }
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    async submit() {
      const res = await addUser(this.user);
      this.$router.push({ path: "/management/user2" });
    }
  }
};
</script>
<style lang='scss'>
.app-container {
  .container {
    .title {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      width: 400px;
      margin: 10px 10px;
      input {
        width: 300px;
        margin: 10px;
      }
    }
  }
}
</style>