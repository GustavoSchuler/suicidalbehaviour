import Vue from 'vue';
import Router from 'vue-router';
import { Groups, NewGroup, ShowGroup, EditGroup } from './views/Group'
import { Posts, NewPost, ShowPost, EditPost } from './views/Post'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/groups'
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups
    },
    {
      path: '/groups/new',
      name: 'new-group',
      component: NewGroup
    },
    {
      path: '/groups/:id',
      name: 'show-group',
      component: ShowGroup
    },
    {
      path: '/groups/:id/edit',
      name: 'edit-group',
      component: EditGroup
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'new-post',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'show-post',
      component: ShowPost
    },
    {
      path: '/posts/:id/edit',
      name: 'edit-post',
      component: EditPost
    }
   
  ]
});