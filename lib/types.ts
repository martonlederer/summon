export interface IRequest {

  url: string
  baseURL?: string
  method?: string | 'get' | 'post' | 'put' | 'delete' | 'options' | 'head' | 'connect' | 'trace' | 'patch'
  headers?: IHeadData
  params?: IParams
  validateStatus?: Function
  timeout?: number
  throwErrorOnTimeout?: boolean
  auth?: { username: string, password: string }
  data?: IData | string | FormData
  abortController?: AbortController
  
}

export interface IData {

  [key: string]: any

}

export interface IHeadData {

  [key: string]: any

}

export interface IResponseError {

  [key: string]: any

}

export interface IParams {

  [key: string]: string | boolean | number

}

export interface IResult {

  response: IResponse | null
  error: Error | IResponseError | null
  res: IResponse | null // shortcut
  err: Error | IResponseError | null // shortcut

}

export interface IResponse {

  status: number
  statusText: string
  data: any
  headers: Headers
  config: IRequest

}