import apisMock from "./mock";
import apisReal from "./real";

type ApiFactory = {
  mock: typeof apisMock,
  backend: typeof apisReal
}

const apiFactory: ApiFactory = {
  mock: apisMock,
  backend: apisReal
}

Object.entries(apiFactory).forEach(([_key, _apis]) => {
  process.env.NODE_ENV === 'development' && console.log('[MODE]', _key, '[APIS]', Object.keys(_apis))
})

const env = process.env.REACT_APP_MOCK_ENV as keyof ApiFactory
process.env.NODE_ENV === 'development' && console.log('[REACT_APP_MOCK_ENV]', env, env === 'mock' ? '使用mock环境' : '使用后端环境')
const apis = apiFactory[env]

export default apis