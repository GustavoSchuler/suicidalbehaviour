<template>
  <div>
    <h1>Posts</h1>
    <table id="posts" class="ui celled compact table">
      <thead>
        <tr>
          <th>Group</th>
          <th>Post</th>
          <th>Created date</th>
          <th><i class="lock open icon"></i></th>
          <th> <i class="edit icon"></i></th>
          <th> <i class="trash icon"></i></th>
        </tr>
      </thead>
      <tr v-for="(post, i) in posts" :key="i">
        <td>{{ getGroupName(post.groupId) }}</td>
        <td>{{ post.description }}</td>
        <td>{{ dateFormat(post.createdDate) }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show-post', params: { id: post._id }}">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit-post', params: { id: post._id }}">Edit</router-link>
        </td>
        <td width="75" class="center aligned" @click.prevent="onDestroy(post._id)">
          <a :href="`/posts/${post._id}`">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import { api } from '../../helpers/helpers';

export default {
  name: 'posts',
  data() {
    return {
      groups: [],
      posts: [],
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deletepost(id);
      this.flash('post deleted sucessfully!', 'success');
      const newposts = this.posts.filter(post => post._id !== id);
      this.posts = newposts;
    },

    dateFormat(date) {
      return date ? moment(date).format('YYYY-MM-DD') : ''
    },

    getGroupName(id) {
      const index = this.groups.findIndex(x => x._id === id)
      
      return this.groups[index].name
    }
  },
  async mounted() {
    this.groups = await api.getgroups();
    this.posts = await api.getposts();
  }
};
</script>