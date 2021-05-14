const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise (fn) {
    let _this = this
    _this.currentState =PENDING
    _this.value = undefined
    
    _this.resolvedCallbacks = []
    _this.rejectedCallbacks = []

    _this.resolve = function (value) {
        if (value instanceof MyPromise) {
            return value.then(_this.resolve, _this.reject)
        }
        setTimeout(() => {
            if (_this.currentState = PENDING) {
                _this.currentState = RESOLVED
                _this.value = value
                _this.resolvedCallbacks.forEach(cb => cb())
            }
        })
    }

    _this.reject = function (reason) {
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.currentState = REJECTED
                _this.value = reason
                _this.rejectedCallbacks.forEach(cb => cb())
            }
        })
    }

    try {
        fn(_this.resolve, _this.reject)
    } catch (e) {
        _this.reject(e)
    }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
    let self = this
    // 规范2.2.7 then必须返回一个新的promise
    let promise2
    // 规范 2.2 onResolved和onRejected都为可选参数
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }

    if (self.currentState === RESOLVED) {
        return (promise2 = new MyPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onResolved(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        }))
    }

    if (self.currentState === REJECTED) {
        return (promise2 = new MyPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        }))
    }

    if (self.currentState === PENDING) {
        return (promise2 = new MyPromise(function (resolve, reject) {
            self.resolvedCallbacks.push(function () {
                try {
                    let x = onResolved(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.rejectedCallbacks.push(function () {
                try {
                    let x = onRejected(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        }))
    }
}

function resolutionProcedure (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Error'))
    }

    if (x instanceof MyPromise) {
        if (x.currentState === PENDING) {
            x.then(function (value) {
                resolutionProcedure(promise2, value, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }

    let called = false

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then

            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) {
                        return
                    }
                    called = true

                    resolutionProcedure(promise2, y, resolve, reject)
                }, e => {
                    if (called) {
                        return
                    }
                    called = true
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) {
                return
            }
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

MyPromise.deferred = function() {
    var result = {};
    result.promise = new MyPromise(function(resolve, reject){
      result.resolve = resolve;
      result.reject = reject;
    });
  
    return result;
}
module.exports = MyPromise;