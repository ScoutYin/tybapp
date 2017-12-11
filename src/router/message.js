import MessageComment from 'views/message/comment'
import MessagePersonalLetter from 'views/message/personal-letter'
import MessageReply from 'views/message/reply'
import MessageSystem from 'views/message/system'

export default [
  {
    path: '/message/comment',
    component: MessageComment,
    name: 'MessageComment',
    meta: {
      needLogin: true
    }
  }, {
    path: '/message/personal-letter',
    component: MessagePersonalLetter,
    name: 'MessagePersonalLetter',
    meta: {
      needLogin: true
    }
  }, {
    path: '/message/reply',
    component: MessageReply,
    name: 'MessageReply',
    meta: {
      needLogin: true
    }
  }, {
    path: '/message/system',
    component: MessageSystem,
    name: 'MessageSystem',
    meta: {
      needLogin: true
    }
  }
]
