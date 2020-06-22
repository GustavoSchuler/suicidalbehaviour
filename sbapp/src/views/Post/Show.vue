<template>
  <div>
    <h1>Show post</h1>
    <post-form :readOnly="true" :groups="groups" :post="post" />
    <div class="actions">
      <router-link :to="{ name: 'edit-post', params: { id: this.$route.params.id }}">
        Edit post
      </router-link>
    </div>
  </div>
</template>

<script>
import postForm from '../../components/PostForm.vue';
import { api } from '../../helpers/helpers';

export default {
  name: 'show',
  components: {
    'post-form': postForm,
  },
  data() {
    return {
      groups: [],
      post: {},
    };
  },
  async mounted() {
    this.groups = await api.getgroups();
    this.post = await api.getpost(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>