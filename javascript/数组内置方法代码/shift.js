Array.prototype.shift2 = function () {
  const res = this[0]
  for (let i = 0; i < this.length; i++) {
    if (this[i + 1]) {
      this[i] = this[i + 1]
    }
  }
  this.length -= 1
  return res
}
