Array.prototype.reduceRight2 = function (fn) {
  let res = this[this.length - 1]
  for (let i = this.length - 2; i >= 0; i--) {
    res = fn(res, this[i], i, this)
  }
  return res
}
