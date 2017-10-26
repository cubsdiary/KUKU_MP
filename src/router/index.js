import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const welCome = (resolve) => {
  import('components/welcome').then((module) => {
    resolve(module);
  });
};
const monitorDesk = (resolve) => {
  import('components/desk/desk').then((module) => {
    resolve(module);
  });
};
const addFans = (resolve) => {
  import('components/addfans/addfans').then((module) => {
    resolve(module);
  });
};

const anchorList = (resolve) => {
  import('components/anchorlist/anchorlist').then((module) => {
    resolve(module);
  });
};
const liveList = (resolve) => {
  import('components/livelist/livelist').then((module) => {
    resolve(module);
  });
};
const liveInfo = (resolve) => {
  import('components/liveinfo/liveinfo').then((module) => {
    resolve(module);
  });
};
const stopList = (resolve) => {
  import('components/stoplist/stoplist').then((module) => {
    resolve(module);
  });
};

export default new Router({
  routes: [{
    path: '/',
    redirect: '/welcome'
  }, {
    name: 'welcome',
    path: '/welcome',
    component: welCome
  }, {
    name: 'monitordesk',
    path: '/monitordesk',
    component: monitorDesk,
    beforeRouteLeave (to, from, next) {
      clearInterval(this.timer);
    }
  }, {
    name: 'livelist',
    path: '/livelist',
    component: liveList
  }, {
    name: 'liveinfo',
    path: '/liveinfo',
    component: liveInfo
  }, {
    name: 'stoplist',
    path: '/stoplist',
    component: stopList
  }, {
    name: 'anchorlist',
    path: '/anchorlist',
    component: anchorList
  }, {
    name: 'addfans',
    path: '/addfans',
    component: addFans
  }]
});
