<template>
  <div>
    <h1>Edit group</h1>
    <group-form @createOrUpdate="createOrUpdate" :group=this.group />
  </div>
</template>

<script>
import groupForm from '../../components/GroupForm.vue';
import { api } from '../../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'group-form': groupForm
  },
  data: function() {
    return {
      group: {}
    };
  },
  methods: {
    createOrUpdate: async function(group) {
      await api.updategroup(group);
      this.flash('group updated sucessfully!', 'success');
      this.$router.push(`/groups/${group._id}`);
    }
  },
  async mounted() {
    this.group = await api.getgroup(this.$route.params.id);
  }
};
</script>