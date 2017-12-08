import ArticleList from '../views/article'
import ArticleDetail from '../views/article/detail'

export default [
  {
    path: '/article',
    component: ArticleList,
    name: 'ArticleList'
  }, {
    path: '/article/detail',
    component: ArticleDetail,
    name: 'ArticleDetail'
  }
]
