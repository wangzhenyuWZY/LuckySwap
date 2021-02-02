import * as types from './action-types'

const action = {
  async connectWallett({ commit }, flag) {
    if (flag === false) return
    try {
      web3.eth.getAccounts().then(res=>{
          let defaultAccount = res[0]
          commit(types.CONNECT_WALLET, defaultAccount)
      });
    } catch (error) {
      console.log(error)
    }
  },
  setTokenData({ commit }, data) {
    commit(types.SET_TOKEN_DATA, data)
  },
  setPairData({ commit }, data) {
    commit(types.SET_PAIR_DATA, data)
  },
  settheme({ commit }, data) {
    commit(types.SET_THEME_RED, data)
  }
}
export default action
