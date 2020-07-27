<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/groups" exact class="item">
           <i class="group icon"></i> Groups
          </router-link>
          <router-link to="/groups/new" class="item">
            <i class="plus circle icon"></i> New Group
          </router-link>
          <router-link to="/posts" exact class="item">
           <i class="book icon"></i> Posts
          </router-link>
          <router-link to="/posts/new" class="item">
            <i class="plus circle icon"></i> New Post
          </router-link>
        </div>
      </div>
    </div>

    <div class="ui container">
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
textarea {
  margin: 0em;
  max-width: 100%;
  flex: 1 0 auto;
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: left;
  line-height: 1.21428571em;
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  padding: 0.67857143em 1em;
  background: #FFFFFF;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  box-shadow: none;
};
</style>