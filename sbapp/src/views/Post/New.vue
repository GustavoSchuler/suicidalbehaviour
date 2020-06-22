<template>
  <div>
    <h1>New post</h1>
    <post-form @createOrUpdate="createOrUpdate" :groups=this.groups />
  </div>
</template>

<script>
import postForm from '../../components/PostForm.vue';
import { api } from '../../helpers/helpers';

export default {
  name: 'new-post',

  components: {
    'post-form': postForm,
  },

  data: function() {
    return {
      groups: [],
    };
  },

  methods: {
    createOrUpdate: async function(post) {
      await api.createpost(post);
      this.flash('post created', 'success');
      this.$router.push('/posts');
    }
  },

  async mounted() {
    this.groups = await api.getgroups();
  },

};
</script>