<template>
  <!--<transition name='cat-modal'>-->

  <div class="modelmask" @click.self='closeModal'>
    <div class="model-wrapper">
      <div id="cat-modal" class="ui small ">
        <i class="close icon"  @click.stop='closeModal'> </i>
        <div class="header">
          <h2>Add a new category</h2>
        </div>
        <div class="content">
          <form class="ui form">
            <div class="field">
              <label class="field" for="catName">Category name</label>
              <input v-model='catName' type="text" id='catName'
                     placeholder="Enter a catetory name...">
            </div>
            <div class="field">
              <label class="field" for="catColor">Category color</label>
              <select v-model='catColor' id="catColor"
                      class="ui simple dropdown">
                <option value="">Select a color</option>
                <option v-for='color in categoryColors'
                        >
                  {{color|capitalize}}
                </option>
              </select>
            </div><!-- select fileds-->
          </form>
        </div><!-- content -->
        <div class="actions">
          <div @click="addCategory" class="ui purple inverted button  right">Save</div>
        </div>
      </div>
    </div>

  </div>

  <!--</transition>-->
</template>
<style scoped>
  .modelmask{
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
    z-index: 1001;
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
<script type='text/babel'>
  import { eventBusVue } from "../store"
  import store from '../store'

  export default{
    created(){
      eventBusVue.$on('ADD-CATEGORY', this.showModal)
    },
    props: {
      isShowModal: true
    },
    data: function () {
      return {
        catName: '',
        catColor: '',
        categoryColors: ['red', 'orange', 'yellow', 'olive', 'green',
          'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
      }
    },
    watch:{
      catColor:function(){
        console.log(this.catColor)
      }
    },
    filters: {
      capitalize: (content) => content.slice(0, 1).toLocaleUpperCase() + content.slice(1)
    },
    methods: {
      addCategory: function () {
        const newCategory = {}
          , cm = this
        newCategory.name = cm.catName
        newCategory.color = cm.catColor
        store.addCategory(newCategory)
        this.closeModal()

      },
      showModal(){

      },
      closeModal(){
        this.$emit('closecategorymodal')
      }
    }
  }
</script>



// WEBPACK FOOTER //
// CategoryModal.vue?06c52e34