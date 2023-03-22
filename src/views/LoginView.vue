<template>
  <div style="margin-right: auto; margin-left: auto;">
    <div style="display: flex; align-items: center; gap: 1rem; justify-content: center;">
      <v-text-field style="color: white;" autofocus :rules="rules" label="Username" @change="$event => {if(username.replace(' ', '') !== '') emptyError=false}" v-model="username" id="login-input"></v-text-field>
      <v-btn color="secondary" @click="$event => {if(username.replace(' ', '') === '' || !usernames.includes(username)) emptyError=true;  else login(); $emit('destroy')}">Login</v-btn>
    </div>
    <router-link to="/signup">Don't have an account? Singup</router-link>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  props: ['usernames','users'],
  data() {
    return {
      rules: [
        value => !!value || 'Required',
        value => this.usernames.includes(value) || 'This account does not exist',
      ],
      username: '',
      emptyError: false,
    }
  },
  components: {},
  methods:{
    login() {
      this.$emit('login', this.username)
    }
  },
  created() {this.$emit('logout')}
}
</script>
