import { IRequest, IData, IResult } from "./types.ts";

// summon API
export async function summon (urlOrConfig: string | IRequest, config?: IRequest): Promise<IResult> { 
  
  if(config !== undefined && typeof urlOrConfig === 'string') // the url parameter is acutally used
    return summon.request(Object.assign({}, summon.defaultConfig, { urlOrConfig }, config)) // overwriting the default values
  else if(typeof urlOrConfig !== 'string') // the url parameter is not acutally used, but as a config
    return summon.request(Object.assign({}, summon.defaultConfig, urlOrConfig)) // overwriting the default values
  else
    throw Error('Invalid parameters. First parameter has to be a URL string or config, second has to be a config.')

}

// shortcuts
summon.get = async (url: string, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'get' }))
summon.post = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'post', data }))
summon.delete = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'delete', data }))
summon.put = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'put', data }))
summon.options = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'options', data }))
summon.head = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'head', data }))
summon.connect = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'connect', data }))
summon.trace = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'trace', data }))
summon.patch = async (url: string, data?: IData, config?: IRequest): Promise<IResult> => summon.request(Object.assign({}, { url }, config, { method: 'patch', data }))

// the default config
summon.defaultConfig = { method: 'get', timeout: 0 }

// the acutal request
summon.request = async (config: IRequest): Promise<IResult> => {

  

}

// a fancy way to abort/cancel a request
summon.CancelToken = (): AbortController => new AbortController()