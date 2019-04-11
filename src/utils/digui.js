/*
 * @Page: 权限功能树递归
 * @Author: cls
 * @Date: 2019-1
 * @Last Modified by: cls
 */
export function digui(arrs, obj) {
  if (obj.nextNode && obj.nextNode.length) {
    arrs.push(obj.currentNode.busiCode)
    for (const i in obj.nextNode) {
      digui(arrs, obj.nextNode[i])
    }
  } else {
    // arr.push(obj.currentNode.name) // 页面名字
    arrs.push(obj.currentNode.busiCode) // 页面code码
    return arrs
  }
}

export function diguiName(arr, obj) {
  if (obj.nextNode && obj.nextNode.length) {
    arr.push(obj.currentNode.name)
    for (const i in obj.nextNode) {
      diguiName(arr, obj.nextNode[i])
    }
  } else {
    arr.push(obj.currentNode.name)
    return arr
  }
}
