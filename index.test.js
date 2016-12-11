const assert = require('assert')
const thunkify = require('./')

describe('thunkify', function () {
  it('should return thunk function', function (done) {
    const fn = function (a, cb) {
      cb(null, a)
    }
    const thunkfn = thunkify(fn)
    assert(typeof thunkfn === 'function', 'not return a function')
    const ret = thunkfn('ok')
    assert(typeof ret === 'function', 'not return a thunk function')
    ret(function (err, res) {
      assert(!err, 'not work')
      assert(res === 'ok', 'not work')
      done()
    })
  })

  it('should call cb only once', function (done) {
    const fn = function (a, cb) {
      cb(null, a)
      cb(null, a)
      cb(null, a)
    }
    var count = 0
    thunkify(fn)(1)(function (err, res) {
      count++
      assert(count === 1, 'cb called multiple')
      done()
    })
  })

  it('should keep the context', function (done) {
    const fn = function (cb) {
      cb(null, this.text)
    }
    const ctx = { text: 'ctx', thunkFn: thunkify(fn) }
    ctx.thunkFn()(function (err, text) {
      assert(!err, 'not keep the context')
      assert(text === 'ctx', 'not keep the context')
      done()
    })
  })

  it('should catch error', function (done) {
    const fn = function (a, cb) {
      getError()
    }
    const ctx = { text: 'ctx', thunkFn: thunkify(fn) }
    ctx.thunkFn()(function (err, text) {
      assert(err, 'not catch error')
      done()
    })
  })
})