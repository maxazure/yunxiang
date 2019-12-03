## 2019/12/02 

### 目标
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

### 目标
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