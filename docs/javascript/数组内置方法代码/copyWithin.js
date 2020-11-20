Array.prototype.copyWithin2 = function (target, start, end) {
  start = start || 0
  end = end || this.length
  const copy = []
  for (let i = start; i < end; i++) {
    copy.push(this[i])
  }
  const len = this.length > copy.length ? copy.length : this.length // 判断需要遍历赋值的最长长度
  for (let i = 0, j = target; i < len; i++, j++) {
    if (j >= this.length) {
      break
    }
    this[j] = copy[i]
  }
  return this
}