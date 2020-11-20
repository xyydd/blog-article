Array.prototype.findIndex = function (fn, ctx) {
  ctx = ctx || this
  for (let i = 0; i < this.length; i++) {
    if (fn.apply(ctx, [this[i], i, this])) {
      return i
    }
  }
  return -1
}