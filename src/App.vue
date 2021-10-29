<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from './components/common/Navbar'
import { mapActions } from 'vuex'
import { TokenData, PairData } from './utils/index'
import { joinConnection } from '@/api/api'
export default {
  name: 'App',
  components: {
    navBar
  },
  created() {
    this.init()
    TokenData().then((res) => {
      this.$store.dispatch('setTokenData', res)
    })
    PairData().then((res) => {
      this.$store.dispatch('setPairData', res)
    })
  },
  methods: {
    ...mapActions(['connectWallett']),
    async init() {
      this.$initTronWeb().then((tronWeb) => {
        this.connectWallett()
        this.joinClub()
      })
    },
    joinClub() {
      const that = this
      const params = {
        address: window.tronWeb.defaultAddress.base58,
        invitedAddress: ''
      }
      joinConnection(params).then(result => {
        debugger
        if (result.data.code == 0) {
          sessionStorage.setItem('oneToken', result.data.data.token)
        } else {
          sessionStorage.setItem('oneToken', null)
        }
      })
    }
  }

}
</script>

<style lang="scss" >
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  //  background: url(./assets/img/bg.png)
  //  background-image: url(./assets/img/BG1.png);
  //  background-repeat: no-repeat;
  //  background-size: 100% 380px;
  //  background-size: cover;
}
html {
  //  background: #FFFFFF;
  background: #f6f7fb;
}
</style>
