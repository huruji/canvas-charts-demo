

// (async () => {
//   const request = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('Error')
//     }, 1000)
//   })

//   await request()

//   console.log('success')
// })()


// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     throw 'error'
//   }, 1000)
// }).catch(() => {
//   console.log('error')
// })


// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject()
//   }, 1000)
// }).catch(() => {
//   console.log('error')
// })


// new Promise((resolve, reject) => {
//   throw 'error'
// }).catch(() => {
//   console.log('error')
// })

function type(t) {
  return Object.prototype.toString.call(t).slice(8,-1)
}

function fn(...args) {
  return args
}

function fn2() {
  return arguments
}

console.log(type(fn(1,2,3)))
console.log(type(fn2(1,2,3)))


// (function() {
//   let f = this
//   ? class g { }
//   : class h { };
//  return [ typeof f, typeof h ];
//  })();


// (function() {
//   if (false) {
//     let f = {
//       g() => 1
//     };
//   }
//   return typeof f;
// })()

// var x = [typeof x, typeof y][1];
// var res =   typeof typeof x;
// console.log(res)


var p = new Promise((resolve, reject) => {
    reject(Error('error'))
  })
  .catch(err => console.log(err))
  .then(err => console.log(err))


