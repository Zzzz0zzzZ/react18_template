import { createLoginVO } from "./creator";
import { UserLoginDTO, UserLoginVO } from "./type";

function _delay(fn: Function, time: number) {
  setTimeout(()=>{
    fn()
  }, time)
}

/**
 * Mock api数据
 */
type R<T> = {
  code: number,
  msg: string,
  data: T
}
type PR<T> = Promise<R<T>>;

function _response<T>(code: number, data?: any): R<T> {
  return {
    code: code,
    msg: "",
    data: data
  }
}

class ServiceMonitor {
  static logLevel = 'DEBUG'
  static subscribeMethodParamsIn(methodName: string, paramsIn: any) {
    this.logLevel === "DEBUG" && console.log(`===> [api] ${methodName}入参`, paramsIn)
  }
}

const apisMock = {
  /**
   * /api/login
   */
  userLogin: (data: UserLoginDTO): PR<UserLoginVO> => new Promise((resolve) => {
    ServiceMonitor.subscribeMethodParamsIn("userLogin", data)
    resolve(_response(200, createLoginVO()))
  }),
}

export default apisMock