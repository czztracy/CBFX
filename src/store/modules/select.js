/*
 * @Page: 首页条件选择
 * @Date: 2019-3
 */
const select = {
  state: {
    triggleMonthYear: 'month',
    areaChoose: '中国'
  },
  mutations: {
    SET_SELECT: (state, data) => {
      state.triggleMonthYear = data
    },
    Pass_Value: (state, data) => {
      state.areaChoose = data
    }
  },
  actions: {
    ChangeYear: ({ commit }, data) => {
      commit('SET_SELECT', data)
    }
  }
}
export default select
