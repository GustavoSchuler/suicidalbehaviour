import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  getgroup: handleError(async id => {
    const res = await axios.get(baseURL + 'groups/' + id);
    return res.data;
  }),
  getgroups: handleError(async () => {
    const res = await axios.get(baseURL + 'groups/');
    return res.data;
  }),
  deletegroup: handleError(async id => {
    const res = await axios.delete(baseURL + 'groups/' + id);
    return res.data;
  }),
  creategroup: handleError(async payload => {
    const res = await axios.post(baseURL + 'groups/', payload);
    return res.data;
  }),
  updategroup: handleError(async payload => {
    const res = await axios.put(baseURL + 'groups/' + payload._id, payload);
    return res.data;
  }),
  getpost: handleError(async id => {
    const res = await axios.get(baseURL + 'posts/' + id);
    return res.data;
  }),
  getposts: handleError(async (page) => {
    const res = await axios.get(baseURL + 'posts?page=' + page);
    return res.data;
  }),
  deletepost: handleError(async id => {
    const res = await axios.delete(baseURL + 'posts/' + id);
    return res.data;
  }),
  createpost: handleError(async payload => {
    const res = await axios.post(
      baseURL + 'posts/',
      payload,
      { 
        headers: 
        {
          "Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
        }
      });
    return res.data;
  }),
  updatepost: handleError(async payload => {
    let updatedPost = {};
    payload.forEach((value, key) => {updatedPost[key] = value});

    const res = await axios.put(
      baseURL + 'posts/' + updatedPost._id,
      payload,
      { 
        headers: 
        {
          "Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
        }
      });
    return res.data;
  })
};