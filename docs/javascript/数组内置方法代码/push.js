Array.prototype.push2 = function (...el) {
  for (let i = 0; i < el.length; i++) {
    this[this.length + i] = el[i]
  }
  return this.length
}
