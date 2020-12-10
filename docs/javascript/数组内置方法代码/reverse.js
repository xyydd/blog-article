Array.prototype.reverse2 = function () {
  let start = 0
  let end = this.length - 1
  while (start <= Math.floor(this.length / 2)) {
    const temp = this[start]
    this[start] = this[end]
    this[end] = temp
    start++
    end--
  }
  return this
}
