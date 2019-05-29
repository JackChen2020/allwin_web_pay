import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [

  {
    path: '*',
    component: () => import('./view/404'),
    name: '',
    hidden: true
  },
  {
    path: '/wechat/:id',
    name: 'wechat',
    component: () => import('./view/wechat/index'),
    meta: {
      title: '在线支付'
    }
  },
  {
    path: '/alipay/:id',
    name: 'alipay',
    component: () => import('./view/alipay/index'),
    meta: {
      title: '在线支付'
    }
  },
  {
    path: '/juli/',
    name: 'juli',
    component: () => import('./view/juli/index'),
    meta: {
      title: '在线支付'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
