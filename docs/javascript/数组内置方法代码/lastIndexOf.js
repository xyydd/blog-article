Array.prototype.lastIndexOf2 = function (el, start = 0) {
  start = Math.abs(start)
  let res = -1
  for (let i = start; i < this.length; i++) {
    if (el === this[i] && res < i) {
      res = i
    }
  }
  if (start > 0) {
    for (let i = 0; i < this.length - start; i++) {
      if (el === this[i] && res < i) {
        res = i
      }
    }
  }
  return res
}
