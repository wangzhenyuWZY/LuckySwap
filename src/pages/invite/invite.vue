<template>
  <div id="invite" class="invite container">
    <!-- <headTitle></headTitle> -->
    <!-- <div class="banner">
      <div class="banner-inner">
        <div class="banner-image"></div>
        <div class="banner-desc-container">
          <div class="banner-logo"></div>
          <div class="banner-desc">{{$t('lang1')}}</div>
        </div>
      </div>
    </div> -->
    <div class="content">
      <div class="background"></div>
      <div class="invite-info">
        <div class="container-title">{{$t('lang15')}}</div>
        <div class="info-container">
          <div class="info-item">
            <div class="title">{{$t('lang16')}}</div>
            <div class="value">{{ myAddress }}</div>
          </div>
          <div class="info-item">
            <div class="title">{{$t('lang17')}}</div>
            <div class="value">{{ myInviterAddress }}</div>
          </div>
          <div class="info-item">
            <div class="title">{{$t('lang18')}}</div>
            <div class="value">{{ myInvitationLink }}</div>
          </div>
        </div>
        <div class="copy-all" @click="tapHandle">{{$t('lang19')}}</div>
      </div>
      <div class="org-ref-container">
        <div class="border-container organization">
          <div class="title">{{$t('lang21')}}</div>
          <div class="tab-container">
            <el-table :data="origanizationData" style="width: 100%" :show-header="false">
              <el-table-column prop="name"></el-table-column>
              <el-table-column prop="value" align="right">
                <template slot-scope="scope">
                  <div class="organization-value">{{ scope.row.value }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="border-container referral">
          <div class="title">{{$t('lang20')}}</div>
          <div class="tab-container">
            <el-table :data="referralData" empty-text="No Data" style="width: 100%;width:450px;" :header-row-class-name="'tab-title-line'">
              <el-table-column prop="address" :label="$t('lang39')"></el-table-column>
              <el-table-column prop="teamNum" :label="$t('lang40')" align="center"></el-table-column>
              <el-table-column prop="performance" :label="$t('lang44')" align="center"></el-table-column>
              <el-table-column prop="solidifyPerformance" :label="$t('lang51')" align="center"></el-table-column>
              <el-table-column prop="teamPerformance" :label="$t('lang41')" align="right"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress, getUserTeam } from '@/api/api'
import { handleClipboard } from '@/assets/js/clipboard.js'
export default {
  name: 'Invite',
  data() {
    return {
      myAddress: '',
      myInviterAddress: '',
      myInvitationLink: '',
      tnsPrice: 0,
      referralData: [],
      hasInviter: false,
      origanizationData: [
        {
          name: this.$t('lang36'),
          value: '0'
        },
        {
          name: this.$t('lang37'),
          value: '0'
        },
        {
          name: this.$t('lang52'),
          value: 0
        },
        {
          name: this.$t('lang38'),
          value: ''
        }
      ]
    }
  },
  methods: {
    init() {
      // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.myAddress = tronWeb.defaultAddress.base58
        that.joinClub()
      })
    },
    getUrlKey(name, url) {
      return (
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')
        ) || null
      )
    },
    tapHandle(e) {
      if (!this.hasInviter) {
        this.$message.error(this.$t('lang48'))
        return
      }
      const self = this
      handleClipboard(
        self.myInvitationLink,
        e,
        () => {
          console.log('已经复制在剪贴版')
          self.$message({
            message: 'Copy succeeded',
            type: 'success'
          })
        },
        () => {}
      )
    },
    getInviter() {
      const that = this
      // 获取推荐人
      if (that.myAddress == 'TP3EUMq8mT5xzxKb4ooLeX1KNHg9W5YQkf') {
        that.myInviterAddress = '0x0'
        that.myInvitationLink = 'https://www.lpbswap.com/?inviter=' + tronWeb.defaultAddress.base58
      } else {
        getInvitedAddress().then(result => {
          if (result.data.code == 0) {
            if (result.data.data) {
              that.myInvitationLink = 'https://www.lpbswap.com/?inviter=' + tronWeb.defaultAddress.base58
              that.myInviterAddress = result.data.data.invitedAddress
              that.hasInviter = true
            } else {
              that.myInviterAddress = that.$t('lang49')
            }
          }
        })
      }
    },
    joinClub() {
      const that = this
      const params = {
        address: this.myAddress,
        invitedAddress: that.myInviterAddress
      }
      joinConnection(params).then(result => {
        if (result.data.code == 0) {
          sessionStorage.setItem('oneToken', result.data.data.token)
          that.getTeam()
          that.getInviter()
        } else {
          that.myInviterAddress = 'Please contact your superior'
        }
      })
    },
    getPrice() {
      const that = this
      getTnsPrice().then(res => {
        if (res.data.code == 0) {
          that.tnsPrice = res.data.data.tnsprice
        }
      })
    },
    getTeam() {
      const that = this
      getUserTeam().then(res => {
        if (res.data.code == 0) {
          // that.origanizationData[0].value = res.data.data.wholeNetworkNum
          that.origanizationData[0].value = res.data.data.teamTotalNum
          that.origanizationData[1].value = parseInt(res.data.data.teamTotalPerformance)
          that.origanizationData[3].value = res.data.data.grade
          that.referralData = res.data.data.teamDto
          if (that.referralData.length > 0) {
            that.referralData.forEach((item, index) => {
              item.teamPerformance = parseInt(item.teamPerformance)
              item.performance = parseInt(item.performance)
              that.origanizationData[2].value += parseInt(item.solidifyPerformance)
            })
          }
        }
      })
    }
  },
  mounted() {
    const that = this
    this.init()
    this.myInviterAddress = this.getUrlKey('inviter', window.location.href)
    this.getPrice()
  }
}
</script>
<style>
.el-table, .el-table__expanded-cell, .el-table--enable-row-hover .el-table__body tr:hover>td,.el-table tr,.el-table th{
  background:none !important;
  padding:0;
}
.el-table .cell{
  color:#909399;
}
.el-table__row{
  padding:0 !important;
}
.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell, .el-table th.el-table__cell{
background:#fff !important;
padding:12px 0;
}
.el-table, .el-table__expanded-cell, .el-table--enable-row-hover .el-table__body tr:hover>td, .el-table tr, .el-table th{
  padding:12px 0;
}
.tab-container{
  overflow-x: scroll;
}
</style>
<style lang="less" scoped>
@import '@/themes/style/invite.less';

</style>

