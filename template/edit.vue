<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改<%= @brick[:name] %></h3>
      <el-form
        ref="yForm"
        :model="<%= @brick[:name]%>Form"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
      <% @brick.dfields.each do |f|%>
         <el-form-item label="<%= f[:cnname] %>:" prop="<%= f[:field_ame] %>">
          <el-input v-model="<%= @brick[:name]%>Form.<%= f[:field_ame] %>" />
        </el-form-item>
<%end%>
        <el-form-item>
          <el-button @click="submit('<%= @brick[:name]%>Form')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { get<%=titleize(@brick[:name])%>, add<%=titleize(@brick[:name])%> } from "@/api/<%= @brick[:name]%>";
export default {
  components: {},
  data() {
    return {
      <%= @brick[:name]%>Form: {  },
      rules: { 
        <% @brick.dfields.each do |f|%>
            <%= f[:field_ame] %>:[
                {
                    required:true,
                    message:"请输入<%= f[:cnname] %>",
                    trigger:"blur"
                }
            ],
        <%end%>
        }
    };
  },
  created() {this.get() },
  mounted() {},
  methods: {
    async get() {
      const response = await getRole(this.$route.query.id);
      this.<%= @brick[:name]%>Form = response.data;
    },
    async api() {
      this.$router.push({ path: "/<%= @brick[:name_plural]%>" });
      const res = await add<%=titleize(@brick[:name])%>(this.<%= @brick[:name]%>Form);
    },
    async submit(<%= @brick[:name]%>Form) {
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
      this.$router.push({ path: "/<%= @brick[:name_plural]%>" });
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