/**
 * Created by hyc on 2016/12/13.
 */
function filterByTitle(value, title) {
  return filterByFilterText(value, 'bookTitle', title)
}
function filterByCategory(categories, category) {
  return categories.filter(cat=>cat.name.indexOf(category) > -1)
}


function filterByFilterText(bookmarks, filterBy, filterText) {
  return bookmarks.concat().filter(bm=> bm[filterBy].indexOf(filterText) > -1)
}

export {filterByTitle, filterByCategory, filterByFilterText}
