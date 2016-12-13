<template>
  <div @click="openLink" class="item">
    <div class="content">
      <i class="icon remove right-float" @click="removeBookmark"> </i>
      <h2>
        <a class="header">{{bookmark.bookTitle}}</a>
      </h2>

      <div>
        <span class="subtitle">{{bookmark.bookUrl}}</span>
      </div>

      <a :class='"ui tiny label right-float "
       + bookmark.category.color'>
        {{bookmark.category.name}}</a>
    </div>

  </div>
</template>
<style>
</style>
<script type="text/babel">

  import store from '../store'

  export default{
    props: {
      bookmark:{
        type:Object
      }
    },
    data(){
      return {

      }
    }
    ,methods:{
      openLink(){

      },
      removeBookmark(){
        store.removeBookmark(this.bookmark)
      }
    }
  }


</script>
