import Vue from 'vue';
import Router from 'vue-router';
import store from '@/stores/modules/user';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'AboutPage',
      component: () => import('@/views/AboutPage.vue'),
      meta: { auth: false },
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('@/components/Main/Main.vue'),
      meta: { auth: true },
      redirect: '/vodpopular',
      children: [
        {
          path: 'vodpopular',
          name: 'VodPopular',
          component: () => import('@/components/Main/VodPopular.vue'),
          meta: { auth: true },
        },
        {
          path: 'vodrecent',
          name: "VodRecent",
          component: () => import('@/components/Main/VodRecent.vue'),
          meta: { auth: true },
        },
        {
          path: 'vodcomment',
          name: "VodComment",
          component: () => import('@/components/Main/VodComment.vue'),
          meta: { auth: true },
        },
      ]
    },
    {
      path: '/member/login',
      name: 'Login',
      component: () => import('@/views/user/Login.vue'),
      children: [
        {
          path: 'findid',
          name: 'FindId',
          component: () => import('@/components/FindId.vue'),
        },
        {
          path: 'findpw',
          name: "FindPw",
          component: () => import('@/components/FindPw.vue')
        },
      ]
    },
    {
      path: '/member/join',
      name: 'Signup',
      component: () => import('@/views/user/Signup.vue'),
    },
    {
      path: '/member/certification',
      name: "PhoneCertification",
      component: () => import('@/components/user/PhoneCertification.vue'),
    },
    {
      path: '/member/membership',
      name: "Membership",
      component: () => import('@/components/user/Membership.vue'),
    },
    {
      path: 'people',
      name:'People',
      component: () => import('@/components/People/PeopleList.vue'),
      meta: { auth: true },
    },
    {
      path: '/member/mypage',
      name: 'MyPage',
      component: () => import('@/views/user/MyPage.vue'),
      meta: { auth: true },
      children: [
        {
          path: 'usermanage',
          name: 'UserManage',
          component: () => import('@/components/admin/UserManagement/UserManagement.vue'),
          meta: { auth: true },
          children: [
            {
              path: 'alluser',
              name: 'AllUser',
              component: () => import('@/components/admin/UserManagement/AllUser.vue'),
              props: true,
              meta: { auth: true },
            },
            {
              path: 'blockeduser',
              name: 'BlockedUser',
              component: () => import('@/components/admin/UserManagement/BlockedUser.vue'),
              props: true,
              meta: { auth: true },
            },
            {
              path: 'adminUser',
              name: 'AdminUser',
              component: () => import('@/components/admin/UserManagement/AdminUser.vue'),
              props: true,
              meta: { auth: true },
            },
          ]
        },
        {
          path: 'vodmanage',
          name: "VodManage",
          component: () => import('@/components/admin/VodManagement.vue'),
          meta: { auth: true },
        },
      ]
    },
    {
      path: '/admin/vodInsert',
      name: 'VODInsert',
      component: () => import('@/components/admin/VodInsert.vue'),
      meta: { auth: true },
    },
    {
      path: '/voddetail/:id',
      name: 'VodDetail',
      component: () => import('@/views/vod/VodDetail.vue'),
      meta: { auth: true },
      props: true,
      redirect:'/voddetail/:id/bestcomments',
      children: [
        {
          path: 'bestcomments',
          name: 'BestComments',
          component: () => import('@/components/vod/BestComments.vue'),
          props: true,
          meta: { auth: true },
        },
        {
          path: 'allcomments',
          name: "AllComments",
          component: () => import('@/components/vod/AllComments.vue'),
          props: true,
          meta: { auth: true },
        },
      ]
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/vod/Category.vue'),
      meta: { auth: true },
    },
    {
      path: '/feed/:id',
      name: 'Feed',
      component: () => import('@/components/Feed/MyFeed.vue'),
      meta: { auth: true },
    },
    {
      path: '/google',
      name: 'GoogleLogin',
      component: () => import('@/components/user/snsLogin/GoogleLogin.vue'),
    },
    {
      path:'/myplaylist',
      name:'MyPlayList',
      component: () => import('@/components/MyPlayList/MyPlayList.vue'),
      meta: { auth: true },
    },
    {
      path:'/playlist/:id',
      name:'PlayListDetail',
      component: () => import('@/components/MyPlayList/PlayListDetail'),
      meta: { auth: true },
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage.vue'),
      redirect: '/main/vodpopular'
    },

  ],
});
// router????????????????????? beforeEach??? ??????????????? ????????? to,from,next??? ?????????
// to:??????????????? ????????? , from:??????????????? , next:????????????????????? ???????????? API
router.beforeEach((to, from, next) => {
  // ???????????????????????????(to).meta???.auth??? true ??????(&&:AND)
  // ???????????? store??? getters??? isLogin??? ???????????? ?????????????????? ????????? true/false??? ??????
  // auth:true??? ???????????? login????????? ???????????? ????????????(False,!) ????????????????????? ??????
  if (to.meta.auth && !store.state.isLogin) {
    // log?????????
    // next??? ??????????????? /login???????????? ??????
    next('/member/login');
    // return??? ??? ???????????????! ????????? ????????? ?????? next()??? ???????????? ?????????
    return;
  }
  next();
});

export default router;