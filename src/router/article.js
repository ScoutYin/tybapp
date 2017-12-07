import ArticleList from '../views/article'
import ArticleDetail from '../views/article/detail'

export default [
  {
    path: '/article',
    component: ArticleList,
    name: 'ArticleList'
  }, {
    path: '/article/:id',
    component: ArticleDetail,
    name: 'ArticleDetail'
  }
]
