Array.prototype.find2 = function (fn, ctx) {
  ctx = ctx || this
  for (let i = 0; i < this.length; i++) {
    if (fn.apply(ctx, [this[i], i, this])) {
      return this[i]
    }
  }
  return
}