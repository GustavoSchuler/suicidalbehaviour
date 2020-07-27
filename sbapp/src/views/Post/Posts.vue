<template>
  <div>
    <h1>Posts</h1>
    <table id="posts" class="ui celled table">
      <thead>
        <tr>
          <th>Group</th>
          <th>Post</th>
          <th>Created date</th>
          <th><i class="eye icon"></i></th>
          <th> <i class="edit icon"></i></th>
          <th> <i class="trash icon"></i></th>
        </tr>
      </thead>
      <tr v-for="(post, i) in postList" :key="i">
        <td class="single line">{{ getGroupName(post.groupId) }}</td>
        <td>{{ post.description }}</td>
        <td class="single line">{{ dateFormat(post.createdDate) }}</td>
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
    <div class="ui two column centered grid mt-15">
      <pagination :total="posts.total" :page-size="posts.pageSize" :callback="pageChanged"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from 'vuejs-pagination-semantic-ui'
import moment from 'moment'
import { api } from '../../helpers/helpers';

export default {
  name: 'posts',
  
  components: { pagination },
  
  data() {
    return {
      groups: [],
      posts: {
        total: 0,
        pageSize: 0,
      },   
    };
  },

  computed: {
    postList() {
      if (this.posts.length === 0) return []

      return this.posts.content
    },
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
    },

    async pageChanged (page) {            
      this.posts = await api.getposts(page);
    },
  },
  async mounted() {
    this.groups = await api.getgroups();
    this.posts = await api.getposts(1);
  }
};
</script>

<style scoped>
  .mt-15 {
    margin-top: 15px;
  }
</style>