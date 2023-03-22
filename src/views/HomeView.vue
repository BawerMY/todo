<template>
    <div style="margin-right: auto; margin-left: auto; max-width: 90vw; margin-top: 2rem; color: white;">
      <h1 v-if="uncompleteds().length!==0" style="color: white;">Tasks to do</h1>
      <h3 v-else><i>Nothing to do</i></h3>
      <ul style="width: 720px; max-width: 90vw; padding: 0;">
        <li style="list-style-type: none;" v-for="task, i in uncompleteds()" :key="i">
          <v-card color="#191919" style="width: 100%; flex-wrap: wrap; margin-top: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border: 1px, solid black;">
            <button><img alt="" src="../assets/check_box_outline.svg" style="width: 36px; height: 36px; color: white;" @click="task.completed = !task.completed; reorder()"/></button>
            <v-text-field v-if="editing===i" v-model="newTitle" style="width: calc(720px-81px); color: white;" label="Change Title"></v-text-field>
            <h3 v-else style="padding-left: 0.5rem; color: white;">{{ task.title }}</h3>
            <div style="margin-left: auto;">
              <v-btn style="margin-right: 1rem;" v-if="editing===i" @click="$event => {editing = -1; task.title=newTitle;}" color="secondary">Done</v-btn>
              <v-btn style="margin-right: 1rem;" v-else @click="$event => {newTitle = task.title; editing = i; exitingTitle=task.title;}" color="secondary">Edit</v-btn>
              <v-btn v-if="editing===i" @click="$event => {editing = -1; task.title=exitingTitle;}" color="secondary">Cancel</v-btn>
              <v-btn class="delbtn" v-else @click="$event => deleting=i" color="secondary">Delete</v-btn>
            </div>
          </v-card>
        </li>
      </ul>
      <div v-if="completeds().length!== 0" style="display: flex; gap: 1rem; align-items: center;">
        <h1 color: white;>Completed tasks</h1>
        <v-btn @click="$emit('archive')" color="secondary">Archive</v-btn>
      </div>
      <ul style="width: 720px; max-width: 90vw; padding: 0;">
        <li style="list-style-type: none;" v-for="task, i in completeds()" :key="i+uncompletedsNr">
          <v-card  color="#191919" style="width: 100%; flex-wrap: wrap; margin-top: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border: 1px, solid black;">
            <button><img alt="" src="../assets/check_box.svg" style="width: 36px; height: 36px; color: white;" @click="task.completed = !task.completed; reorder()"/></button>
            <v-text-field v-if="editing===i+uncompletedsNr" v-model="newTitle" style="width: calc(720px-81px); color: white;" label="Change Title"></v-text-field>
            <h3 v-else style="padding-left: 0.5rem; color: white;">{{ task.title }}</h3>
            <div style="margin-left: auto;">
              <v-btn style="margin-right: 1rem;" v-if="editing===i+uncompletedsNr" @click="$event => {editing = -1; task.title=newTitle;}" color="secondary">Done</v-btn>
              <v-btn style="margin-right: 1rem;" v-else @click="$event => {newTitle = task.title; editing = i+uncompletedsNr; exitingTitle=task.title;}" color="secondary">Edit</v-btn>
              <v-btn v-if="editing===i+uncompletedsNr" @click="$event => {editing = -1; task.title=exitingTitle;}" color="secondary">Cancel</v-btn>
              <v-btn class="delbtn" v-else @click="$event => deleting=i+uncompletedsNr" color="secondary">Delete</v-btn>
            </div>
          </v-card>
        </li>
      </ul>
      <div class="add">
        <v-text-field style="width: 100%; color: white;" v-model="newTask" label="Add New Task"></v-text-field>
        <v-btn color="secondary" @click="$event => addTask()">Add</v-btn>
      </div>
      <div v-if="deleting !== -1" style="position: fixed; background-color: #0000005A; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;">
        <v-card style="padding: 2rem; color: white; width: 720px; max-width: 90vw;">
        <h3 style="color: white;">Are you sure to delete this task:</h3>
        <h2 style="color: white;">{{ user.tasks[deleting].title }}</h2>
        <div style="display: flex; gap:1rem; justify-content: end;">
          <v-btn @click="$event => deleting = -1" color="secondary">Cancel</v-btn>
          <v-btn @click="$emit('delete', deleting); deleting=-1" color="error">Delete</v-btn>
        </div>
      </v-card>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  props: ['user'],
  data() {
    return {
      uncompletedsNr: null,
      newTask:'',
      editing:-1,
      newTitle:'',
      exitingTitle:'',
      deleting:-1,
    }
  },
  components: {},
  created() {this.reorder()},
  methods:{
    addTask() {
      if(this.newTask.replace(' ', '') !== ''){
        this.$emit('add',{title:this.newTask, completed: false})
        this.newTask=''
      }
    },
    reorder() {
      var t = []
      const u = this.uncompleteds()
      const c = this.completeds()
      for(let i = 0; i < u.length; i++) {
        t.push(u[i])
      }
      for(let i = 0; i < c.length; i++) {
        t.push(c[i])
      }
      this.$emit('set-tasks', t)
    },
    completeds() {
      var c = []
      for(var i = 0; i < this.user.tasks.length; i++) {
        if(this.user.tasks[i].completed) {
          c.push(this.user.tasks[i])
        }
      }
      return c
    },
    uncompleteds() {
      var uncs = 0
      var c = []
      for(var i = 0; i < this.user.tasks.length; i++) {
        if(!this.user.tasks[i].completed){
          uncs++
          c.push(this.user.tasks[i])
        }
      }
      this.uncompletedsNr = uncs
      return c
    },
  },
}
</script>
<style>
  .add {
    display: flex;
    background-color: #212121;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    background-color: #171717;
    border-radius: 4px;
    position: fixed;
    width: 704px;
    max-width: 90vw;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    gap: 1rem;
  }
</style>