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

## 2019/12/03

### 任务
* 用户列表增删改查与分页
* ajax返回数据前的“加载中”动画
### 总结
* 401未授权
  原因：token未发送/字段名不一致
* 422 请求方式正确，但是语义错误
### 新建模块流程
* 按照API文档创建网络接口，每个API一个方法，
### 路由
* router{hidden：侧边栏隐藏}
  
## 2019/12/04

### 任务
* 下拉选择菜单
### 总结
* 表单参数校验
```java
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

### 任务
* 公司管理、角色管理接口对接
 * 每周总结
 * 需求确定
### 总结
* 错误406：表示无法使用请求的内容特性来响应请求的网页->响应头content-type错误-> 请求头错误      请求头含有json-->只有json
*  错误400：表示错误的请求（参数、） get=》params传参（URL），post、put=》data传参（header.body）
 * elementUI样式不生效：scope、优先级、子样式掩盖、其他样式掩盖、嵌套深度、选择器未选中、

## 2019/12   每周总结
 * 网络请求400（传参）、401（token）、406（content-type）、422
 * 父子组件封装方式与通信，$ refs与$emit
 * 作用域插插槽的理解与传参
 * 表单校验
 * elementUI样式不生效：scope、优先级、子样式掩盖、其他样式掩盖、嵌套深度、选择器未选中、

## 2019/12/09
### 任务
* 代码片段及其控件编写
* select组件封装
* CRUD模板代码编写
### 总结
* Cascader 级联选择器hover选择不生效
* * 原因：项目的element 版本与文档版本不一致
* * 错误的官方例子写法 :props="{ expandTrigger: 'hover' }" （2.13）
* * 正确写法：expand-trigger="hover"（2.7.2）
* vue 父子通信
* * 父向子传递数据，子向父传递事件
* * props单向下行绑定（对象、数组例外（引用传递））
* * .sync
* * *  简化子组件修改父组件的值后，父组件不再需要方法监听子组件的操作
## 2019/12/10
### 任务
* 模板bug修复
* * router：layout、icon
### 总结
* * 模板语法的使用
* * 父子通信（v-model=v-bind+v-on）
* * * 父组件v-model
* * * 子组件@input="$emit('input', $event.target.value)" 
## 2019/12/11
### 任务
* 两种布局方式
* 代码生成系统
### 总结
* element 单独使用el-col布局导致表单无法选中编辑
* * 必须结合el-row一起使用
## 2019/12/12
### 任务
* 字段CRUD
* 拖拽生成json
### 总结
* vuedragable拖拽插件使用
* :class="A?B:C"三元表达式
* el-table 不显示布尔类型
* el-table: slot通过插槽自定义数据显示
* 设置默认值直接设置data
* computed 计算
## 2019/12/13
### 任务
* 拖拽生成页的布局改动
* 数据迁移
### 总结
* 居中 margin:0 auto; width
* 标签回车后会产生一个空格
* * font-size:0 
* element自带样式：
* * el-button:margin-left:5px
* 组建通信：单向下行绑定，父组件v-model，子组件<input v-model='result'>+prop:{value:String } + data(){return{result: this.value}}  + @change()=>{  this.$emit('input', this.value) }
* * Ajax延迟导致父组件修改了value而子组件不知道：watch:{value(val){this.result = val}//监听value、通知子组件修改 }
* * 避免在子组件中修改父组件的数据（v-model绑定prop）=> 会导致数据错乱
* 拖拽vuedragable
* * 同一个groub之间才可以互相拖拽
*  v-html
*  动态组件的使用 
```
<component v-bind:is="currentTabComponent"></component>
```

## 2019/12/16
### 任务
* 实现拖拽
### 总结
* vuedragable同一列内无法移动----->field.id undefine---->拖拽事件获取的element为空----------->？？？
* * 更换插件Sortable.js--->拖拽子组件变成父组件---->阻止pinterdown事件传播.stop ---->子组件拖拽不触发---->？？？
* * Sortable.js--->样式改变数组不改变---->update事件不触发-----？？？
* * 更换插件vuedragable.nested
* chrome调试：事件
* * monitorEvents(document.querySelector(".field-item"), 'click' )事件监听
* * unmonitorEvents(document.querySelector(".el-card"))取消监听
* * getEventListeners(document.querySelector(".col0"))获取监听的事件
* 防抖与节流lodash
* * 防抖：_.debounce(func, [wait=0], [options={}])  
* * 节流：_.throttle(func, [wait=0], [options={}])
## 2019/12/17
### 任务
* 拖拽
### 总结
* vuedraggable 拖拽后修改新列表影响原列表---->引用类型---->clone函数(stackoverflow+github issue+文档)---->
* 浅拷贝（拓展运算符：[...a]、{...b}可解决一层引用，无法解决多层对象的引用）----->深拷贝（json转换、递归、。。）->  JSON.parse(JSON.stringify(o))
* Vue传递给子组件的属性带类型+IDEA自动补全html属性中其他类型为字符串= 传递失败 =>无法区分数字与字符串
```
 :default-openeds="['1','2']"
