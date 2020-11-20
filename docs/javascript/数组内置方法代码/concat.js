Array.prototype.concat2 = function (...arrays) {
  let copy = this.slice(0) // 不用深度拷贝，因为原concat也没有深度拷贝
  for (let i = 0; i < arrays.length; i++) {
    const item = arrays[i]
    if (!Array.isArray(item)) { // 不是数组直接push进copy
      copy.push(item)
    } else { // 数组的话递归concat进行连接
      for (let j = 0; j < item.length; j++) {
        copy = copy.concat2(item[j])
      }
    }
  }
  return copy
}