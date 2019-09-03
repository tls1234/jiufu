import router from './index'
import * as storage from '@/utils/storage'

//  判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   storage.set('sessionId', '1cec13ecd1024f13a2fb6719d1f0bd5f11520')
//   storage.set('userInfo', JSON.stringify(
//     {
//       userInfo: {
//         bigUserIcon: 'http://121.35.249.14:8000/user/2018/07/09/5921dc47768a4b1481cf095a3feeab71__640x640_96x96.jpg',
//         email: '',
//         gender: 2,
//         imId: '1973230810537838594',
//         imPwd: '1953350197687049186',
//         invUserId: 1,
//         nickname: '犇犇1001252',
//         phoneNum: '18000001801',
//         trdAccount: '1000000811',
//         uType: 1,
//         userCode: '1001252',
//         userIcon: 'http://121.35.249.14:8000/user/2018/07/09/5921dc47768a4b1481cf095a3feeab71__640x640_96x96.jpg',
//         userId: 2940131983252928547,
//         userSourceChannelId: '1',
//         username: '马其顿',
//         vType: 0
//       }
//     }))

//   let userInfo = storage.get('userInfo')

//   // 判断是否需要登录权限
//   if (to.matched.some(res => res.meta.requireAuth)) {
//     // 判断是否登录
//     if (userInfo) {
//       next()
//     } else {
//       // 没登录则跳转到登录界面
//       next({
//         path: '/Login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
//   next()
// })
