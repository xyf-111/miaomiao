<template>
  <div>
    <Header title='喵喵影院'></Header>
    <Cinemalists></Cinemalists>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Cinemalists from '@/components/Cinemalists'
export default {
  name: 'Cinema',
  components: {
    Header,
    TabBar,
    Cinemalists
  }
}
</script>

<style lang="scss">
</style>