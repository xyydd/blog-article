Array.prototype.pop2 = function () {
  const res = this[this.length - 1]
  this.length -= 1
  return res
}
