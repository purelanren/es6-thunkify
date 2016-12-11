# es6-thunkify

生成thunk函数，需要es6环境

## 例子
    const fn = function (a, cb) {
      cb(null, a)
    }
    thunkify(fn)('a')(function (err, a) {
      console.log(a)
    })


