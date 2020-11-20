Array.prototype.every2 = function (fn) {
  if (this.length > 0) {
    for (let i = 0; i < this.length; i++) {
      if (!fn(this[i])) {
        return false
      }
    }
  }
  return true
}