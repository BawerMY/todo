<template>
  <div style="margin-right: auto; margin-left: auto;">
    <h3 v-if="user.tasks.length !== 0">There are no archived tasks</h3>
    <h3 v-else-if="list(filters.username).length !== 0">There are no archived tasks matching to your search</h3>
    <ul style="width: 720px; padding: 0; max-width: 90vw;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <v-text-field v-model="filters.title" label="Search"></v-text-field>
        <v-select class="filter-select" v-model="filters.username" clearable label="Filter by user" :items="usernames"></v-select>
      </div>

      <li style="list-style-type: none;" v-for="task, i in list(filters.username)" :key="i">
        <v-card color="#191919" style="width: 100%; max-width: 90vw; margin-top: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; padding: 0.25rem;">
          <div>
            <v-card-title>{{ task.title }}</v-card-title>
            <v-card-subtitle>{{ task.user }}</v-card-subtitle>
          </div>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'ArchiveView',
  props: ['archive', 'usernames'],
  data() {
    return {
      filters: {
        username: null,
        title: '',
      },
    }
  },
  methods:{
    list(username) {
      var nameFiltered = [], t = []
      if(username !== null) {
        for(let i = 0; i < this.archive.length; i++) {
          if(this.archive[i].user === username) nameFiltered.push(this.archive[i])
        }
      }
      else nameFiltered = this.archive
      if(this.filters.title !== '') {
        for(let i = 0; i < nameFiltered.length; i++) {
          if(nameFiltered[i].title.toLowerCase().includes(this.filters.title.toLowerCase()) || nameFiltered[i].user.toLowerCase().includes(this.filters.title.toLowerCase())) t.push(nameFiltered[i])
        }
      }
      else t = nameFiltered
      return t
    }
  }
}
</script>
<style>
  @media (min-width: 489px) {
    .filter-select {
      width: 0;
    }
  }
</style>
