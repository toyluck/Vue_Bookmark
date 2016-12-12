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
const CATEGORIES = 'categories',
  categoriesRef = AV.Object.extend(CATEGORIES)
  , bookmarksRef = AV.Object.extend('bookmarks')
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
  cat.color=cat.color.toLocaleLowerCase()
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

//https://leancloud.cn/docs/leanstorage_guide-js.html#获取对象\
//get()

// 同步 fetch() https://leancloud.cn/docs/leanstorage_guide-js.html#同步对象
Store.prototype.fetchAll = () => {

  const query = new AV.Query(CATEGORIES);
  query.find().then(results => {
    results = results.map(re => {
      const bre = re.attributes
      bre.id = re.id
      return bre
    })
    eventBusVue.$emit('SYNC_SUCCESS', results)
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
export { store as default, eventBusVue }

