<template>
  <section class="yuhuo">
    <h3 class="yuhuo-tit">渔获指数</h3>
    <table cellspacing="0" >
      <caption class="yuhuo-caption">活品</caption>
      <thead>
        <tr>
          <th>种类</th>
          <th>价格指数</th>
          <th>跌涨值</th>
          <th>涨跌幅</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="liveItem in liveProducts" :key="liveItem.id">
          <td>{{liveItem.species}}</td>
          <td>{{liveItem.priceExponent}}</td>
          <td>{{liveItem.fallRise}}</td>
          <td>{{liveItem.chg}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'FishExponent',
  data () {
    return {
      liveProducts: [
        {
          id: 1,
          species: '鱼类',
          priceExponent: '38.00',
          fallRise: '2',
          chg: '5.56%'
        },
        {
          id: 2,
          species: '鱼类',
          priceExponent: '38.00',
          fallRise: '2',
          chg: '5.56%'
        },
        {
          id: 3,
          species: '鱼类',
          priceExponent: '38.00',
          fallRise: '2',
          chg: '5.56%'
        },
        {
          id: 4,
          species: '鱼类',
          priceExponent: '38.00',
          fallRise: '2',
          chg: '5.56%'
        }
      ]
    }
  }
}
</script>

<style lang="less">
@import '../../common/style/less/index.less';
.yuhuo {
  width: 100%;
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      height: 0.7rem;
      font-size: 0.34rem;
      border-bottom: 0.01rem solid #eee;
    }
  }
  thead {
    tr {
      background-color: #eee;
    }
  }
  .yuhuo-tit {
    margin: 0.15rem 0;
    font-size: 0.44rem;
  }
  .yuhuo-caption {
    height: 0.66rem;
    font-size: 0.4rem;
    line-height: 0.66rem;
    color: #fff;
    background-color: #2598db;
  }
}
</style>
