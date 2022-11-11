import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layzloading will create many files and slow on compiling, so best not to use lazyloading on devlopment.
 * The syntax is lazyloading, but we convert to proper require() with babel-plugin-syntax-dynamic-import
 * @see https://doc.laravue.dev/guide/advanced/lazy-loading.html
 */

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/* Router for modules */
import adminRoutes from './modules/admin';
import errorRoutes from './modules/error';
import permissionRoutes from './modules/permission';

/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect'),
    hidden: true,
  },
  {
    path: '/404',
    redirect: { name: 'Page404' },
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/edit',
    children: [
      {
        path: 'edit',
        component: () => import('@/views/users/SelfProfile'),
        name: 'SelfProfile',
        meta: { title: 'userProfile', icon: 'user', noCache: true },
      },
    ],
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/',
    name: 'News',
    alwaysShow: true,
    meta: {
      title: 'news',
      icon: 'admin',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/index'),
        name: 'News',
        meta: { title: 'News', icon: 'user', noCache: true },
      },
      {
        path: 'create',
        component: () => import('@/views/news/create'),
        name: 'News',
        meta: { title: 'News', icon: 'user', noCache: true },
      },
    ],
  },
  {
    path: '/page',
    component: Layout,
    redirect: '/page/',
    name: 'Page',
    alwaysShow: true,
    meta: {
      title: 'Page',
      icon: 'admin',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/page/index'),
        name: 'Page',
        meta: { title: 'Page', icon: 'user', noCache: true },
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/page/edit'),
        name: 'Edit',
        meta: { title: 'Edit', icon: 'user', noCache: true },
        hidden: true,
      },
    ],
  },
  {
    path: '/map',
    component: Layout,
    redirect: '/map/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/map/index'),
        name: 'about',
        meta: { title: 'Map', icon: 'user', noCache: true },
      },
    ],
  },
  {
    path: '/price',
    component: Layout,
    redirect: '/price/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/price/index'),
        name: 'price',
        meta: { title: 'Price', icon: 'user', noCache: true },
      },
    ],
  },
  {
    path: '/document',
    component: Layout,
    redirect: '/document/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/document/index'),
        name: 'about',
        meta: { title: 'Document', icon: 'user', noCache: true },
      },
    ],
  },
];

export const asyncRoutes = [
  permissionRoutes,
  adminRoutes,
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' },
      },
    ],
  },
  errorRoutes,
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.MIX_LARAVUE_PATH,
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
