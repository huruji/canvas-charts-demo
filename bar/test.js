// try {
//   const let = 123
// } catch (e) {
//   console.log('error')
// }


// try {
//   setTimeout(() => {
//     Promise.reject()
//   }, 1000)
// } catch(e) {
//   console.log('error')
// }


// try {
//   let jsonStr = '{"a": 123,},'
//   JSON.parse(jsonStr)
// } catch(e) {
//   console.log('error')
// }

// try {
//   let val = null
//   val.getName()
// } catch(e) {
//   console.log('error')
// }

// const nums = [1, 2, 3, 4, 1, 2,3, 5,6]


// const newNums = Array.from(new Set(nums))

// const newNums = nums.filter((n, i) => {
//   return nums.indexOf(n) === i
// })

// const newNums = nums.forEach((n, i) => {
//   return nums.indexOf(n) === i
// })

// const newNums = nums.reduce((acc, n, i) => {
//   return [].concat(acc,
//     nums.indexOf(n) === i
//     ? n
//     : []
//   )
// })

// for(var i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i + 1)
//   }, i * 1000)
// }

// for(let i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i + 1)
//   }, i * 1000)
// }

// for(var i = 0; i < 5; i++) {
//   (function(){
//     setTimeout(function() {
//       console.log(i + 1)
//     }, i * 1000)
//   })(i)
// }

// for(var i = 0; i < 5; i++) {
//   (function(i){
//     setTimeout(function() {
//       console.log(i + 1)
//     }, i * 1000)
//   })(i)
// }

// function f() {
//   console.log(this)
// }
// f()

// var obj = {
//   fn: function() {
//     console.log(this)
//   }
// }

// obj.fn()

// var obj = {
//   fn:() => {
//     console.log(this)
//   }
// }

// obj.fn()


new Promise((resolve, reject) => {
    resolve('Success!')
  })
  .then(() => {
    throw Error('Error')
  })
  .catch(error => {
    return 'catch Error'
  })
  .catch(error => console.log(error.message))