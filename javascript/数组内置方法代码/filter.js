Array.prototype.filter2 = function (fn, ctx) {
  ctx = ctx || this
  const res = []
  for (let i = 0; i < this.length; i++) {
    if (fn.apply(ctx, [this[i], i, this])) {
      res.push(this[i])
    }
  }
  return res
}