```
## 2019/12/18
### 任务
* 表单事件封装
### 总结
1.  @input与@change 的区别
* * input 连续触发
* * change 失去焦点时触发
2.  Vue数组数据改变，视图不更新--->
* * Vue 不能检测对象属性的添加或删除
* * Vue 不能检测以下数组的变动：
* * * 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
* * * 当你修改数组的长度时，例如：vm.items.length = newLength
*  Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
* * * 存疑：在被监听的对象上新增的数组对象是不被监听的=>变异方法未被包裹=>视图不更新=>>>新增能被监听的属性this.$set(field, 'options', [])
## 2019/12/19
### 任务
* url变长
* 返回后样式变动
* 首次打开时500错误
### 总结
* A跳转到页面B的瞬间样式改变、B返回到A时样式改变、A多了B的样式 
* * B全局样式污染(scoped)+类名重复
## 2019/12/20
###任务
* token有效期导致500
* 修改组件配置
###总结
## 2019/12/24
### 任务
* 梳理业务流程，添加对应字段
* 按需求添加组件
### 总结
## 2019/12/25
### 任务
* 梳理业务流程，理解需求
* 修改组件配置
### 总结
## 2019/12/26
### 任务
* 梳理进销存模块与字段，并生成前后端代码
* 熟悉美邦ERP安装与使用
* 编写收银台页面布局
### 总结
## 2019/12/27
### 任务
* 编写收银台页面
* 调整模块字段
* 生成并修改产品资料模块
### 总结
* 修改element默认样式：
* * 删除scoped；
* * 使用类选择器+elment组件名（自定义类名无效），
* elment时间选择器：只选择年份  type="year" value-format="yyyy" format="yyyy"
## 2019/12/30
### 任务
* 调整产品资料模块
* 调整收银台模块
* 修改组件命名规范
* 款号自动生成
### 总结
* element 下拉框可编辑  filterable  +  @blur（tab键无效）
* 添加属性$set(obj,name,value)
## 2019/12/31
### 任务
* 修改自动生成款号/商品名称的bug
* * 未生成就有默认值
* * 自动生成的商品名称/款号无法通过表单校验
* 勾选常年款后商品年份变为不可选
### 总结
* v-model默认利用名为 value 的 prop 和名为 input 的事件，可用model来修改
```js
 model: {
    prop: 'checked',
    event: 'change'
  },
