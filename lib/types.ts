export interface IRequest {

  url: string
  baseURL?: string
  method?: string | 'get' | 'post' | 'put' | 'delete' | 'options' | 'head' | 'connect' | 'trace' | 'patch'
  headers?: IHeadData
  params?: IParams
  validateStatus?: Function
  timeout?: number
  auth?: { username: string, password: string }
  data?: IData
  cancelToken?: AbortSignal
  
}

export interface IData {

  [key: string]: any

}

export interface IHeadData {

  [key: string]: any

}

export interface IParams {

  [key: string]: string | boolean | number

}

export interface IResult {

  response: IResponse
  error: Error | null

}

export interface IResponse {

  status: number
  statusMessage: string
  data: any
  headers: Headers
  config: IRequest

}