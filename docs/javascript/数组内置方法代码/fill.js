Array.prototype.fill2 = function (v, start = 0, end) {
  end = end || this.length
  for (let i = start; i < end; i++) {
    this[i] = v
  }
  return this
}