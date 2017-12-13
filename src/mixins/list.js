export default {
  data () {
    return {
      maxId: 0,
      limit: 20,
      idType: 'id',
      list: [],
      pagination: {},
      total: 0,
      loadFunc: Function,
      // loadEnd: false,
      loading: true,
      status: 0,
      cnt: 0
    }
  },
  mounted () {
  },
  methods: {
    /**
     * 初始化相关参数以及需要调用列表请求接口
     */
    init (cb, params) {
      this.maxId = 0
      this.list = []
      this.loadFunc = cb
      if (params) {
        this.idType = params.idType || 'id'
        this.status = params.status || 0
      }
    },
    async loadData (params = {}) {
      let _params = {
        max_id: this.maxId,
        limit: this.limit,
        status: this.status
      }
      _params = Object.assign(_params, params)
      if (typeof this.loadFunc === 'function') {
        try {
          let res = await this.loadFunc(_params)
          if (this.list.length === 0) {
            this.list = res.data
          }
          this.pagination = res.pagination
          this.$nextTick(() => {
            this.loading = false
          })
          return res.data
        } catch (err) {
          throw err
        }
      } else {
        let error = new Error('cb不是一个function')
        throw error
      }
    },
    async loadMore (params) {
      // 读取到底部则停止
      if (this.loading) {
        return
      }
      let length = this.list.length
      if (length === 0) {
        this.maxId = 0
      } else {
        this.maxId = this.list[length - 1][this.idType]
      }
      try {
        let addList = await this.loadData(params)
        console.log('addList: ', addList)
        // 为0 不能够继续加载更多
        if (addList.length === 0) {
          this.loading = true
        }
        this.list = Array.concat(this.list, addList)
        return this.list
      } catch (err) {
        throw err
      }
    }
  }
}
