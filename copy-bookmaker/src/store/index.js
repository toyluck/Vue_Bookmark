/**
 * Created by hyc on 2016/12/12.
 */
// 应用 ID，用来识别应用
const AV = require('leancloud-storage')
  , APP_ID = 'gqJAucr5BewbUEDjBG97Xs2Y-gzGzoHsz'
// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
  , APP_KEY = 'OlNb0xt4fr6QOgDFEVOYTnd9'
  , Vue = require('vue')
// 初始化
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
const CATEGORIES = 'categories'
  , BOOKMARKS = 'bookmarks'
  , categoriesRef = AV.Object.extend(CATEGORIES)
  , bookmarksRef = AV.Object.extend(BOOKMARKS)
  , Store = function () {
}
let _categories = new categoriesRef()
  , _bookmarks = new bookmarksRef()
_categories.set({
  name: 'category'
})
const eventBusVue = new Vue()

// save
Store.prototype.addCategory = (cat) => {
  _categories = new categoriesRef()
  // _categories.set('category', cat)
  cat.color = cat.color.toLocaleLowerCase()
  _categories.set(cat)
  _categories.save().then(data => {
    cat.id = data.id
    eventBusVue.$emit('ADD_CATEGORY_SUCCESS', cat)
  }).catch(err => {
    eventBusVue.$emit('ADD_CATEGORY_FAILED', err)
  })

}

// 删除 destory
Store.prototype.removeCategory = (ctg) => {
  const toDel = AV.Object.createWithoutData(CATEGORIES, ctg.id)
  toDel.destroy().then(suc => {
    eventBusVue.$emit("DEL_CATEGORY_SUCCESS", ctg)
  }, err => {
    eventBusVue.$emit("DEL_CATEGORY_FAILED", err)
  })

}
// save
Store.prototype.addBookmark = (bookmark) => {
  console.log('addBookmark', bookmark)
  const fetchBookmark=Object.assign({},bookmark)
  const serverBookmark = new bookmarksRef()
  // _categories.set('category', cat)
  fetchBookmark.category = JSON.stringify(bookmark.category)
  serverBookmark.set(fetchBookmark)
  serverBookmark.save().then(data => {
    bookmark.id = data.id
    console.log('addBookmark success', bookmark)

    eventBusVue.$emit('ADD_BOOKMARK_SUCCESS', bookmark)
  }).catch(err => {
    eventBusVue.$emit('ADD_BOOKMARK_FAILED', err)
  })
}

// 删除 destory
Store.prototype.removeBookmark = (bookmark) => {
  const toDel = AV.Object.createWithoutData(BOOKMARKS, bookmark.id)
  toDel.destroy().then(suc => {
    eventBusVue.$emit("DEL_BOOKMARK_SUCCESS", bookmark)
  }, err => {
    eventBusVue.$emit("DEL_BOOKMARK_FAILED", err)
  })

}

//https://leancloud.cn/docs/leanstorage_guide-js.html#获取对象\
//get()

// 同步 fetch() https://leancloud.cn/docs/leanstorage_guide-js.html#同步对象
Store.prototype.fetchAll = () => {

  const query = new AV.Query(CATEGORIES);
  let fetchcategories
  query.find().then(results => {
    fetchcategories = results.map(re => {
      const bre = re.attributes
      bre.id = re.id
      return bre
    })
    return new AV.Query(BOOKMARKS).find()
  }, err => {
    console.log(err)
    eventBusVue.$emit('SYNC ERR', err)
  }).then(bookmarks=> {
    bookmarks = bookmarks.map(bm => {
      const bre = bm.attributes
      bre.id = bm.id
      bre.category = JSON.parse(bre.category)
      return bre
    })
    eventBusVue.$emit('SYNC_SUCCESS', fetchcategories, bookmarks)
  }, err => {
    console.log(err)
    eventBusVue.$emit('SYNC ERR', err)
  })
}
// console.log(Store.prototype)
const store = new Store()
store.fetchAll();
// store.addCategory({
//   name: String(new Date()),
//   color: 'purple'
// })
export {store as default, eventBusVue}

