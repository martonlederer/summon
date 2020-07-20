import { IHeadData, IParams } from '../types.ts'

// create a valid url from a base url and an uri
export function concatURL (baseURL: string, URI: string): string {

  const
    baseParts = baseURL.split('/'),
    uriParts = URI.split('/'),
    fullParts = baseParts.concat(uriParts),
    url = fullParts.join('/')

  return url.replace(new RegExp('(?<!:)(\/\/)', 'g'), '')

}

// create a headers object from a head data object
export function createHeaders (headersObj: IHeadData): Headers {

  const headers: Headers = new Headers()

  for(const [ key, value ] of Object.entries(headersObj))
    headers.set(key, value)

  return headers

}

// concat params
export const concatParams = (params: IParams): string => Object.keys(params).map(key => (encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))).join('&')