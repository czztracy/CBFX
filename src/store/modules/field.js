/*
 * @Page: 字段库
 * @Author: csg
 * @Date: 2018-11
 * @Last Modified by: csg
 */

const Field = {
  state: {
    fieldBool: false
  },
  mutations: {
    SET_FIELDBOOL: (state, bool) => {
      state.fieldBool = bool
      localStorage.fieldBool = bool
    }
  },
  actions: {
    FieldShowHide({ commit }, bool) {
      commit('SET_FIELDBOOL', bool)
    }
  }
}

export default Field
