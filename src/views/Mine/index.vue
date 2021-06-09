<template>
  <div id='mine'>
    <Header title='我的喵喵'></Header>
    <Login />
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
export default {
  name: 'Mine',
  components: {
    Header,
    TabBar,
    Login
  }
}
</script>

<style lang="scss">
#mine {
  width: 100%;
  height: 100%;
}
</style>