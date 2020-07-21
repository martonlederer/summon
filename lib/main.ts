import { IRequest, IData, IResult } from './types.ts'
import { doRequest } from './src/Requester.ts'

// summon API
export async function summon (urlOrConfig: string | IRequest, config?: IRequest): Promise<IResult> { 
  
  if(config !== undefined && typeof urlOrConfig === 'string') // the url parameter is acutally used
    return doRequest(Object.assign({}, summon.defaultConfig, { urlOrConfig }, config)) // overwriting the default values
  else if(typeof urlOrConfig !== 'string') // the url parameter is not acutally used, but as a config
    return doRequest(Object.assign({}, summon.defaultConfig, urlOrConfig)) // overwriting the default values
  else
    throw new Error('Invalid parameters. First parameter has to be a URL string or config, second has to be a config.')

}

// shortcuts
summon.get = async (url: string, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, { url }, config, { method: 'get' }))
summon.post = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'post', data }))
summon.delete = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'delete', data }))
summon.put = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'put', data }))
summon.options = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'options', data }))
summon.head = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'head', data }))
summon.connect = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'connect', data }))
summon.trace = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'trace', data }))
summon.patch = async (url: string, data?: IData | string | FormData, config?: IRequest): Promise<IResult> => doRequest(Object.assign({}, summon.defaultConfig, { url }, config, { method: 'patch', data }))

// create an instace of summon
summon.create = (config?: IRequest) => {

  const summonInstance = Object.assign({}, summon)

  summonInstance.defaultConfig = Object.assign({}, summon.defaultConfig, config) // add a default config for the instance overriding the summon default with user specified one

  return summonInstance

}

// the default config
summon.defaultConfig = { method: 'get', timeout: 0, throwErrorOnTimeout: false, validateStatus: (status: number) => (status >= 200 && status < 300) }