
import { storage } from '../storage'
import { selectAll } from '@/api/select'

const state = {
  // 默认读取storage里面的数据
  all: storage.getLocalStorageName
}

const mutations = {
  SET_DATA(state, data) {
    // 拿到数据有，向state和storage里面都放入数据
    state.all = data
    storage.setLocalStorageName = data
  }
}

const actions = {
  async setSelectConst({ commit, state }) {
    const res = await selectAll()
    commit('SET_DATA', res.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
