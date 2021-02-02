import { fet } from './constants.js'

const api = {}
api.get24HourTradingVolume = params => {
  return fet('api/trade/getTradingVolume', params, 'get')
}
api.getLpComputeApy = params => {
  return fet('api/flowcell/getApy', params, 'get')
}
export function getTokenList(params) {
  return fet('api/coin/tokenInfo', params, 'get')
}
export function getPairList(params) {
  return fet('api/coin/pairInfo', params, 'get')
}
export function getToken(params) {
  return fet('api/token/addToken', params, 'post')
}

export { api }
