<template>
    <div style="margin-right: auto; margin-left: auto;">
      <div style="display: flex; align-items: center; gap: 1rem; justify-content: center;">
        <v-text-field style="color: white;" autofocus :rules="rules" label="Username" @change="$event => usernameAlreadyTaken=this.usernames.includes(username)" v-model="username" id="login-input" type="text"></v-text-field>
        <v-btn color="secondary" @click="$event => {if(username.replace(' ', '') !== '' && username.length > 2) singup(); $emit('destroy')}">Singup</v-btn>
      </div>
      <router-link to="/login">Have an account? Login</router-link>       
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'SignUpView',
    props: ['usernames','users'],
    data() {
      return {
        rules: [
          value => !this.usernames.includes(value) || 'This username is already taken',
          value => (value && value.length >= 3) || 'Min 3 characters',
          value => !!value || 'Required',
        ],
        usernameAlreadyTaken: false,
        username: '',
      }
    },
    components: {},
    methods:{
      singup() {
        if(!this.usernameAlreadyTaken) this.$emit('singup',
          {
            username: this.username,
            tasks: []
          }
        )
      },
    }
  }
  </script>
  