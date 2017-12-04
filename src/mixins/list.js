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
      unLoadMore: true
    }
  },
  mounted () {
  },
  methods: {
    /**
     * 初始化相关参数以及需要调用列表请求接口
     */
    init (cb, idType) {
      this.maxId = 0
      this.list = []
      this.loadFunc = cb
      this.idType = idType
    },
    async loadData (params) {
      console.log('我被调用了几次')
      let _params = {
        max_id: this.maxId,
        limit: this.limit
      }
      if (typeof this.loadFunc === 'function') {
        try {
          let res = await this.loadFunc(_params)
          if (this.list.length === 0) {
            this.list = res.data
          }
          this.pagination = res.pagination
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
      console.log('我被调用了吗')
      this.unLoadMore = true
      let length = this.list.length
      if (length === 0) {
        this.maxId = 0
      } else {
        this.maxId = this.list[length][this.idType]
      }
      try {
        let addList = await this.loadData(params)
        // 不为0 说明能够继续加载更多
        if (addList.length !== 0) {
          this.unLoadMore = false
        }
        this.list = Array.concat(this.list, addList)
        return this.list
      } catch (err) {
        throw err
      }
    }
  }
}
