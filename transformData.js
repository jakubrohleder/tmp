var data = require('./raw_data')
var _ = require('lodash')

// console.log(data)

var result = _
  .chain(data)
  .reduce(getContent, {})
  .reduce(linkData, {})
  .value()
;

console.log(JSON.stringify(result))

function getContent(acc, element) {
  element.content.forEach(element => acc[element.key] = element)
  return acc
}

function linkData(acc, element, key, all) {
  element.children = element.childKeys.map(childKey => all[childKey])
  if(element.children.length === 0) element.children = undefined;
  if(element.parentKey === undefined) return element
  return acc
}