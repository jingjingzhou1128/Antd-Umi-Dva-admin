const BasicLayout = '../layouts/BasicLayout/index'

export default [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: 'login',
    component: './login/index',
    Routes: ['./src/routes/BeforeRoute.js'],
    title: 'UMI-Login',
    hidden: true
  },
  {
    path: '/home',
    component: BasicLayout,
    showSub: true,
    routes: [
      {
        path: '/home/dashboard',
        component: './dashboard/index',
        Routes: ['./src/routes/PermisRoute.js'],
        title: 'UMI-Dashboard',
        meta: {
          icon: 'icon-dashboard',
          name: 'dashboard'
        }
      },
      {
        path: '/home/ui',
        component: './ui/index',
        Routes: ['./src/routes/PermisRoute.js'],
        title: 'UMI-UI',
        meta: {
          icon: 'icon-dashboard',
          name: 'ui',
          prmCode: 'UI'
        }
      },
      {
        path: '/home/nest',
        meta: {
          icon: 'icon-dashboard',
          name: 'nest'
        },
        routes: [
          {
            path: '/home/nest/menu1',
            component: './nest/menu1/index',
            Routes: ['./src/routes/PermisRoute.js'],
            title: 'UMI-Nest',
            meta: {
              icon: 'icon-dashboard',
              name: 'nestMenu1',
              prmCode: 'NEST-MENU1'
            }
          },
          {
            path: '/home/nest/menu2',
            component: './nest/menu2/index',
            Routes: ['./src/routes/PermisRoute.js'],
            title: 'UMI-Nest',
            meta: {
              icon: 'icon-dashboard',
              name: 'nestMenu2',
              prmCode: 'NEST-MENU2'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/403',
    component: './403/index',
    title: 'UMI-403',
    hidden: true
  },
  {
    path: '/404',
    component: './404/index',
    title: 'UMI-404',
    hidden: true
  },
  {
    component: './404/index',
    hidden: true
  }
]
