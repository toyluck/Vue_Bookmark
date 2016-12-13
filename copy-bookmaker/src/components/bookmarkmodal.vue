<template>
  <div class="modelmask" @click.self='closeModal'>
    <div class="model-wrapper">
      <div id="cat-modal" class="ui small ">
        <i class="close icon" @click.stop='closeModal'> </i>
        <div class="header">
          <h2>Add a new bookmark</h2>
        </div>
        <div class="content">
          <form class="ui form">
            <div class="field">
              <label class="field" for="bookTitle">Bookmark Title</label>
              <input v-model='bookTitle' type="text" id='bookTitle'
                     placeholder="Enter a title for your bookmark...">
            </div>

            <div class="field">
              <label class="field" for="bookUrl">Bookmark URL</label>
              <input v-model='bookUrl' type="text" id='bookUrl'
                     placeholder="Enter a bookUrl for your bookmark...">
            </div>

            <div class="field">
              <label class="field" for="selectedCategory">Bookmark category </label>
              <select v-model='selectedCategory' id="selectedCategory"
                      class="ui simple dropdown">
                <option value="">Select a category</option>
                <option v-for='category in categories' :value='category'
                >
                  {{category.name}}
                </option>
              </select>
            </div><!-- select fileds-->
          </form>
        </div><!-- content -->
        <div class="actions">
          <div @click="addBookmark" class="ui purple inverted button  right">Save</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import store from '../store'
  export default{
    created(){

    },
    props: {
      categories: {
        type:Array
      }
    },
    data: function () {
      return {
        bookTitle: '',
        bookUrl: '',
        selectedCategory: {}
      }
    },
    methods: {
      addBookmark: function () {
        const bmm = this
          , bookmark = {}
        bookmark.bookTitle = bmm.bookTitle
        bookmark.bookUrl = bmm.bookUrl
        bookmark.category = bmm.selectedCategory
        store.addBookmark(bookmark)
        this.closeModal()
      }, closeModal(){
        this.$emit('closebookmarkmodal')
      }
    }
  }

</script>
<style scoped>
  .modelmask{
  z-index: 1001;
  position:fixed;
  display:table;
  top:0;
  width:100%;
  height:100vh;
  background-color:rgba(0,0,0,0.5);
  }
  .model-wrapper{
  vertical-align:middle;
  }
.content{
    display: block;
    width: 100%;
    font-size: 1em;
    line-height: 1.4;
    padding: 1.5rem;
    background: #fff;}
#cat-modal{
    position: fixed;
    top: 20%;
    left: 50%;
    width:500px;
    text-align: left;
    background: #fff;
    border: none;
    box-shadow: 1px 3px 3px 0 rgba(0,0,0,.2),1px 3px 15px 2px rgba(0,0,0,.2);
    -webkit-transform-origin: 50% 25%;
    -ms-transform-origin: 50% 25%;
    transform-origin: 50% 25%;
    border-radius: .28571429rem;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    will-change: top,left,margin,transform,opacity;
}


.ui>.close {
    cursor: pointer;
    position: absolute;
    top: -2.5rem;
    right: -2.5rem;
    z-index: 1;
    opacity: .8;
    font-size: 1.25em;
    color: #fff;
    width: 2.25rem;
    height: 2.25rem;
    padding: .625rem 0 0;
}
.actions{
    background: #f9fafb;
    padding: 1rem;
    border-top: 1px solid rgba(34,36,38,.15);
    text-align: right;}
.header{
    padding:1.2em 1.4em;
    font-weight:700;
    border-bottom:1px solid rgba(34,36,38,.15)
}









</style>
