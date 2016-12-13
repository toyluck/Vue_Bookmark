<template>
  <div id="links-container">
    <div id="toolbar">

      <div class="ui inverted icon fluid input">
        <input v-model='filterText' type="text" placeholder="Filter your links">
        <i class="icon search"> </i>
      </div>
    </div>
    <section class="ui relaxed divided selection list">
      <!-- bookmarkitem-->
      <bookmarkitem
        v-for="bookmark in filtedBookmarks "
        :bookmark="bookmark">

      </bookmarkitem>
    </section>
  </div>
</template>
<style type="text/babel">
   .bookmarks{
    background-color:white;
     }






</style>
<script type="text/babel">
  import Bookmarkitem from './Bookmarkitem.vue'

  import {filterByTitle} from '../filters/index'

  export default{
    props: {
      bookmarks: {
        type: Array
      },
      filterCategory: ''
    },
    data(){
      return {
        filterText: ''
      }
    },
    components: {
      'bookmarkitem': Bookmarkitem
    },
    filters: {
      filterByTitle
    },
    computed: {
      filtedBookmarks: function () {
        return filterByTitle(this.bookmarks, this.filterText)

      }
    }
  }
</script>
