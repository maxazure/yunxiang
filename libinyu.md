## 2019/12/02 

### 任务
* 用户登录
* 用户管理
### 总结
* 1. 网络请求问题：
```
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
```
* 2. 请求参数问题：
```
  export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
//param: data 错误写法：没将post参数放入body
  })
}
```
* await 订阅者模式  （设计模式）  

## 2019/12/03

### 任务
* 用户列表增删改查与分页
* ajax返回数据前的“加载中”动画
### 总结
* 401未授权
  原因：token未发送/字段名不一致
* 422 请求参数格式错误
### 新建模块流程
* 按照API文档创建网络接口，每个API一个方法，
### 路由
* router{hidden：侧边栏隐藏}
  
## 2019/12/04

### 任务
* 下拉选择菜单
### 总结
* 表单参数校验
```
      <el-form
        class="userForm"
        ref="userForm"
        :model="userForm"
        :rules="rules">//绑定校验规则
      <el-form-item  prop="name">//绑定校验规则里的属性
          <el-input v-model="userForm.name" />
        </el-form-item>
<script>
 data() {
                          自定义校验1：
                           const validateUsername = (rule, value, callback) => {
                                if (!importCheckMethod(value)) { //导入校验方法
                                  callback(new Error('Please enter the correct user name'))
                                } else {
                                  callback()
                                }
                              }
return{
rules: {
        name: [
          {
            required: true,//是否必填项
            message: "请输入姓名",//错误信息
            trigger: "blur"//触发方式
          },

          // 自定义校验2：
          {
            pattern:/..../            //匹配正则

          }
        ],
}}
method:{
  //调用方法
  click(){
     this.$refs.userForm.validate(valid => {
        if (valid) {
          this.api();
        } else {
          return false;
        }
      });
  }
}

```
* slot插槽、具名插槽、作用域插槽 
* elementUI  form/card/container 
  
## 2019/12/05
### 任务
* 表格组件封装
* 自定义组件文档编写
* 公司管理、角色管理接口对接
### 总结
 * slot插槽的使用与传参
```javascript
//  父组件
 <template>
  <div>
    <child :data=fatherData >
    <template slot-scpoe='childData'>
      {{childData}}
    </tempale>
    </child>
</div>
</template>
```
```javascript
//子组件
 <template>
  <div>
    <slot :childData='childData'></slot>
</div>
</template>
 //props: {data:{}}
```

 * 插槽中父组件获取子组件数据slot-scope、v-slot
*  子组件获取父组件数据：props{}
* 父组件调用子组件方法this.$refs.child.childMethod()
* 子组件调用父组件方法this.$emit('methodName', val)
* 子组件方法无法调用----命名冲突(this.$refs.form.validate)
  
## 2019/12/06
 * 公司管理、角色管理接口对接
 * 需求确定
 * 模板引擎