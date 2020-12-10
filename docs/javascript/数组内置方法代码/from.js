Array.from2 = function (data, mapFun = function (item) {return item}) {
  let res = []
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      res[i] = mapFun(data[i]) || null
    }
  } else if (typeof data[Symbol.iterator] === 'function') {
    data.forEach((item) => {
      res.push(mapFun(item))
    })
  }
  return res
}