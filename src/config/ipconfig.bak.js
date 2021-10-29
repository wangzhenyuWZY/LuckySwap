/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TGizSAxpQ1fQAbnkrQo3qPVH38S1oT2obt',
    BFactory: 'TGPkMjkFmgDbir4EpYWoqevJtW95RFxwrJ',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TE3svoiN7evPwpbwsqBHeZ7WXTpiFu3UT6',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k',
    TnsAddress: 'TAfHTAi38RuNoqcspp3GNaQrtVKubbxyiX'
  }
} else {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TEtHLYooGrS1ZYKxrcctuqJW3Cj2Pt9BMh',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TCiPisZVGYeSuir6z3ioUMLHwzemn7EEAQ',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k',
    TnsAddress: 'TAfHTAi38RuNoqcspp3GNaQrtVKubbxyiX'
  }
}
export default ipConfig

