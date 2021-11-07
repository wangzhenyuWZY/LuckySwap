<template>
  <div class="container homeContainer">
    <!-- <div class="c-top"> -->
    <!-- <samp class="c-mp">FoxDex Protocol Analytics</samp> -->
    <!-- <div class="c-inp">
      <input type="text" placeholder="Search FoxDex pairs and tokens">
      </div> -->

    <!-- </div> -->
    <!-- <div class="c-box1">
      <div class="box1-p">
        <span class="bpa">ETH Price:<samp class="bpa1">{{ 389.98 }}</samp></span>
        <span class="bpb">Transactions (24H): <samp class="bpb2">{{173.444}}</samp></span>
        <span class="bpc">Pairs:<samp class="bpc3">{{ 19.162}}</samp></span>
      </div>
      <div class="c-mian">
        <div class="mian-box1">
          <chart/>
        </div>
        <div class="mian-box2">

         <chart2 />
         <circular />
        </div>
      </div>

    </div> -->
    <div class="homeTop">
      <div class="homeleft">
        <h2>{{$t('homelang1')}}</h2>
        <h2>{{$t('homelang2')}}</h2>
        <p>{{$t('homelang3')}}</p>
        <router-link to="/exchange" class="lauchbtn">{{$t('homelang16')}}</router-link>
      </div>
      <div class="homeright">
        <div class="infobox">
          <img src="../../assets/img/homeico1.png">
          <h3>{{$t('homelang4')}}</h3>
          <p>{{$t('homelang5')}}</p>
        </div>
        <div class="infobox">
          <img src="../../assets/img/homeico2.png">
          <h3>{{$t('homelang6')}}</h3>
          <p>{{$t('homelang7')}}</p>
        </div>
        <div class="infobox">
          <img src="../../assets/img/homeico3.png">
          <h3>{{$t('homelang8')}}</h3>
          <p>{{$t('homelang9')}}</p>
        </div>
      </div>
    </div>

    <div class="c-box2">
      <div class="b2-top">
        <samp class="top1">{{$t('homelang10')}}</samp>
        <div class="filter">
          <i></i>
          <input :placeholder="$t('homelang11')" v-model="sortName" @input="filterToken">
        </div>
        <!-- <template slot-scope="scope">
              <div>
                <img :src="$requierImg(scope.row.token1.name,1)"
                   alt="" />
                   <img :src="$requierImg(scope.row.token1.name,0)"
                   alt="" />
              </div>
            </template> -->

      </div>

      <div class="table">
        <el-table
          v-if="mobile"
          :data="pairList"
          header-cell-class-name="adddd"
          header-row-class-name="tabe_tr"
          :header-row-style="{backgroundColor:'#00447B',color:'#878B97'}"
          cell-class-name="dddsadsa"
          style="width: 100%">
          <el-table-column prop="full_name" width="110px" :render-header="renderHeader">
            <template slot-scope="scope">
              <div class="reqimg">
                <span class="logos">
                  <img :src="$requierImg(scope.row.base_token_name)" alt="" />
                  <img :src="$requierImg(scope.row.trade_token_name)" alt="" />
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="full_name" :label="$t('homelang12')">
            <template slot-scope="scope">
              <div class="reqimg block">
                <span>{{scope.row.trade_token_name.toLocaleUpperCase()}}<i>{{scope.row.trade_token_weight*100}}%</i></span>
                  <span>{{scope.row.base_token_name.toLocaleUpperCase()}}<i>{{scope.row.base_token_weight*100}}%</i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="trade_token_liquidity" :label="$t('homelang13')" width="180px">
            <template slot-scope="scope">
              <div class="liquiditybox">
                {{scope.row.trade_token_liquidity| setAssets  }}
                {{scope.row.trade_token_name.toLocaleUpperCase()}}
              </div>
              <div class="liquiditybox">
                {{scope.row.base_token_liquidity | setAssets }}
                {{scope.row.base_token_name.toLocaleUpperCase()}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pair_quantity" :label="$t('homelang14')">
            <template slot-scope="scope">
              <div>
                {{scope.row.pair_quantity | setAssets }}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="trade_price" :label="$t('home.price')">
            <template slot-scope="scope">
              <div>
                {{scope.row.trade_price ? scope.row.trade_price  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="base_quantity_24" :label="$t('home.Volume')">
            <template slot-scope="scope">
              <div>
                {{scope.row.base_quantity_24 ? scope.row.base_quantity_24  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="Change" :label="$t('home.Change')">
            <template slot-scope="scope">
              <div>
                {{scope.row.price_change_24 ? (scope.row.price_change_24*100).toFixed(2)  : "--"}}%
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column :label="$t('operation')" width="230px">
            <template slot-scope="scope">
              <div class="btnbox">
                <router-link :to="{ path: '/pool/connectpool', query: { pairAddress:scope.row.contract_address }}">
                <p class="homeb2"> <span> {{$t('homeb2')}}</span></p>
                  <!-- <el-button size="mini" round>{{$t('homeb2')}}</el-button> -->
                </router-link>
                <router-link :to="{ path: '/exchange', query: { pairAddress:scope.row.contract_address }}">
                  <p class="homeb1"> <span> {{$t('homelang15')}}</span> </p>
                  <!-- <el-button size="mini" round></el-button> -->
                </router-link>
              </div>
            </template>
            <span></span>
          </el-table-column>
        </el-table>
        <el-table
v-if="!mobile"
:data="pairList"
header-cell-class-name="adddd"
header-row-class-name="tabe_tr"
                  :header-row-style="{backgroundColor:'#23323C',color:'#878B97'}"
cell-class-name="dddsadsa"
style="width: 1400px">
          <el-table-column prop="full_name" width="80px" :render-header="renderHeader">
            <template slot-scope="scope">
              <div class="reqimg">
                <span class="logos">
                  <img :src="$requierImg(scope.row.base_token_name)" alt="" />
                  <img :src="$requierImg(scope.row.trade_token_name)" alt="" />
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="full_name" :label="$t('homelang12')" width="160px">
            <template slot-scope="scope">
              <div class="reqimg block">
                <span>{{scope.row.trade_token_name.toLocaleUpperCase()}}<i>{{scope.row.trade_token_weight*100}}%</i></span>
                  <span>{{scope.row.base_token_name.toLocaleUpperCase()}}<i>{{scope.row.base_token_weight*100}}%</i></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="trade_token_liquidity" :label="$t('homelang13')" width="180px">
            <template slot-scope="scope">
              <div class="liquiditybox">
                {{scope.row.trade_token_liquidity| setAssets  }}
                {{scope.row.trade_token_name.toLocaleUpperCase()}}
              </div>
              <div class="liquiditybox">
                {{scope.row.base_token_liquidity | setAssets }}
                {{scope.row.base_token_name.toLocaleUpperCase()}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pair_quantity" :label="$t('homelang14')" width="120px">
            <template slot-scope="scope">
              <div>
                {{scope.row.pair_quantity | setAssets }}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="trade_price" :label="$t('home.price')" width="120px">
            <template slot-scope="scope">
              <div>
                {{scope.row.trade_price ? scope.row.trade_price  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="base_quantity_24" :label="$t('home.Volume')" width="80px">
            <template slot-scope="scope">
              <div>
                {{scope.row.base_quantity_24 ? scope.row.base_quantity_24  : "--"}}
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column prop="Change" :label="$t('home.Change')" width="130px">
            <template slot-scope="scope">
              <div>
                {{scope.row.price_change_24 ? (scope.row.price_change_24*100).toFixed(2)  : "--"}}%
              </div>
            </template>
            <span></span>
          </el-table-column>
          <el-table-column :label="$t('operation')" width="230px">
            <template slot-scope="scope">
              <div class="btnbox">
                <router-link :to="{ path: '/pool/connectpool', query: { pairAddress:scope.row.contract_address }}">
                <p class="homeb2"> <span> {{$t('homeb2')}}</span></p>
                  <!-- <el-button size="mini" round>{{$t('homeb2')}}</el-button> -->
                </router-link>
                <router-link :to="{ path: '/exchange', query: { pairAddress:scope.row.contract_address }}">
                  <p class="homeb1"> <span> {{$t('homelang15')}}</span> </p>
                  <!-- <el-button size="mini" round></el-button> -->
                </router-link>
              </div>
            </template>
            <span></span>
          </el-table-column>

        </el-table>

      </div>
      <div class="pagin">
        <el-pagination background v-if="pairList && pairList.length>=10" layout="prev, pager, next" :total="pairList?pairList.length:0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { mapState } from 'vuex'
import { api } from '../../api/api'
// import chart from './chart.vue'
// import chart2 from './chart2.vue'
// import circular from './circular'
// import {TokenData,PairData} from '../../utils/index'
import { IsPc } from '../../utils/index'
import { getBalanceInPool } from '../../utils/tronwebFn'
export default {
  // computed: {
  //   ...mapState(['pairData'])
  // },
  watch: {
    // pairData(list){
    //   let that = this
    //   this.pairList = JSON.parse(JSON.stringify(list))
    //   if(this.pairList.length>0){
    //     this.$initTronWeb().then(function (tronWeb) {
    //       that.init();
    //       that.getVolPrice24()
    //     })
    //   }
    // }
  },
  data() {
    return {
      pairList: [],
      mobile: IsPc(),
      sortName: ''
    }
  },
  mounted() {
    this.getVolPrice24()
  },
  methods: {
    renderHeader(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
      return h(
        'div',
        [
          h('span', column.label),
          h('div', {
            class: 'tableicon',
            style: ''
          })
        ]
      )
    },
    async init() {
      // const that = this
      // const pairList = []
      for (let index = 0; index < this.pairList.length; index++) {
        const el = this.pairList[index]
        // getTokenDenormalizedWeight(el.token1.address,el.address).then((response) => {
        //   el.token1.widget = parseInt(response,16)/Math.pow(10,el.decimals)
        // })
        // getTokenDenormalizedWeight(el.token2.address,el.address).then((response) => {
        //   el.token2.widget = parseInt(response,16)/Math.pow(10,el.decimals)
        // })
        const res = await getBalanceInPool(el, el.token1)
        const res1 = await getBalanceInPool(el, el.token2)
        // let res2 = await getLpBalanceInPool(el);
        // if(el.token1.name=='USDT'){
        //   let bil = 1+parseFloat(el.token2.widget/el.token1.widget)
        //   el.liquidity = (bil*parseFloat(res1)).toFixed(4)
        // }else if(el.token2.name=='USDT'){
        //   let bil = 1+parseFloat(el.token1.widget/el.token2.widget)
        //   el.liquidity = (bil*parseFloat(res1)).toFixed(4)
        // }
        el.token1Balance = res.toFixed(4)
        el.token2Balance = res1.toFixed(4)
        // pairList.push(el)

        this.$set(this.pairList, index, el)
      }
      // this.pairList = pairList
    },
    getVolPrice24() { // 获取24小时量和价格
      // const res = await api.get24HourTradingVolume()
      axios.get('https://api.lpbswap.com/node/api/trade/getTradingVolume').then((res) => {
        if (res.data.code == 0) {
          this.pairList = res.data.data
        }
      })
    },
    filterToken() {
      const that = this
      if (this.sortName == '') {
        this.getVolPrice24()
        return
      }
      this.pairList = this.pairList.filter(item => {
        return item.full_name.indexOf(that.sortName) !== -1
      })
    }
  },
  filters: {
    setAssets(n) {
      console.log(n)
      n += ''
      if (n) {
        try {
          const arr = n.split('.')
          let arr1
          if (arr.length > 1) {
            if (arr[1].length > 4) {
              arr1 = arr[0] + '.' + arr[1].slice(0, 4)
            } else {
              arr1 = n
            }
          } else {
            arr1 = arr[0]
          }
          return arr1
        } catch (error) {
          console.log(error)
          return n
        }
      }
      return '--'
    }
  }
}
</script>
<style>
.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell,.el-table th.el-table__cell{background:#00447B !important;}
.el-table th.el-table__cell{background:#00447B !important;border:none !important;}
  >>> .cell {
  /* margin-left: 30px; */
}
>>> .adddd {
  background-color: #23323C;
  margin-left: 20px;
}

>>> .el-table__row {
  height: 72px;
  background: #00447B;
}
>>> .cell {
    margin-left: 0;
    font-size: 0.3rem !important;
  }
  .tableicon{
    width:32px;
    height:32px;
background:url(../../assets/img/img_huan.png) no-repeat center;background-size:32px 32px;
  }
  .el-table{
  color:#fff;
}
.el-table, .el-table__expanded-cell,.el-table--enable-row-hover .el-table__body tr:hover>td{
  background:#00447B;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color:#00447B;
}
.el-table tr{
  background-color:#00447B;
}
.el-table th{
  background-color:#00447B;
}
</style>
<style  lang="scss" scoped>
.homeTop{
  padding-bottom:64px;
  padding-top:80px;
  .homeleft{
    width:670px;
    padding-top:20px;
    margin:0 auto;
    h2{
      font-size:38px;
      color:#FFFFFF;
      line-height:57px;
      font-weight: bold;
      padding-bottom:16px;
      text-align:center;
    }
    p{
      font-size:18px;
      color:#FFFFFF;
      line-height:28px;
      padding-bottom:24px;
      text-align:center;
    }
    .lauchbtn{
      display:block;
      width:256px;
      height:48px;
      background:#EB831D;
      line-height:48px;
      text-align:center;
      border-radius:28px;
      font-size:20px;
      color:#fff;
      margin:0 auto;
    }
  }
  .homeright{
    display:flex;
    justify-content: center;
    align-items: center;
    padding-top:56px;
    .infobox{
      margin:0 50px;
      img{
        width:32px;
        height:32px;
      }
      h3{
        font-size:18px;
        color:#fff;
        line-height:21px;
        padding-top:12px;
      }
      p{
        font-size:14px;
        color:#fff;
        line-height:18px;
        padding-top:12px;
        width:300px;
      }
    }
  }
}
.sherotitle{
  font-size:32px;
  color:#fff;
  line-height:38px;
  padding-bottom:56px;
  text-align:center;
  width:720px;
  margin:0 auto;
}
.liquiditybox{
  width:169px;
  height:28px;
  line-height:28px;
  font-size:16px;
  color:#fff;
  text-align:left;
  border-radius:4px;
  margin-bottom:4px;
}
.reqimg {
  display: flex;
  align-items: center;
  width:100%;
  &.block{
    display:block;
    span{
      display:block;
      float:none;
      height:28px;
      border-radius:4px;
      font-size:16px;
      color:#fff;
      line-height:28px;
      text-align:left;
      margin-bottom:4px;
      i{
        color:#878B97;
        padding-left:3px;
      }
    }
  }
  span {
    overflow: hidden;
    float: left;
    position: relative;
    &.logos{
      height: 25px;
    }
  }
  .logos{
    display:flex;
  }
  img {
    // position: absolute;
    // left: 12px;
    // top: 0;
    width: 25px;
    height: 25px;
  }

  // img:nth-child(2) {
  //   transform: translateX(-12px);
  // }
}
.container {
  padding-top: 70px;
  padding-bottom:100px;
}
.t-img {
  width: 22px;
  height: 22px;
  margin-left: 207px;
}
.btnbox{
  display:flex;
}
.homeb1{
   color: #fc6446;
   border: 1px solid #EB831D;
   border-radius: 4px;
   line-height:37px;
   width:72px;
   height:37px;
   text-align:center;
   color:#fff;
   box-sizing: border-box;
}
.homeb2{
background: #EB831D;
border-radius: 4px;
width: 128px;
font-size:16px;
color:#fff;
line-height:37px;
text-align:center;
margin-right:8px;
}

// .el-button{
//   border-radius: 0px;
//   border: 0;
//   border-bottom: 2px solid  #fc6446;
//   color: #fc6446;
//   background: 0;
//   margin-bottom: 4px;
// }
// .el-button--mini.is-round{
//       padding: 2px 0px;
// }
// .c-top {
//   margin: 0 auto;
//   overflow: hidden;
//   width: 800px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }
// .c-mp {
//   margin-top: 40px;
//   height: 27px;
//   font-size: 24px;
//   font-family: Roboto-Medium, Roboto;
//   font-weight: normal;
//   color: #0f1730;
//   line-height: 28px;
// }
.c-inp {
  margin-top: 16px;
  width: 800px;
  height: 48px;
  background: #ffffff;
  border-radius: 28px;
  input {
    width: 262px;
    height: 20px;
    font-size: 18px;
    font-family: roboto-mediumitalic;
    color: #a6aeb7;
    line-height: 21px;
    margin-top: 14px;
    margin-left: 280px;
  }
}
.c-box1 {
  width: 1200px;
  height: 1004px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 40px;
  .box1-p {
    display: flex;
    justify-content: center;
    border-bottom: 1px #ffe5ebf2 solid;

    .bpa,
    .bpb,
    .bpc {
      margin: 32px 24px;
      height: 22px;
      font-size: 20px;
      font-family: roboto-mediumitalic;
      font-weight: normal;
      color: #0f1730;
      line-height: 23px;
    }
  }
  .mian-box1,
  .mian-box2 {
    width: 960px;
    height: 360px;
    border: 1px #ffe5ebf2 solid;
    margin: 44px auto;
  }
}
.c-box2 {
  // margin-top: 120px;
  width: 1200px;
  margin: 0 auto;
  height: 960px;
  border-radius: 16px;
  overflow: hidden;
  background: #00447B;

border: 2px solid #FE9936;
  .b2-top {
    height: 80px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .hottoken{
      font-size:18px;
      color:#fff;
      line-height:21px;
    }
    .filter{
      width:480px;
      height:48px;
      line-height:48px;
      background:#01386D;
      display:flex;
      border-radius:28px;
      align-items: center;
      margin-right:24px;
      i{
        width:24px;
        height:24px;
        background:url(../../assets/img/icon_searching.png) no-repeat center;
        background-size:100% 100%;
        margin:0 15px;
      }
      input{
        font-size:18px;
        color:#fff;
        line-height:48px;
        background:none;
        width:80%;
      }
    }
    .top1 {
      margin-left: 30px;
      font-size: 24px;
      font-family: roboto-mediumitalice;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 33px;
    }
    .top-inp {
      width: 583px;
      height: 48px;
      float: right;
      margin-top: 40px;
      margin-right: 32px;
      background: #ffffff;
      border-radius: 28px;
      border: 1px solid #a6aeb7;
      input {
        border-radius: 28px;
        color: #a6aeb7;
        line-height: 21px;
        // margin-left: 207px;
        margin-top: 12px;
        width: 197px;
        height: 20px;
        font-size: 18px;
        font-family: roboto-mediumitalic;
      }
    }
  }

  .pagin {
    margin-left: 400px;
    margin-top: 33px;
  }
  .table {
    height: 760px;
    background: #00447B;
    width:99%;
    margin:0 auto;
    .tabe_tr {
      /* background-image: linear-gradient(131deg, #FFA61B 0%, #F3330E 100%) ; */
      height: 40px;
    }
  }

  .el-table tr {
    background-color: inherit;
  }
}

::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: #f4f5fa; // 进行修改未选中背景和字体
    color: #878b97;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0f1730; // 进行修改选中项背景和字体
    color: #fff;
  }
}
</style>
<style lang="scss" scoped>

@media screen and (max-width: 750px) {
  .container {
    padding-top: 50px;
  }
  .c-box2 {
    width: 100%;
    height: auto;
  }
  .c-box2 .table {
    height: auto;
    width:99%;
    margin:0 auto;
  }
  .c-box2 .b2-top {
    height:auto;
    line-height: 40px;
    display:block;
    .top1{
      margin-left:0;
      font-size:22px;
      text-align:center;
      width:100%;
      margin-bottom:20px;
      display:block;
      margin-top:18px;
    }
    .filter{
      width:100%;
      height:36px;
      line-height:36px;
      margin-bottom:25px;
    }
  }
  .homeTop{
    display:block;
    padding:0 20px;
    .homeleft{
      width:100%;
      h2{
        font-size:24px;
        line-height:29px;
        text-align:center;
        padding-bottom:12px;
      }
      p{
        font-size:15px;
        line-height:18px;
        padding-bottom:12px;
      }
      .lauchbtn{
        width:128px;
        height:28px;
        line-height:28px;
        font-size:10px;
        margin:0 auto 28px;
      }
    }
    .homeright{
      display:block;
      padding-top:0;
      padding-bottom:30px;
      .infobox{
        width:100%;
        padding:20px 0;
        text-align:center;
        margin:0;
        p{
          text-align:left;
          width:100%;
        }
      }
    }
  }
}

</style>
