import Vue from 'vue'
import Vuex from 'vuex'
import Sheets from './Sheets'
import AppSettings from './AppSettings'
import testVuex from './testVuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    Sheets,
    AppSettings,
    testVuex,
  },
})
