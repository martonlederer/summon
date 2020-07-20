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
  timeout, // with cancel token
  auth,
  data,
  cancelToken

}: IRequest): Promise<IResult> {

  const request: RequestInit = {}

  // using base url ?
  if(baseURL)
    if(url.includes('://'))
      throw new Error('Base URL is already given, counting url as an URI. You cannot use a protocol with an URI.') // if there is a base url, we count the url field as an URI, so it cannot have a protocol
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

  // map params to a string
  let encodedParams = params ? concatParams(params) : ''

  // simple login request with auth credentials?
  if(auth && auth.username && auth.password) {

    if(!headers) headers = {}

    headers['Authorization'] = `Basic ${ btoa(unescape(encodeURIComponent(`${ auth.username }:${ auth.password }`))) }`

  }

  // cleaning up data
  if(data) {

    if(method === 'get')
      throw new Error('Can\'t use data field in a get request')

    if(typeof data === 'string' || data instanceof FormData)
      request.body = data
    else { // data is not in usable format, we have to convert it

      if(!headers) headers = {}

      headers['Accept'] = 'application/json'
      headers['Content-Type'] = 'application/json'
      request.body = JSON.stringify(data)

    }

  }

  // cleaning up headers
  if(headers) {
    request.headers = createHeaders(headers)

}