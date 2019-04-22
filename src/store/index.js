import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  state: {
    // gatewayUrl: "http://113.31.21.52:9002/api/gateway.do",
    gatewayUrl: "http://127.0.0.1:8080",
    tzdOperator: {
      account: "",
      password: "",
    },                                                              //操作员
    pickerOptions: {
      shortcuts: [
        {
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', Date.now().withStartOfDay());
          }
        },
        {
          text: '昨天',
          onClick(picker) {
            picker.$emit('pick', Date.now().plusDays(-1).withStartOfDay());
          }
        },
        {
          text: '明天',
          onClick(picker) {
            picker.$emit('pick', Date.now().plusDays(1).withStartOfDay());
          }
        },
        {
          text: '本月初',
          onClick(picker) {
            picker.$emit('pick', Date.now().withDayOfMonth(1).withStartOfDay());
          }
        },
        {
          text: '本月底',
          onClick(picker) {
            picker.$emit('pick', Date.now().withEndOfMonth().withStartOfDay());
          }
        },
        {
          text: '本年初',
          onClick(picker) {
            picker.$emit('pick', Date.now().withMonthOfYear(1).withDayOfMonth(1).withStartOfDay());
          }
        },
        {
          text: '本年底',
          onClick(picker) {
            picker.$emit('pick', Date.now().plusYears(1).withMonthOfYear(1).withDayOfMonth(1).plusDays(-1).withStartOfDay());
          }
        },
      ]
    },
  },
  getters
})

export default store
