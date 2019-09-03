// 登陆注册模块
import Accounts from '@/views/accounts/index'

// 路由懒加载
const _import = file => () => import('@/views/' + file + '/index.vue')

// 路由配置表
const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('home'),
    children: [
    ]
  },
  {
    path: '/finish',
    name: 'finish',
    component: _import('finish')
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
    redirect: '/accounts/login',
    children: [
      {
        name: 'login',
        path: 'login',
        component: _import('accounts/login')
      },
      {
        name: 'login-other',
        path: 'login-other',
        component: _import('accounts/login-other')
      },
      {
        name: 'register',
        path: 'register',
        component: _import('accounts/register')
      },
      {
        name: 'password-reset',
        path: 'password-reset',
        component: _import('accounts/password-reset')
      }
    ]
  }
]

export default routes
