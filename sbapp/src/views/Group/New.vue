<template>
  <div>
    <h1>New group</h1>
    <group-form @createOrUpdate="createOrUpdate" />
  </div>
</template>

<script>
import groupForm from '../../components/GroupForm.vue';
import { api } from '../../helpers/helpers';
export default {
  name: 'new-group',
  components: {
    'group-form': groupForm
  },
  methods: {
    createOrUpdate: async function(group) {
      await api.creategroup(group);
      this.flash('group created', 'success');
      // this.$router.push(`/groups/${res._id}`);
    }
  }
};
</script>