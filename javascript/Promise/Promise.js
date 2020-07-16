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
        }
      })

    } else if (this.status === PENDING) {
      s
    }
  })
}