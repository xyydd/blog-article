Array.prototype.reduce2 = function (fn) {
  let res = this[0]
  for (let i = 1; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }
  return res
}
