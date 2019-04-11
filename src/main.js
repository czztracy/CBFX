import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import '@/assets/iconfont/iconfont.css'
import comma from './utils/copyAndPaste' // 粘贴内容去空格加逗号

import Cookies from 'js-cookie' // 中英文切换 Cookie缓存
import i18n from './lang' // 语言文本存放位置
import 'font-awesome/css/font-awesome.css' // font Awesome 字体使用
import axios from 'axios'

import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import '@grapecity/spread-sheets-vue'
import '@grapecity/spread-sheets-print'
import '@grapecity/spread-sheets-pdf'
import '@grapecity/spread-sheets-resources-zh'
import GC from '@grapecity/spread-sheets' // 新插件初始部分
// GC.Spread.Sheets.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL'
GC.Spread.Sheets.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL';
GC.Spread.Common.CultureManager.culture('zh-cn') // 文中版本

Vue.prototype.$axios = axios
Vue.prototype.$GC = GC
Vue.use(ElementUI, { locale })

Vue.prototype.$echarts = echarts
Vue.prototype.$comma = comma

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // 设置元素ui大小
  i18n: (key, value) => i18n.t(key, value) // 键值对取值
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
