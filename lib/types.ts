export interface IRequest {

  method:
  | string
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  
}

export interface IData {

  [key: string]: any

}