<template>
  <div class="deposit-withdraw" v-show="isShow">
    <div class="mantle"></div>
    <div class="container">
      <div class="tabs">
        <div class="tab deposit" @click="tabDeposit" :class="tabSelected === 'deposit' ? 'active' : ''">{{$t('lang23')}}</div>
        <div class="tab withdraw" @click="tabWithdraw" :class="tabSelected === 'withdraw' ? 'active' : ''">
          {{$t('lang24')}}
        </div>
      </div>
      <div class="deposit content" v-show="tabSelected === 'deposit'">
        <div class="top-container">
          <div class="input-container">
            <input type="text" v-model="depostNum" />
            <div class="unit">USDT</div>
          </div>
          <div class="info-container">
            <div class="info-item">
              <div class="key">{{$t('Exc.Balance')}}</div>
              <div class="value">
                <div class="num">{{parseFloat(tnsBalance).toFixed(2)}}</div>
                <div class="unit">USDT</div>
              </div>
            </div>
            <div class="info-item">
              <div class="key">APY</div>
              <div class="value">
                <div class="num">{{apy}}</div>
                <div class="pecent">%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="isDeposit" :disabled='isDeposit' class="btn confirm" @click="deposit">{{$t('lang23')}}</el-button>
          <el-button :loading="false" :disabled='isDeposit' class="btn confirm unselect" @click="back">{{$t('lang25')}}</el-button>
        </div>
      </div>
      <div class="withdraw content" v-show="tabSelected === 'withdraw'">
        <div class="revenue-container">
          <div class="revenue fir">
            <div class="title">{{$t('lang26')}}</div>
            <div class="subtitle">{{$t('lang27')}}</div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">{{$t('lang28')}}</div><!--已赚取-->
                <div class="value">
                  <div class="num">{{(parseFloat(userInfo.withdrawTotal)+parseFloat(userInfo.notExtractedIncome)).toFixed(2)}}</div>
                  <div class="unit">USDT</div>
                </div>
                <div class="value">
                  <div class="num">{{(parseFloat(userInfo.lpcWithdrawTotal)+parseFloat(userInfo.lpcAmount)).toFixed(2)}}</div>
                  <div class="unit">LPC</div>
                </div>
              </div>
              <div class="info-item" v-show="false">
                <div class="key">{{$t('lang29')}}</div><!--待提取-->
                <div class="value">
                  <div class="num">{{userInfo.notExtractedIncome}}</div>
                  <div class="unit">USDT</div>
                </div>
                <div class="value">
                  <div class="num">{{userInfo.notExtractedIncome}}</div>
                  <div class="unit">LPC</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">{{$t('lang47')}}</div><!--可提取-->
                <div class="value">
                  <div class="num">{{userInfo.notExtractedIncome}}</div>
                  <div class="unit">USDT</div>
                </div>
                <div class="value">
                  <div class="num">{{userInfo.lpcAmount}}</div>
                  <div class="unit">LPC</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">{{$t('lang50')}}</div><!--手续费-->
                <div class="value">
                  <div class="num">{{tokenlist[0].percentageFee}}%</div>
                  <div class="unit">USDT</div>
                </div>
                <div class="value">
                  <div class="num">{{tokenlist[1].percentageFee}}%</div>
                  <div class="unit">LPC</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="revenue sec" v-show="false">
            <div class="title">Mining revenue</div>
            <div class="subtitle">Automatically withdraw to the wallet after seven days</div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">Issued</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">LPC</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">Unreleased</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">LPC</div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <input class="amountlpc" :placeholder="$t('lang54')" v-model="withNum">
        <div class="btn-container">
          <el-button :loading="isWithdraw" :disabled='isWithdraw' class="btn confirm" @click="withdraw(1,withNum)" style="margin-bottom:0;">{{$t('lang24')}} USDT</el-button>
          <el-button :loading="isWithdrawLpc" :disabled='isWithdrawLpc' class="btn confirm" @click="withdraw(2,withNum)">{{$t('lang24')}} LPC</el-button>
          <el-button :loading="false" :disabled='isWithdraw' class="btn confirm unselect" @click="back">{{$t('lang25')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositWithdraw',
  props: {
    show: {
      default: false
    },
    selectedIndex: {
      default: 'withdraw'
    },
    tnsBalance: {
      type: Number,
      default: 0
    },
    userInfo: {
      type: Object,
      default: {}
    },
    isWithdraw: {
      default: false
    },
    isWithdrawLpc: {
      default: false
    },
    isDeposit: {
      default: false
    },
    apy: {
      default: 200
    },
    tokenlist: {
      default: []
    }
  },
  data() {
    return {
      isShow: false,
      tabSelected: this.selectedIndex,
      depostNum: '',
      withNum: ''
    }
  },
  watch: {
    show(newVal) {
      this.isShow = newVal
    },
    selectedIndex(newVal) {
      this.tabSelected = newVal
    }
  },
  methods: {
    tabDeposit() {
      this.tabSelected = 'deposit'
    },
    tabWithdraw() {
      this.tabSelected = 'withdraw'
    },
    close() {
      this.$emit('close', false)
    },
    back() {
      this.close()
      this.$emit('back')
    },
    deposit() {
      if (this.depostNum > this.tnsBalance) {
        this.$message.error('LPC余额不足')
        return
      }
      this.$emit('deposit', this.depostNum)
    },
    withdraw(n, w) {
      this.$emit('withdraw', n, w)
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
@import '../themes/style/depositWithdraw.less';
.container{
  padding-top:0;
  height:auto;
}

</style>
