import { fet } from './constants.js'

const api = {}
api.get24HourTradingVolume = params => {
  return fet('api/trade/getTradingVolume', params, 'get')
}
api.getLpComputeApy = params => {
  return fet('api/flowcell/getApy', params, 'get')
}
export function getTokenList(params) {
  return fet('node/api/token/getToken', params, 'get')
}
export function getPairList(params) {
  return fet('node/api/token/getPair', params, 'get')
}
export function getToken(params) {
  return fet('node/api/token/addToken', params, 'post')
}

// 获取一次性TOKEN
export function getOneToken(params) {
  return fet('api/v1/token/get', params, 'get')
}
// 加入网体
export function joinConnection(params) {
  return fet('api/connection', params, 'post')
}
// 获取TNS价格
export function getTnsPrice(params) {
  return fet('api/getTnsPrice', params, 'get')
}

// 获取我的邀请人
export function getInvitedAddress(params) {
  return fet('api/getInvitedAddress', params, 'get')
}

// 获取用户团队
export function getUserTeam(params) {
  return fet('api/team', params, 'get')
}
// 冲币
export function doDeposit(params) {
  return fet('api/deposit', params, 'post')
}

// 提币
export function doWithdrawByTxid(params) {
  return fet('api/withdrawByTxid', params, 'post')
}
// 提币
export function doWithdraw(params) {
  // return fet('api/withdraw', params, 'post')
  return fet('api/withdrawByAmount', params, 'post')
}
// 个人数据统计
export function userInfo(params) {
  return fet('api/info', params, 'post')
}
// 资金池
export function getPools(params) {
  return fet('api/capitalPool', params, 'post')
}

export function getCoinList(params) {
  return fet('api/v1/currency/list', params, 'get')
}

export { api }