```
## 2020/01/02
### 任务
* 编写入库页面
* 生成并调整面料模块、颜色模块、尺码模块、
* 调整导航栏
* 修改生成模板，实现二级菜单的CRUD与路由生成
### 总结
* await漏写导致未返回数据就执行后面的操作
## 2020/01/03
### 任务
* 使用localstorge+vuex+store将常量api持久化到本地
* 修改入库页面布局
### 总结
* todo：vuex.state初始化
## 2020/01/04
### 任务
* 实现多列的二级目录
* BUG：位于projects/add|edit&&inventories/add 的分类选择的Popover组件，隐藏之后，要触发两次才会再次出现
* * 已修复
* 实现年份选择组件
* 测试并修改入库、添加、修改产品信息bug
### 总结
* 自动导入了错误的文件
## 2020/01/06
### 任务
* 重构入库和添加、修改产品产品信息
* 修复Popover组件，显示与隐藏的bug
* 封装下拉输入弹出气泡组件
* * BUG：弹出propover后，用户既不点击取消也不点击确定产生bug
* * BUG: 款号未改变，主动用enter无法触发事件
### 总结
* popover通过 value/v-model：Boolean	控制是否显示，
* * 无法通过其他元素的点击事件触发=》Vue实际已触发显示事件，并且因为点击的是其他元素，还触发了隐藏事件，导致未显示就已经消失
* 组件嵌套过深导入响应式失效=>this.$set(obj,args,value)/this.forceUpdate()
## 2020/01/07
### 任务
* 生成器中的字段提交了含有空字符串（""）的表单，导致生成器if判断时出错=》""=>null
* npm run dev Cannot find module '@/store' in 'src/util/index' 
* * 分离vuex与util，js调用改成组件调用
* 熟悉uni-app
### 总结
* 直接调用其他组件的方法:other.methods.function()，其他组件只有methods、data等，没有生命周期，没有Vuex.store
* mixins混入：复用其他组件，什么都有
* 绑定一个返回对象的计算属性
## 2020/01/08
### 任务
* 封装uni-app请求与响应
* 定义接口规范
* 对接需求，编写收银台（首页、会员信息、添加商品）页面并根据需求进行调整
### 总结
* uni-app的样式布局全部采用flex布局，并封装了全局样式，直接增加类名即可
* 官网的demo缺少css
* 各种样式不生效=》不用
* 跳转的到tab页使用switchTab
* export与import {name}和export default与import customlizesName的区别
## 2020/01/09
### 任务
* 编写常用的uni-app代码片段（布局样式）
* 编写添加商品、订单结算、退换货界面布局
* BUG：uni-scancode扫码接口不支持H5且安卓扫码返回错误结果=>条码反了/质量不行
### 总结
* flex布局
## 2020/01/10
### 任务
* 编写结算、打印小票、购物篮页面
* 编写库存管理、商品管理页面
### 总结
* 快速完成原型图
* 整理代码片段
## 2020/01/11
### 任务
* 了解需求：游客行为信息、个人信息收集
* 编写库存、商品查询、当日订单、小票记录、
### 总结
* props:{value:[String,Number]}
## 2020/01/12
### 任务
* 编写退换货界面
* 编写库存、商品详情
* 建云想项目
* 调整组件、bug
### 总结
* BUG：反复触发点击事件=>点击穿透
* 底部栏固定 = （纵向滚动 + 底部） + 纵向flex布局+ 滚动区域自适应高度 + 底部固定高度 
## 2020/01/13
### 任务
* BUG：滚动区域自适应高度+底部栏固定高度不适配小程序，滚动区域指定固定高度
* 编写常用组件及样式调整
### 总结
* 使用竖向滚动时，需要给 <scroll-view> 一个固定高度，以适应小程序
* radio常用元素名冲突
* nvue不支持全局样式
* h5生效而app不生效的样式情况：使用内联样式
## 2020/01/14
### 任务
* 参照秦丝调整样式
### 总结
* h5生效而app样式错乱：scoped
* props属性命名冲突required
## 2020/01/15
###任务
* 对接及编写小票详情页面
* 导入ThorUI组件、css、request
###总结
* 全局混入 main.js  =>Vue.mixin({methods:{go(){}}})
## 2020/01/16
### 任务
* 对接及编写小票详情页面
* 使用ThorUI重构小票详情页面、确认顾客、会员信息页面
### 总结
* 熟悉ThorUI
## 2020/01/17
### 任务
* 重构添加商品、结算订单页面
* 确认需求：随时随地补充顾客信息，评货、评场
* 整理所需UI组件
### 总结
* box-sizing: border-box;//怪异盒模型width/height为对对象实际宽度/高度
## 2020/01/18
### 任务
* 整理通知栏组件、搜索组件
* 对接按款、按色、按码、按件批量修改库存指定价格的需求
### 总结
* 沟通的重要性
## 2020/01/23 - 2020/01/31
### 任务
* 重构收银服务-支付页面
* 重构商品管理、添加商品页面
* 编写下拉组件、单选按钮组件
* 重构库存CRUD页面
### 总结
* uni-app补充d.ts：先执行 npm init，然后npm i @types/uni-app -D
* padding不能为负
* 超出边界无法显示：overflow:visible
* js引用类型
* text-align:right
* css动画无效=》使用他人组件注意组件定义参数类型
## 2020/02/17
### 任务
* 技术选型 uniapp+ThorUI、mpvue+vant、原生+vant、wepy+vant对比
### 总结
* mpvue+vant
## 2020/02/18
### 任务
* 初始化项目mpvue+vant
### 总结
* 微信开发工具稳定版十分不稳定（可选RC版、测试版）
## 2020/02/19
### 任务
* 编写首页、个人中心静态页面
* 迁移ThorUI部分组件
### 总结
* mpvue编译到dist时不会自动清理旧的文件，导致不能实时更新到微信开发工具
## 2020/02/20
### 任务
* 商品分类页面（移植自Thor小程序原生版）
* 会员码展示页
---
* 温馨提示页面
### 总结
* 路由跳转的url参数
  绝对路径："/xxx"
  相对父级路径："../xxx"
  相对同级路径："./xxx"
* mpvue与原生的区别(移植小程序原生组件注意事项)

|                   | 原生小程序                   | Vue                                     |
| ----------------- | --------------------------------- | --------------------------------------- |
| 数据绑定      | class={{xxx}}                     | :class="xxx"                            |
| 事件绑定      | bindtap                           | @tap                                    |
| 循环for         | wx:for="{{list}}" key="{{index}}" | v-for="(item,index) of list" :key=index |
| 条件渲染if    | wx:if                             | v-if                                    |
| 赋值          | this.setdata(key, value)          | this.key = value                        |
| 取值          | this.data.xxx         | this.xxx                       |
| data写法          | data:{}                           | data(){return{}}                        |
| methods包裹     | 可有可无                      | 需要                                  |
| 响应事件event的值 | event.detail.xxx                        | event.mp.detail.xxx                          |
| catchtap事件    | catchtap                          | @tap.stop()或@click.stop()             |
## 2020/02/23
### 任务
* 搜索页、商品列表页
---
* 商品详情页
### 总结
* 组件props、data数据无法渲染：升级mpvue1.0.11=>mpvue2.0
## 2020/02/24
### 任务
* 增加购物车页、结算订单页、地址页、地址编辑页
### 总结
* 父组件的插槽中无法获取遍历（item、index）的数据（tui-swiper-action），原因未知
## 2020/02/25
### 任务
* 添加收货地址页、已完成订单、订单详情页
### 总结
* :hover="false"与hover="false"的区别：传参数据类型不同，
  组件中接收到的参数false[Boolean]  与 "false"[String]的区别
  =》而"false"[Stirng] == true导致组件内判断错误
## 2020/02/26
### 任务
* 增加红包卡券明细、余额明细、积分明细、亲友圈明细、基本资料、穿衣数据列表、穿衣数据添加、
### 总结 
* 小程序请求ip地址需要进行设置：详情=>本地设置=>不进行域名校验
## 2020/02/27
### 任务
* 封装http请求
* 服务器DNS解析
## 2020/02/29
### 任务
* 表单组件：单选、多选、弹出选择、城市选择、日期选择、步进器、
### 总结
* 日期选择遗留bug：typeError: formater not function
## 2020/03/02
### 任务
* 重构云想app商品详情页面
## 2020/03/04
* 编写临时备案用的网站
## 2020/03/05
*  重构云想库存详情页面

# 2020/3月第4周总结
1. 整理所有页面需要的字段
2. 梳理用户操作流程
3. 搭建小程序商城后台，对接分类接口
4. 配置nginx反向代理，解决服务器跨域问题
