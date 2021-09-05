/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TYGiBFqvqkxaqn8JUQ6t6vv1pNZWdNnGjP',
    BFactory: 'THjUTBrVo1VCbpitzQuzCbfwAK42pETeKf',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TLHVtyyMwoiDjQQgEPvyXnRqSTVQ5E9wqS',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k'
  }
} else {
  ipConfig = {
    wtrxAddress: 'TYGiBFqvqkxaqn8JUQ6t6vv1pNZWdNnGjP',
    BFactory: 'THjUTBrVo1VCbpitzQuzCbfwAK42pETeKf',
    MasterChef: 'TNHDUtroDsdPc5oVDo4QmrL3ueSnwQKiLb',
    FactoryManager: 'TLHVtyyMwoiDjQQgEPvyXnRqSTVQ5E9wqS',
    RewardToken: 'TRU8aDiSoY11Qa7FbvguKqoFLmymA2s41k'
  }
}
export default ipConfig

