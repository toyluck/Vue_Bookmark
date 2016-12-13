<template>
  <div id="app">
    <Sidebar :rawcategories='categories'
             v-on:selected_category='selectedCategory'>

    </Sidebar>
    <Bookmarks :bookmarks='filteredBookmarks'>

    </Bookmarks>
  </div>
</template>

<script type='text/babel'>
  import store, {eventBusVue} from './store'
  import Sidebar from './components/Sidebar.vue'
  import Bookmarks from "./components/Bookmarks.vue"
  export default {
    name: 'app',
    created(){
      store.fetchAll()
      eventBusVue.$on('SYNC_SUCCESS', this.sync)
      eventBusVue.$on('ADD_CATEGORY_SUCCESS', this.addCategory)
      eventBusVue.$on('DEL_CATEGORY_SUCCESS', this.removeCategory)
      eventBusVue.$on('ADD_BOOKMARK_SUCCESS', this.addBookmark)
      eventBusVue.$on('DEL_BOOKMARK_SUCCESS', this.removeBookmark)
    },
    components: {
      Sidebar, Bookmarks
    },
    data: function () {
      return {
        categories: [{
          name: '123',
          color: 'red'
        }],
        bookmarks: [{
          bookTitle: 'title',
          bookUrl: 'url------',
          category: 'blue'
        }]
        , selectedCategoryId: ''

      }
    },
    computed: {
      filteredBookmarks: function () {
        return this.bookmarks.concat().filter(bm=>
          this.selectedCategoryId === '' || bm.category.id === this.selectedCategoryId
        )
      }
    },
    methods: {
      sync: function (categories, bookmarks) {
        this.categories = categories
        this.bookmarks = bookmarks
      },
      addCategory: function (newCategory) {
        this.categories.push(newCategory)
      },
      removeCategory: function (deledCategory) {
        this.categories = this.categories.filter(cat => cat !== deledCategory)
      },
      addBookmark: function (newCategory) {
        this.bookmarks.push(newCategory)
      },
      removeBookmark: function (deledBookmark) {
        this.bookmarks = this.bookmarks.filter(bk => bk !== deledBookmark)
      },
      selectedCategory: function (id) {
        this.selectedCategoryId = id;
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
