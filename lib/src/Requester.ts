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
  throwErrorOnTimeout,
  auth,
  data,
  abortController

}: IRequest): Promise<IResult> {

  const Request: RequestInit = {}

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

  if(method !== 'get')
    Request.method = method.toUpperCase()

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
      Request.body = data
    else { // data is not in usable format, we have to convert it

      if(!headers) headers = {}

      headers['Accept'] = 'application/json'
      headers['Content-Type'] = 'application/json'
      Request.body = JSON.stringify(data)

    }

  }

  // cleaning up headers
  if(headers)
    Request.headers = createHeaders(headers)

  // set a clean abort controller, we'll need it for timeouts
  if(!abortController)
    abortController = new AbortController()

  // enable cancelling requests
  Request.signal = abortController.signal

  // timeout and abort request
  if(!timeout || timeout < 0)
    timeout = 0 // set to default

  // set timeout error
  let timeoutThread = setTimeout(() => {

    if(abortController) abortController.abort
    if(throwErrorOnTimeout) throw new Error(`Request to ${ url } timed out. \n Config: \n${ { url, baseURL, method, headers, params, validateStatus, data, timeout, throwErrorOnTimeout, auth, abortController } }`)
  
  }, timeout)

  // try fetching the result
  try {

    let
      Response = await fetch(url, Request), // make request
      responseData, // response body
      responseDataType = Response.headers.get('Content-Type') || '', // the response body type
      responseHeaders = Response.headers, // saving the response headers
      finalConfig: IRequest = { url, baseURL, method, headers, params, validateStatus, data, timeout, throwErrorOnTimeout, auth, abortController }, // re-concating the config with (supposably) previously modified data
      { status, statusText } = Response,
      validStatusCode = true // variable that returns the check of the user suplied / built in status validator

    if(responseDataType.toLocaleLowerCase().includes('json')) { // if the response data is json, try parsing it

      try {

        responseData = await Response.json() // successful json parse

      }catch (err) {

        responseData = await Response.text() // could not parse as json, parsing as text

      }

    }else
      responseData = Response.text() // parsing as text

    if(validateStatus) validStatusCode = validateStatus(status) // if there is a validate function, use that

    if(validStatusCode)
      return { response: { status, statusText, data: responseData, headers: responseHeaders, config: finalConfig }, error: null, res: { status, statusText, data: responseData, headers: responseHeaders, config: finalConfig }, err: null }
    else
      return { response: null, error: { response: { status, statusText, data: responseData, headers: responseHeaders }, config: finalConfig }, res: null, err: { response: { status, statusText, data: responseData, headers: responseHeaders }, config: finalConfig } }

  }catch(error) {

    return { response: null, error, res: null, err: error }

  }

  return { response: null, error: new Error('Unknown error'), res: null, err: new Error('Unknown error') }

}