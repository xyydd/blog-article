Array.prototype.some2 = function (fn, context) {
  if (!context) {
    context = this
  }
  for (let i = 0; i < context.length; i++) {
    const res = fn(context[i], i, context)
    if (res === true) {
      return res
    }
  }
  return false
}
