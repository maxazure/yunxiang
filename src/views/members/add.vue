<template>
  <div class='card-container'>
    <el-card class='box-card'>
      <h3>新会员</h3>
      <el-form
        ref='yForm'
        :model='memberForm'
        :rules='rules'
        label-width='100px'

      >
        <el-row>

          <el-col :span="12">
            <el-form-item label='姓名:' prop='name'>
              <component  is='dragInput'  v-model='memberForm.name'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='英文名:' prop='enname'>
              <component  is='dragInput'  v-model='memberForm.enname'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='手机:' prop='mobile'>
              <component  is='dragInput'  v-model='memberForm.mobile'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='性别:' prop='gender'>
              <component  is='dragRadio'  v-model='memberForm.gender'
                          :options="genderOptions"  />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='生日:' prop='birthday'>
              <component  is='dragDatepicker'  v-model='memberForm.birthday'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='会员卡号:' prop='vipid'>
              <component  is='dragInput'  v-model='memberForm.vipid'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='微信号:' prop='wechatid'>
              <component  is='dragInput'  v-model='memberForm.wechatid'
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='地址:' prop='address'>
              <component  is='dragInput'  v-model='memberForm.address'
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
  import { addMember } from '@/api/member';
  import request from '../../utils/request'

  export default {
    components: {
    },
    data() {
      return {
        memberForm: {  },
        //  apiList





        genderOptions:[],






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
      };
    },
    created() {
      //    getApiList





      this.getgenderList()






    },
    mounted() {},
    methods: {
      async api() {
        this.$router.push({ path: '/members' });
        const res = await addMember(this.memberForm);
      },
      async submit(memberForm) {
        this.$refs.yForm.validate(valid => {
          if (valid) {
            this.api();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          } else {
            return false;
          }
        });
      },

//    getApiList








      async getgenderList(){
        const response = await request({url:'/api/siteconfig/roles',method:'get'})
        response.data.map((option) => {
          this.genderOptions.push({ value: option.id, label: option.name })
        })
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
