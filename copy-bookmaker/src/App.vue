<template>
  <div id="app">
    <Sidebar :rawcategories='categories'>

    </Sidebar>

  </div>
</template>

<script type='text/babel'>
  import store, { eventBusVue } from './store'
  import Hello from './components/Hello.vue'
  import Sidebar from './components/Sidebar.vue'

  export default {
    name: 'app',
    created(){
      store.fetchAll()
      eventBusVue.$on('SYNC_SUCCESS', this.sync)
      eventBusVue.$on('ADD_CATEGORY_SUCCESS', this.addCategory)
      eventBusVue.$on('DEL_CATEGORY_SUCCESS', this.removeCategory)
    },
    components: {
      Hello, Sidebar
    },
    data: function () {
      return {
        categories: [{
          name: '123',
          color: 'red'
        }]
      }
    },
    methods: {
      sync: function (results) {
        this.categories = results
      },
      addCategory: function (newCategory) {
        this.categories.push(newCategory)
      },
      removeCategory: function (deledCategory) {
        this.categories = this.categories.filter(cat => cat !== deledCategory)
      }
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
   display:flex;
}






















</style>
