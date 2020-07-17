const random = (function xoshiro128p () {
  let a = Date.now(),
    b = Date.now(),
    c = Date.now(),
    d = Date.now()
  return function () {
    console.log(c, a)
    let t = b << 9, r = a + d
    console.log(c ^ a)
    c = c ^ a
    d = d ^ b
    b = b ^ c
    a = a ^ d
    c = c ^ t
    d = (d << 11) | (d >>> 21)
    return (r >>> 0) / 4294967296
  }
})()

console.log(random())
