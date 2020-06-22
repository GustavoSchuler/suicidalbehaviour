<template>
 <form action="#" @submit.prevent="onSubmit">

    <div class="ui labeled input fluid">
      <div class="ui label">Name</div>
      <input type="text" v-model="group.name" required :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">URL</div>
      <input type="text" v-model="group.url" required :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Created date</div>
      <input type="text" v-model="group.createdDate" required :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Privacy</div>
      <select class="ui dropdown fluid" v-model="group.privacy" required :disabled="readOnly">
        <option disabled value=""></option>
        <option value="public">Público</option>
        <option value="private">Privado</option>
      </select>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Visibility</div>
      <select class="ui dropdown fluid" v-model="group.visibility" required :disabled="readOnly">
        <option disabled value=""></option>
        <option value="visible">Visível</option>
        <option value="hidden">Ocultado</option>
      </select>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Join date</div>
      <input type="text" v-model="group.joinDate"  :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Members</div>
      <input type="text" v-model="group.members" required :disabled="readOnly"/>
    </div>

    <button v-if="!readOnly" class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'group-form',

  props: {
    group: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: '',
          url: '',
        }
      },
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      errorsPresent: false,
    }
  },

  methods: {
    onSubmit() {
      this.$emit('createOrUpdate', this.group);
    },
  },
}
</script>

<style scoped>
.error {
  color: red;
}
</style>