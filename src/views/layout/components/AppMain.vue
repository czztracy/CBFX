<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!-- or name="fade" -->
    <!-- <keep-alive> -->
    <!-- <router-view :key="key"/> -->
    <!-- <router-view/> -->
    <!-- </keep-alive> -->
    <!-- <router-view v-if="!$route.meta.keepAlive" :key="key"/> -->
    <!-- </transition> -->
    <!-- 导航切换修改 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" transition-mode="out-in"/>
    </keep-alive>
    <!-- 非缓存组件跳转页面 -->
    <router-view v-if="!$route.meta.keepAlive" transition-mode="out-in"/>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 153px);
  position: relative;
  overflow: hidden;
}
</style>
