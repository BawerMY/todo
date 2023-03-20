<template>
  <v-app style="background-color: #212121;">
    <nav class="nav">
      <div class="nav-components">
        <div class="space-fixer"><h1>{{ loggedUser.username }}</h1></div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <router-link v-if="loggedUser!==''" to="/"><v-btn color="secondary" size="large">Home</v-btn></router-link>
          <router-link to="/archive"><v-btn color="secondary" size="large">Archive</v-btn></router-link>
          <router-link to="/albo"><v-btn color="secondary" size="large">Albo</v-btn></router-link>
        </div>
        <div class="space-fixer">
          <router-link v-if="loggedUser!==''" to="/login"><v-btn color="secondary" size="large">Logout</v-btn></router-link>
          <router-link v-if="loggedUser==='' && (['archive', 'albo', 'home'].includes($route.name))" to="/login"><v-btn color="secondary" size="large">Login</v-btn></router-link>
        </div>
      </div>
      <v-divider style="margin-top: 1rem;"></v-divider>
    </nav>
    <div class="nav-divider"></div>
    <KeepAlive v-if="loggedUser!==''">
      <router-view
        :archive="archive"
        :users="users"
        :usernames="getUsernames()"
        :user="loggedUser"
        @set-tasks="loggedUser.tasks = $event"
        @logout="loggedUser=''"
        @add="loggedUser.tasks.push($event)"
        @delete="loggedUser.tasks.splice($event, 1);"
        @archive="archiveFunc()" @login="$event => login($event)"
        @singup="$event => {users.push($event); loggedUser=$event; this.$router.push('/').catch(()=>{})}" />
    </KeepAlive>
    <router-view
      v-else
      :archive="archive"
      :users="users"
      :usernames="getUsernames()"
      :user="loggedUser"
      @set-tasks="loggedUser.tasks = $event"
      @logout="loggedUser=''"
      @add="loggedUser.tasks.push($event)"
      @delete="loggedUser.tasks.splice($event, 1);"
      @archive="archiveFunc()" @login="$event => login($event)"
      @singup="$event => {users.push($event); loggedUser=$event; this.$router.push('/').catch(()=>{})}" />
  </v-app>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
      loggedUser: '',
      users: [
        {
          username: "s",
          tasks: [
            {
              title: 'Do the homeworks1',
              completed: false,
            },
            {
              title: 'Do the homeworks2',
              completed: true,
            },
            {
              title: 'Do the ss3',
              completed: true,
            },
            {
              title: 'Do the homeworks4',
              completed: false,
            },
          ]
        }
      ],
      archive: [],
    }
  },
  created(){
    if(this.loggedUser==='') this.$router.push('/login').catch(()=>{})
  },
  //maybe usernames in other functions
  methods: {
    login(e) {
      for(var i = 0; i < this.users.length; i++) {
        if(this.users[i].username === e) this.loggedUser = this.users[i]; break;
      }
      this.$router.push('/')
    },
    getUsernames(){
      var u = []
      this.users.forEach(user => {
        u.push(user.username)
      });
      return u
    },
    archiveFunc() {
      var falses = []
      this.loggedUser.tasks.forEach(task => {
        if(task.completed) {
          this.archive.push({
            user: this.loggedUser.username,
            title: task.title,
          })
        }
        else{
          falses.push(task)
        }
      });
      this.loggedUser.tasks = falses
    },
  }
};
</script>
<style>
  .nav {
    padding-right: 1rem;
    padding-left: 1rem;
    top: 0;
    left: 0;
    width: 100vw;
    padding-top: 1rem;
    gap: 1rem;
    background-color: #212121;
    z-index: 1;
  }
  .nav-components {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    display: flex;
  }
  @media (min-width:640px) {
    .nav {
      position: fixed;
      flex-wrap: wrap;
    }
    .nav-components {justify-content: space-between;}
    .nav-divider {margin-top: 68px;}
    .space-fixer {width: 111px;}
  }
  @media (min-width: 487px) {
    .nav {justify-content: space-between;}
  }
  </style>
