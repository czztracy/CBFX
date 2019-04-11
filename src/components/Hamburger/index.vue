<template>
  <div>
    <svg
      :class="{'is-active':isActive}"
      t="1492500959545"
      class="hamburger"
      style=""
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1691"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      @click="toggleClick">
      <path d="M466.489 733.867h443.733v-91.023H466.49v91.023zM113.778 512l176.355 176.356V335.644L113.778 512zm0 398.222h796.444V819.2H113.778v91.022zm0-796.444V204.8h796.444v-91.022H113.778zm352.71 267.378h443.734v-91.023H466.49v91.023zm0 176.355h443.734V466.49H466.49v91.022z" fill="#FFF"/><path d="M466.489 733.867h443.733v-91.023H466.49v91.023zM113.778 512l176.355 176.356V335.644L113.778 512zm0 398.222h796.444V819.2H113.778v91.022zm0-796.444V204.8h796.444v-91.022H113.778zm352.71 267.378h443.734v-91.023H466.49v91.023zm0 176.355h443.734V466.49H466.49v91.022z"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transform: rotate(180deg);
	transition: .38s;
  transform-origin: 50% 50%;
}
.hamburger.is-active {
	transform: rotate(0deg);
}
</style>
