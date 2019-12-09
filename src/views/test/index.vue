<template>
  <div class="app-container">
    <yForm ref="yForm" :formData="formData" :rules="rules">
      <template>
        <el-form-item label="文本:" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="文本域输入框">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.textarea"></el-input>
        </el-form-item>
        <el-form-item label="标签:" prop="validateName">
          <el-input placeholder="搜索" v-model="formData.search">
            <i
              slot="suffix"
              class="el-input__icon el-icon-search hover-cursor-pointer"
              @click="search"
            ></i>
          </el-input>
        </el-form-item>

        <el-form-item label="标签:" prop="validateName">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="单选框:">
          <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多选框:" prop="email">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="级联选择:" prop="password">
          <el-cascader
            v-model="value2"
            :options="options"
            expand-trigger="hover"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="数值:" prop>
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="角色:" prop="role_id">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
          {{formData}}
        </el-form-item>
        <el-form-item label="API取值">
          <ySelect :url="selectRoles" :val.sync="formData.select_id"></ySelect>
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
import { getUser, addUser, selectCompanies } from "@/api/user";
import { selectRoles } from "@/api/select";
import yForm from "@/components/yForm";
import ySelect from "@/components/ySelect";
export default {
  components: { yForm, ySelect },
  data() {
    return {
      radio: "",
      num: "",
      value: "",
      value2: "",
      value3: "0",
      rolesUrl: "",
      selectRoles: "",
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                }
              ]
            }
          ]
        }
      ],
      checkList: [],
      value1: "",
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
        ]
      }
    };
  },
  created() {
    this.search();
  },
  mounted() {},
  methods: {

    search() {
      this.selectRoles = selectRoles;
    },
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

<style scope>
</style>