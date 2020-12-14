Array.prototype.toString2 = function () {
  return toStrng(this)
}

function toStrng (arr) {
  if (Array.isArray(arr)) {
    let res
    for (let i = 0; i < arr.length; i++) {
      if (!res) {
        res = toStrng(arr[i])
      } else {
        res += ',' + toStrng(arr[i])
      }
    }
    return res
  } else if (typeof arr === 'number' || typeof arr === 'string') {
    return arr
  } else {
    return Object.prototype.toString.call(arr)
  }
}
