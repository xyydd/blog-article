Array.prototype.unshift2 = function (...arr) {
  const temp = []
  for (let i = 0; i < this.length; i++) {
    temp.push(this[i])
  }
  this.length = arr.length
  for (let i = 0; i < this.length; i++) {
    this[i] = arr[i]
  }
  const len = this.length + temp.length
  let j = 0
  for (let i = arr.length; i < len; i++) {
    this[i] = temp[j]
    j++
  }
  return len
}

let a = [3,4,5]
a.unshift(1,2)
console.log(a)
