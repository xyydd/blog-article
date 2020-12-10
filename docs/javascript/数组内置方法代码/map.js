Array.prototype.map2 = function (fn, context = null) {
  const res = []
  if (!context) {
    context = this
  }
  for (let i = 0; i < context.length; i++) {
    res.push(fn(context[i], i, context))
  }
  return res
}
