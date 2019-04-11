<template>
  <transition v-if="Bool" name="fade-transform" mode="out-in">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </transition>
  <Resolve v-else/>
</template>
<script>
import Resolve from '@/views/requirements/reqlist/resolve'
export default {
  name: 'Reqlist',
  components: {
    Resolve
  },
  data() {
    return {
      Bool: false
    }
  },
  created() {
    this.Bool = this.$store.getters.bool
  }
}
</script>
<style scoped>
</style>
