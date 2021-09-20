/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TEtHLYooGrS1ZYKxrcctuqJW3Cj2Pt9BMh',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TCiPisZVGYeSuir6z3ioUMLHwzemn7EEAQ',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k'
  }
} else {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TEtHLYooGrS1ZYKxrcctuqJW3Cj2Pt9BMh',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TCiPisZVGYeSuir6z3ioUMLHwzemn7EEAQ',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k'
  }
}
export default ipConfig

