Array.prototype.forEach2 = function (fn, ctx = window) {
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    fn.apply(ctx, [item, i, this])
  }
}