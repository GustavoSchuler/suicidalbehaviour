<template>
  <div>
    <h1>Show group</h1>
    <group-form :readOnly="true" :group="group" />
    <div class="actions">
      <router-link :to="{ name: 'edit-group', params: { id: this.$route.params.id }}">
        Edit group
      </router-link>
    </div>
  </div>
</template>

<script>
import groupForm from '../../components/GroupForm.vue';
import { api } from '../../helpers/helpers';

export default {
  name: 'show',
  components: {
    'group-form': groupForm,
  },
  data() {
    return {
      group: ''
    };
  },
  async mounted() {
    this.group = await api.getgroup(this.$route.params.id);
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