Array.prototype.includes2 = function (el, fromIndex = 0) {
  if (typeof el === 'object') {
    return false
  }
  if (fromIndex < 0) {
    fromIndex = this.length + fromIndex
  }
  for (let i = fromIndex; i < this.length; i++) {
    if (el.toString() === 'NaN') {
      if (this[i].toString() === el.toString()) {
        return true
      }
    } else {
      if (this[i] === el) {
        return true
      }
    }
  }
  return false
}
