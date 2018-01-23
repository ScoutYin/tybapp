export default {
  activated () {
    if (this.$store.getters.scrollPos[this.$route.fullPath]) {
      this.$refs.scrollContainer.scrollTop = this.$store.getters.scrollPos[this.$route.fullPath].y
    } else {
      this.$refs.scrollContainer.scrollTop = 0
    }
  }
}
