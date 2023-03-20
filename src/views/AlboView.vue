<template>
  <div style="margin-right: auto; margin-left: auto;">
    <div v-if="info" style="color: white; margin-top: 5rem;">
      <h1>{{ info.title }}</h1>
      <div>Date: <b>{{ (info.day<10?"0"+info.day:info.day) }}/{{ (info.month<10?"0"+info.month:info.month) }}/{{ info.year }}</b></div>
      <div>Number: <b>{{ info.num }}</b></div>
      <div>Image Link: <a :href="info.img">{{ info.img }}</a></div>
    </div>
    <div @click="d()" style="text-align: center; position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%);">
      <v-btn style="margin-bottom: 1rem;" color="info" @click="page=''; d()">Last</v-btn>
      <v-pagination
        v-model="page"
        color="secondary"
        :length="length"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
  
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AlboApp',
    data() {
      return {
        page: 100,
        length: null,
        info: null,
      }
    },
    created() {this.d(); this.getLength()},
    methods: {
      d() {
        axios
          .get('/api/'+this.page+'/info.0.json')
          .then(response => {this.info = response.data;})
      },
      getLength() {
        axios
          .get('/api/info.0.json')
          .then(response => {this.length = response.data.num})
      }
    }
  }
// maybe for performance optimization v-if in route-viewer for events
</script>
