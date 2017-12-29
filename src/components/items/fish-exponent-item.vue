<template>
  <section class="fish-exponent-item-wrapper">
    <table cellspacing="0" >
      <caption class="caption">{{ title }}</caption>
      <thead>
        <tr>
          <th>种类</th>
          <th>价格指数</th>
          <th>跌涨值</th>
          <th>涨跌幅</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{$t(`ExponentType.${item.type}`)}}</td>
          <td>{{item.price}}</td>
          <td>{{item.value}}</td>
          <td>{{item.percent}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'FishExponent',
  props: {
    list: Array,
    title: String
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.fish-exponent-item-wrapper {
  // width: 100%;
  margin: 10px 10px 30px 10px;
  table {
    width: 100%;
    border-collapse: collapse;
    border-color: #eee;
    border-style: solid;
    border-left-width: 1px;
    border-right-width: 1px;
    tr {
      height: 30px;
      padding: 5px;
      font-size: 14px;
      border-bottom: 0.01rem solid #eee;
      text-align: center;
    }
  }
  thead {
    tr {
      background-color: #eee;
    }
  }
  .caption {
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #fff;
    background-color: #2598db;
  }
}
</style>
