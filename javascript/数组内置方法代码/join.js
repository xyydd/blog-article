Array.prototype.join2 = function (separator = '') {
  let res
  for (let i = 0; i < this.length; i++) {
    if (!res) {
      res = this[i]
    } else {
      res += separator + this[i]
    }
  }
  return res
}
