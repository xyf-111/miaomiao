<template>
  <div>
    <mt-index-list>

      <mt-index-section :index="item.index" v-for='item in citylists' :key='item.index' ref='myrel'>
        <mt-cell :title="data" v-for='(data,index) in item.citys' :key='index'></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
// 由于axios用到的地方比较多，所以可以在main.js文件中引入,这个组件就不用再单独引入了，但是使用方式需要由 axios 换成 this.axios
// import axios from 'axios'
export default {
  data() {
    return {
      citylists: []
    }
  },
  mounted() {
    // 这是不通过配置反向代理获取数据的方式：
    this.axios({
      url: 'https://m.maizuo.com/gateway?k=9922530',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      var cityarr = res.data.data.cities
      // console.log(cityarr)
      this.formatCity(cityarr)
    })
  },
  methods: {
    formatCity(cityarr) {
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
    }
    // 如果不使用mint-ui模板，自己创建原生JS时，对于点击字母后跳转相应的城市列表的方法：
    // 首先在组件中添加点击事件：
    // @touchstart='handleIndex'表示在移动端触摸点击引发事件handleIndex
    // 其次在methods中添加方法
    // handleIndex(index) {
    //   var h2 = this.$refs.myrel.getElementsByTagName('h2')
    //   表示可以获取myrel标签或组件里的h2标签
    //   this.$refs.myref.parentNode.scrollTop = h2[index].offsetTop
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>