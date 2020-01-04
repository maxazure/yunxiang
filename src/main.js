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
import YInput from '@/components/yComponent/yInput'
import YSelect from '@/components/yComponent/ySelect'
import YSelectInput from '@/components/yComponent/ySelectInput'
import YCheckbox from '@/components/yComponent/yCheckbox'
import YDatepicker from '@/components/yComponent/yDatepicker'
import YNumber from '@/components/yComponent/yNumber'
import YRadio from '@/components/yComponent/yRadio'
import YTextarea from '@/components/yComponent/yTextarea'
import YText from '@/components/yComponent/yText'
import YSlider from '@/components/yComponent/ySlider'
import YUpload from '@/components/yComponent/yUpload'
import YSwitch from '@/components/yComponent/ySwitch'

Vue.component('YRadio', YRadio)
Vue.component('YInput', YInput)
Vue.component('YSelect', YSelect)
Vue.component('YSelectInput', YSelectInput)
Vue.component('YCheckbox', YCheckbox)
Vue.component('YDatepicker', YDatepicker)
Vue.component('YNumber', YNumber)
Vue.component('YTextarea', YTextarea)
Vue.component('YText', YText)
Vue.component('YSlider', YSlider)
Vue.component('YUpload', YUpload)
Vue.component('YSwitch', YSwitch)

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
