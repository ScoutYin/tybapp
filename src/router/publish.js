import PublishFish from 'views/publish/fish'
import PublishShip from 'views/publish/ship'
import PublishRecruiting from 'views/publish/recruiting'
import PublishJobHunting from 'views/publish/job-hunting'

export default [
  {
    path: '/publish/fish',
    component: PublishFish,
    name: 'PublishFish',
    meta: {
      needLogin: true
    }
  }, {
    path: '/publish/ship',
    component: PublishShip,
    name: 'PublishShip',
    meta: {
      needLogin: true
    }
  }, {
    path: '/publish/recruiting',
    component: PublishRecruiting,
    name: 'PublishRecruiting',
    meta: {
      needLogin: true
    }
  }, {
    path: '/publish/job-hunting',
    component: PublishJobHunting,
    name: 'PublishJobHunting',
    meta: {
      needLogin: true
    }
  }
]
