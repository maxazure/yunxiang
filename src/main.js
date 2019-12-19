import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}



// 自定义组件
import dragInput from '@/components/drag-component/drag-input'
import dragSelect from '@/components/drag-component/drag-select'
import dragCheckbox from '@/components/drag-component/drag-checkbox'
import dragDatepicker from '@/components/drag-component/drag-datepicker'
import dragNumber from '@/components/drag-component/drag-number'
import dragRadio from '@/components/drag-component/drag-radio'
import dragTextarea from '@/components/drag-component/drag-textarea'

Vue.component('dragRadio', dragRadio)
Vue.component('dragInput', dragInput)
Vue.component('dragSelect', dragSelect)
Vue.component('dragCheckbox', dragCheckbox)
Vue.component('dragDatepicker', dragDatepicker)
Vue.component('dragNumber', dragNumber)
Vue.component('dragTextarea', dragTextarea)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
