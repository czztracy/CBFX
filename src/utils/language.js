export default {
  computed: {
    getLanguage() {
      return this.$store.getters.language
    }
  },
  watch: {
    getLanguage(val) {
      console.log(val)
      if (val === 'zh') {
        document.getElementsByClassName(
          'el-pagination__jump'
        )[0].firstChild.data = '跳转到第'
        document.getElementsByClassName(
          'el-pagination__jump'
        )[0].lastChild.data = '页'
      } else if (val === 'en') {
        document.getElementsByClassName(
          'el-pagination__jump'
        )[0].firstChild.data = 'Jump to the first'
        document.getElementsByClassName(
          'el-pagination__jump'
        )[0].lastChild.data = 'Page'
      }
      console.log(this.$t('breakDown'), this.$store.getters.language)
    }
  },
  mounted() {
    if (this.$store.getters.language === 'zh') {
      document.getElementsByClassName(
        'el-pagination__jump'
      )[0].firstChild.data = '跳转到第'
      document.getElementsByClassName(
        'el-pagination__jump'
      )[0].lastChild.data = '页'
    } else if (this.$store.getters.language === 'en') {
      document.getElementsByClassName(
        'el-pagination__jump'
      )[0].firstChild.data = 'Jump to the first'
      document.getElementsByClassName(
        'el-pagination__jump'
      )[0].lastChild.data = 'Page'
    }
  }
}
