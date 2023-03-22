<template>
  <div style="margin-right: auto; margin-left: auto;">
      <div style="width: 720px; max-width: 90vw; display: flex; gap: 1rem; flex-wrap: wrap;">
        <v-text-field color="white" v-model="filters.title" label="Search"></v-text-field>
        <v-select color="white" class="filter-select" v-model="filters.username" clearable label="Filter by user" :items="usernames"></v-select>
      </div>
    <ul v-if="list(filters.username, filters.title).length !== 0" style="width: 720px; padding: 0; max-width: 90vw;">
      <li style="list-style-type: none;" v-for="task, i in list(filters.username, filters.title)" :key="i">
        <v-card color="#191919" style="width: 100%; max-width: 90vw; margin-top: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; padding: 0.25rem;">
          <div>
            <v-card-title style="color: white;">{{ task.title }}</v-card-title>
            <v-card-subtitle style="color: white;">{{ task.user }}</v-card-subtitle>
          </div>
        </v-card>
      </li>
    </ul>
    <h3 style="text-align: center; color: white;" v-else-if="list(null, '').length === 0">There are no archived tasks</h3>
    <h3 style="text-align: center; color: white;" v-else-if="list(filters.username, filters.title).length === 0">There are no archived tasks matching to your search</h3>

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
    list(username, title) {
      var nameFiltered = [], t = []
      if(username !== null) {
        for(let i = 0; i < this.archive.length; i++) {
          if(this.archive[i].user === username) nameFiltered.push(this.archive[i])
        }
      }
      else nameFiltered = this.archive
      if(title !== '') {
        for(let i = 0; i < nameFiltered.length; i++) {
          if(nameFiltered[i].title.toLowerCase().includes(title.toLowerCase()) || nameFiltered[i].user.toLowerCase().includes(title.toLowerCase())) t.push(nameFiltered[i])
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
