Array.prototype.entries2 = function () {
  return this[Symbol.iterator]()
}
Array.prototype[Symbol.iterator] = function () {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < this.length ?
        {value: this[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  }
}