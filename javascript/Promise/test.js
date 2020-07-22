const Promise = require('./Promise.js')

function delay (time = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log('123', resolve, reject)
      resolve('123')
    }, time)
  })
}

delay().then(res => console.log, err => console.error)

// delay().then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
