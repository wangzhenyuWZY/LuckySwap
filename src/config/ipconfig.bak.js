/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TYbHXVsbLTz52SwB9VfiWbkdGr3VFBGKXu',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TARFbaMcbza8REjTmAjZpQRnmpo4jjGGcX',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k',
    TnsAddress: 'TAfHTAi38RuNoqcspp3GNaQrtVKubbxyiX',
    UsdtAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    FarmAddress: 'TRLcQnfNuHVrYdhVKcMBcaRu61Zwfwknu6'
  }
} else {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TYbHXVsbLTz52SwB9VfiWbkdGr3VFBGKXu',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TARFbaMcbza8REjTmAjZpQRnmpo4jjGGcX',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k',
    TnsAddress: 'TAfHTAi38RuNoqcspp3GNaQrtVKubbxyiX',
    UsdtAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    FarmAddress: 'TRLcQnfNuHVrYdhVKcMBcaRu61Zwfwknu6'
  }
}
export default ipConfig

