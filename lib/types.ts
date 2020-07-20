export interface IRequest {

  url: string
  headers?: IHeadData
  params?: {

    [key: string]: string | boolean | number

  }
  validateStatus?: Function
  timeout?: number
  auth?: { username: string, password: string }
  method?: string | 'get' | 'post' | 'put' | 'delete' | 'options' | 'head' | 'connect' | 'trace' | 'patch'
  data?: IData
  cancelToken?: AbortSignal
  
}

export interface IData {

  [key: string]: any

}

export interface IHeadData {

  [key: string]: any

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