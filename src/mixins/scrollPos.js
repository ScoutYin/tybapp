export default {
  activated () {
    let path = this.$route.fullPath + this.scrollId || ''
    if (this.$store.getters.scrollPos[path]) {
      this.$refs.scrollContainer.scrollTop = this.$store.getters.scrollPos[path].y
    } else {
      this.$refs.scrollContainer.scrollTop = 0
    }
  }
}
