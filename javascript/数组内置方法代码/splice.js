Array.prototype.splice2 = function (targetIndex, num, ...el) {
  let k = num
  const res = []
  if (el.length <= 0) {
    for (let i = targetIndex; i < this.length; i++) {
      if (this[i + num]) {
        res.push(this[i])
        this[i] = this[i + num]
      }
    }
    this.length -= num
  } else {
    let temp = []
    for (let i = targetIndex; i < this.length; i++) {
      if (res.length < num) {
        res.push(this[i])
      } else {
        temp.push(this[i])
      }
    }
    this.length = this.length - (temp.length + num)
    let len = this.length + el.length
    let j = 0
    for (let i = targetIndex; i < len; i++) {
      this[i] = el[j]
      j++
    }
    j = 0
    len = this.length + temp.length
    for (let i = this.length; i < len; i++) {
      this[i] = temp[j]
      j++
    }
  }
  return res
}
