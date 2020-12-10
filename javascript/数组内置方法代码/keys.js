function makeIterator(array) {
  let nextIndex = 0;
  return {
    [Symbol.iterator]: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

Array.prototype.keys2 = function () {
  let res = []
  for (let i = 0; i < this.length; i++) {
    res.push(i)
  }
  return makeIterator(res).Symbol.iterator
}
