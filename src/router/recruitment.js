import RecruitmentRecruiting from 'views/recruitment/recruiting'
import RecruitmentJobHunting from 'views/recruitment/jobHunting'

export default [
  {
    path: '/recruitment/recruiting',
    component: RecruitmentRecruiting,
    name: 'Recruiting'
  }, {
    path: '/recruitment/jobHunting',
    component: RecruitmentJobHunting,
    name: 'JobHunting'
  }
]
