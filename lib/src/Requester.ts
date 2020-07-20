import { IRequest, IResult } from '../types.ts'
import { concatURL, createHeaders, concatParams } from './util.ts'
import { methods } from './JavaScriptHelper.ts'

// this is the actual request
export async function doRequest ({ 

  url,
  baseURL,
  method,
  headers,
  params,
  validateStatus,
  timeout,
  auth,
  data,
  cancelToken

}: IRequest): Promise<IResult> {

  const request: RequestInit = {}

  // using base url ?
  if(baseURL)
    if(url.includes('://'))
      throw Error('Base URL is already given, counting url as an URI. You cannot use a protocol with an URI.') // if there is a base url, we count the url field as an URI, so it cannot have a protocol
    else
      url = concatURL(baseURL, url) // concat base url with the URI string

  // method exists ?
  if(method) {

    if(methods.includes(method.toLowerCase().trim())) // valid method ?
      method = method.toLowerCase().trim() // cleaning the method string
    else
      throw new Error('Invalid method') // method does not exist
  
  }else
    method = 'get' // method is get by default

  // cleaning up headers
  if(headers) {
    request.headers = createHeaders(headers)

  // map params to a string
  let encodedParams = params ? concatParams(params) : ''



}