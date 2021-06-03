<template>
  <div>
    <mt-index-list>
      <mt-index-section :index="item.index" v-for='item in citylists' :key='item.index'>
        <mt-cell :title="data" v-for='(data,index) in item.citys' :key='index'></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      citylists: []
    }
  },
  mounted() {
    axios({
      url: 'https://m.maizuo.com/gateway?k=9922530',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      var cityarr = []
      cityarr = res.data.data.cities
      // console.log(cityarr)
      for (var i = 65; i < 91; i++) {
        var subcityarr = []
        var letter = String.fromCharCode(i)
        for (var j = 0; j < cityarr.length; j++) {
          if (cityarr[j].pinyin.substring(0, 1) === letter.toLowerCase()) {
            subcityarr.push(cityarr[j].name)
          }
        }
        if (subcityarr.length) {
          this.citylists.push({
            index: letter,
            citys: subcityarr
          })
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>