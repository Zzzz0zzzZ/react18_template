/**
 * 节流函数，返回被节流的新函数，函数第一次会立即触发
 * @param fn  希望节流的函数
 * @param time  节流时间 ms
 * @return {(function(...[*]): void)|*} 返回的新函数
 * @private
 */
export function _throttle(fn, time) {
  let timer = null

  return function(...args) {
    let context = this
    if (timer === null) {
      fn.apply(context, args)
      timer = setTimeout(()=>{
        timer = null
      }, time)
    }
  }
}

export function _debounce(fn, delay) {
  let timer = null

  return function(...args) {
    let context = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(()=> {
      fn.apply(context, args)
    }, delay)
  }
}

export function _getType (val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}