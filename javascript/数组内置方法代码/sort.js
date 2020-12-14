Array.prototype.sort2 = function (fn) {
  const res = quickSort([...this], fn)
  for (let i = 0; i < res.length; i++) {
    this[i] = res[i]
  }
  return res
}

const quickSort = function(arr, fn) {
  if (arr.length <= 1) { return arr; }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++){
    if (fn(arr[i], pivot) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left, fn).concat([pivot], quickSort(right, fn));
};

var points = [40,100,1,5,25,10];
points.sort2(function(a,b){return a-b});
console.log(points)
