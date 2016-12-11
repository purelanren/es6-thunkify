export default function thunkify (fn) {
  return function (...args) {
    return cb => {
      let done = false
      args.push(function (...cbArgs) {
        if (done) {
          return
        }
        done = true
        cb(...cbArgs)
      })
      try {
        fn.call(this, ...args)
      } catch (e) {
        cb(e)
      }
    }
  }
}
