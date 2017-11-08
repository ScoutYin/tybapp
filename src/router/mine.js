import MineMyfav from 'views/mine/myfav'
import Settings from 'views/mine/settings'

export default [
  {
    path: '/mine/settings',
    component: Settings,
    name: 'Settings'
  }, {
    path: '/mine/myfav',
    component: MineMyfav,
    name: 'MineMyfav',
    meta: {
      needLogin: true
    }
  }
]
