## 2019/12/02 

### 任务
* 用户登录
* 用户管理
### 问题
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
