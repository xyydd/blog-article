const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (executor) {
  this.status = PENDING
  this.onFulfilled = [] // 成功回调
  this.onRejected = [] // 失败回调

  function resolve (value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onFulfilled.forEach(fn => fn())
    }
  }

  function reject (reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onRejected.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  console.log(1, onFulfilled, onRejected, this.value)
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
  let promise2 = new Promise((resolve, reject) => {

    if (this.status === FULFILLED) {

      setTimeout(() => {
        try {
          let x = onFullfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

    } else if (this.status === REJECTED) {

      setTimeout(() => {
        try {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

    } else if (this.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        })
      })
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })
  return promise2
}

function resolvePromise (peomise2, x, resolve, reject) {
  let self = this
  if (promise2 === x) {
    reject(new TypeError('Chaning cycle'))
  }
  if (x && typeof x === 'object' || typeof x === 'function') {
    let used
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (used) {
            return
          }
          used = true
          resolvePromise(peomise2, y, resolve, reject)
        }, r => {
          if (used) {
            return
          }
          used = true
          reject(r)
        })
      } else {
        if (used) {
          return
        }
        used = true
        reject(x)
      }
    } catch (e) {
      if (used) {
        return
      }
      used = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise