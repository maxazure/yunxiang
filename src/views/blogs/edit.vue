<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改blog</h3>
      <el-form
        ref="yForm"
        :model="blogForm"
        :rules="rules"
        label-width="100px"
        style="width:500px;"
      >
      
         <el-form-item label="标题:" prop="title">
          <el-input v-model="blogForm.title" />
        </el-form-item>

         <el-form-item label="正文:" prop="body">
          <el-input v-model="blogForm.body" />
        </el-form-item>

         <el-form-item label="作者:" prop="author">
          <el-input v-model="blogForm.author" />
        </el-form-item>

         <el-form-item label="SEO路径:" prop="url">
          <el-input v-model="blogForm.url" />
        </el-form-item>

         <el-form-item label="缩略图:" prop="thumbnail">
          <el-input v-model="blogForm.thumbnail" />
        </el-form-item>

         <el-form-item label="类别ID:" prop="catalog_id">
          <el-input v-model="blogForm.catalog_id" />
        </el-form-item>

         <el-form-item label="测试字段:" prop="url2">
          <el-input v-model="blogForm.url2" />
        </el-form-item>

         <el-form-item label="读者:" prop="duzhe">
          <el-input v-model="blogForm.duzhe" />
        </el-form-item>

        <el-form-item>
          <el-button @click="submit('blogForm')">提交</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getBlog, addBlog } from "@/api/blog";
export default {
  components: {},
  data() {
    return {
      blogForm: {  },
      rules: { 
        
            title:[
                {
                    required:true,
                    message:"请输入标题",
                    trigger:"blur"
                }
            ],
        
            body:[
                {
                    required:true,
                    message:"请输入正文",
                    trigger:"blur"
                }
            ],
        
            author:[
                {
                    required:true,
                    message:"请输入作者",
                    trigger:"blur"
                }
            ],
        
            url:[
                {
                    required:true,
                    message:"请输入SEO路径",
                    trigger:"blur"
                }
            ],
        
            thumbnail:[
                {
                    required:true,
                    message:"请输入缩略图",
                    trigger:"blur"
                }
            ],
        
            catalog_id:[
                {
                    required:true,
                    message:"请输入类别ID",
                    trigger:"blur"
                }
            ],
        
            url2:[
                {
                    required:true,
                    message:"请输入测试字段",
                    trigger:"blur"
                }
            ],
        
            duzhe:[
                {
                    required:true,
                    message:"请输入读者",
                    trigger:"blur"
                }
            ],
        
        }
    };
  },
  created() {this.get() },
  mounted() {},
  methods: {
    async get() {
      const response = await getRole(this.$route.query.id);
      this.blogForm = response.data;
    },
    async api() {
      this.$router.push({ path: "/blogs" });
      const res = await addBlog(this.blogForm);
    },
    async submit(blogForm) {
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
      this.$router.push({ path: "/blogs" });
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