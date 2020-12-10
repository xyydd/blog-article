Array.prototype.indexOf2 = function (el, start = 0) {
  if (start >= this.length || start < 0) return -1
  for (let i = start; i < this.length; i++) {
    if (el === this[i]) {
      return i
    }
  }
  return -1
}
