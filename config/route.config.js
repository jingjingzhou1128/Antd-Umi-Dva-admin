export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: './login/index',
    Routes: ['./src/routes/BeforeRoute.js']
  },
  {
    path: '/home',
    component: '../layouts/index',
    routes: [
      {
        path: '/home',
        redirect: '/home/dashboard'
      },
      {
        path: '/home/dashboard',
        component: './dashboard/index',
        Routes: ['./src/routes/BeforeRoute.js']
      }
    ]
  }
]
