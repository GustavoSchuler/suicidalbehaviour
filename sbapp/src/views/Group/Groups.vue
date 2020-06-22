<template>
  <div>
    <h1>Groups</h1>
    <table id="groups" class="ui celled compact table">
      <thead>
        <tr>
          <th>Group</th>
          <th><i class="lock open icon"></i></th>
          <th> <i class="edit icon"></i></th>
          <th> <i class="trash icon"></i></th>
        </tr>
      </thead>
      <tr v-for="(group, i) in groups" :key="i">
        <td>{{ group.name }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show-group', params: { id: group._id }}">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit-group', params: { id: group._id }}">Edit</router-link>
        </td>
        <td width="75" class="center aligned" @click.prevent="onDestroy(group._id)">
          <a :href="`/groups/${group._id}`">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from '../../helpers/helpers';
export default {
  name: 'groups',
  data() {
    return {
      groups: []
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deletegroup(id);
      this.flash('group deleted sucessfully!', 'success');
      const newgroups = this.groups.filter(group => group._id !== id);
      this.groups = newgroups;
    }
  },
  async mounted() {
    this.groups = await api.getgroups();
  }
};
</script>