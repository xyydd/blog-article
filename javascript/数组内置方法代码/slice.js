Array.prototype.slice2 = function (start, end) {
  if (!end || end > this.length) {
    end = this.length
  }
  if (!start) {
    start = 0
  }
  let res = []
  for (let i = start; i < end; i++) {
    res.push(this[i])
  }
  return res
}
