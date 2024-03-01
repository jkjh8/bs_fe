const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  // auth signin and signup
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/SignInPage.vue') },
      {
        path: 'signup',
        component: () => import('pages/auth/SignUpPage.vue')
      }
    ]
  },
  // broadcast funtions
  {
    path: '/broadcast',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'zonesetup',
        component: () => import('pages/broadcast/zoneSetupPage.vue')
      },
      {
        path: 'files',
        component: () => import('pages/broadcast/filesPage.vue')
      },
      {
        path: 'eventlog',
        component: () => import('pages/broadcast/eventlogPage.vue')
      }
    ]
  },
  // admin functions
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'users', component: () => import('pages/admin/UsersPage.vue') },
      {
        path: 'devices',
        component: () => import('pages/admin/DeviceManagement.vue')
      },
      {
        path: 'logs',
        component: () => import('pages/admin/LogsPage.vue')
      }
    ]
  },
  // devices
  {
    path: '/devices',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/devices/devicesPage.vue') },
      { path: 'qsys', component: () => import('pages/devices/qsysPage.vue') },
      { path: 'barix', component: () => import('pages/devices/barixPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
