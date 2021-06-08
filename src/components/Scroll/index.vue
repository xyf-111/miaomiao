<template>
  <div class='scroll_body' ref='scroll_body'>
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    handleScoll: {
      type: Function,
      default: function () {}
    },
    handleTouch: {
      type: Function,
      default: function () {}
    }
  },
  mounted() {
    setTimeout(() => {
      var scroll = new BScroll(this.$refs.scroll_body, {
        tap: true,
        click: true,
        probeType: 1
      })
      this.scroll = scroll
      console.log(scroll)
      scroll.on('scroll', (pos) => {
        this.handleScoll(pos)
      })
      scroll.on('touchEnd', (pos) => {
        this.handleTouch(pos)
      })
    }, 500)
  },
  methods: {
    toScrollTo(y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll_body {
  height: 100%;
  overflow: hidden;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
}
</style>