<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>修改会员</h3>
      <el-form
        ref='yForm'
        :model='memberForm'
        :rules='rules'
        label-width='100px'
      >
        <el-row>

          <el-col :span="12">
            <el-form-item label='姓名:' prop='name'>
              <component  is='YInput'  v-model='memberForm.name'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='英文名:' prop='enname'>
              <component  is='YInput'  v-model='memberForm.enname'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='手机:' prop='mobile'>
              <component  is='YInput'  v-model='memberForm.mobile'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='性别:' prop='gender'>
              <component  is='YRadio'  v-model='memberForm.gender'
                          :options="genderOptions"  />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='生日:' prop='birthday'>
              <component  is='YDatepicker'  v-model='memberForm.birthday'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='会员卡号:' prop='vipid'>
              <component  is='YInput'  v-model='memberForm.vipid'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='微信号:' prop='wechatid'>
              <component  is='YInput'  v-model='memberForm.wechatid'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='地址:' prop='address'>
              <component  is='YInput'  v-model='memberForm.address'
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('memberForm')">提交</el-button>
              <el-button @click='back'>返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getMember, putMember } from '@/api/member';

  import request from '../../utils/request'

  export default {
    components: {
    },
    data() {
      return {
        memberForm: {},
        //  apiList





        genderOptions:[],





        //  rules
        rules: {name:[
          ],
          enname:[
          ],
          mobile:[
            {required:true,
              message:'请输入手机',
              trigger:'blur'},
          ],
          gender:[
          ],
          birthday:[
          ],
          vipid:[
          ],
          wechatid:[
          ],
          address:[
          ],
        }
      }
    },
    created() {
      this.get()
      //    getApiList





      this.getgenderList()






    },
    mounted() {},
    methods: {
      async get() {
        const response = await getMember(this.$route.query.id);
        this.memberForm = response.data;
      },
//    getApiList








      async getgenderList(){
        const response = await request({url:'/api/siteconfig/roles',method:'get'})
        this.genderOptions=response.data
      },










      async api() {
        this.$router.push({ path: '/members' });
        const res = await putMember(this.memberForm.id,this.memberForm);
      },
      async submit(memberForm) {
        this.$refs.yForm.validate(valid => {
          if (valid) {
            this.api();
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          } else {
            return false;
          }
        });
      },
      back() {
        this.$router.push({ path: '/members' });
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
    }
  }
</style>
