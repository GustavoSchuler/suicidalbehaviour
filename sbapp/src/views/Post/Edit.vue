<template>
  <div>
    <h1>Edit post</h1>
    <post-form @createOrUpdate="createOrUpdate" :groups="groups" :post=this.post />
  </div>
</template>

<script>
import postForm from '../../components/PostForm.vue';
import { api } from '../../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'post-form': postForm
  },
  data: function() {
    return {
      groups: [],
      post: {},
    };
  },
  methods: {
    createOrUpdate: async function(post) {
      await api.updatepost(post);
      this.flash('post updated sucessfully!', 'success');
      this.$router.push('/posts');
    }
  },
  async mounted() {
    this.groups = await api.getgroups();
    this.post = await api.getpost(this.$route.params.id);
  }
};
</script>