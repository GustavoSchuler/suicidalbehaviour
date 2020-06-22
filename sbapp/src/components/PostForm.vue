<template>
 <form @submit.prevent="onSubmit">

    <div class="ui labeled input fluid">
      <div class="ui label">Group</div>
      <select class="ui dropdown fluid" v-model="post.groupId" required :disabled="readOnly">
        <option v-for="(group, index) in groups" :key="index" :value="group._id" :selected="groupSelected(group._id)">
          {{ group.name }}
        </option>
      </select>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Description</div>
     <textarea rows="6" v-model="post.description" :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Created date</div>
      <v-date-picker v-model="createdDate" :masks="{ input: ['YYYY-MM-DD'] }" :max-date="new Date()" required :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Printed date</div>
      <v-date-picker v-model="printedDate" :masks="{ input: ['YYYY-MM-DD'] }" :max-date="new Date()" required :disabled="readOnly"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Comments</div>
      <input type="number" v-model="post.comments" :disabled="readOnly"/>
    </div>

    <div v-if="!post.image" class="ui labeled input fluid">
      <div class="ui label">Image</div>
      <input type="file" @change="uploadFile">
    </div>
    <div v-else>
      <img class="post-thumb" :src="getImage(post.image)" />
    </div>

    <button v-if="!readOnly" class="positive ui button">Submit</button>
  </form>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  name: 'post-form',

  components: {
    'v-date-picker': DatePicker,
  },

  props: {
    groups: {
      type: Array,
      default: () => [],
    },
    post: {
      type: Object,
      required: false,
      default: () => {
        return {
          groupId: '',
          description: '',
          createdDate: '',
          printedDate: new Date(),
          comments: '',
          image: '',
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
      files: null,
      errorsPresent: false,
    }
  },

  computed: {
    createdDate: {
      get() {
        return new Date(this.post.createdDate)
      },
      set(value) {
        this.post.createdDate = value
      }
    },

    printedDate: {
      get() {
        return new Date(this.post.printedDate)
      },
      set(value) {
        this.post.printedDate = value
      }
    },
  },

  methods: {
    onSubmit() {
      const formData = new FormData();
      
      if (this.files) {
        for (const i of Object.keys(this.files)) {
          formData.append('files', this.files[i])
        }
      }

      Object.entries(this.post).forEach(([key, value]) => {
        formData.append(key, value)
      });
      
      this.$emit('createOrUpdate', formData);
    },

    groupSelected(groupId) {
      return this.post ? false : this.post.groupId == groupId
    },

    uploadFile (event) {
      this.files = event.target.files
    },

    getImage(path) {
      return require(`../../uploads/${path}`)
    },
  },
}
</script>

<style scoped>
.error {
  color: red;
};
</style>

<style>
.post-thumb {
  max-width: 100%;
};
</style>