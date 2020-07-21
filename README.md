# summon

 [![nest badge](https://nest.land/badge.svg)](https://nest.land/package/summon) ![summon build](https://img.shields.io/github/workflow/status/MartonDev/summon/CI%20check)

 An elegant requests library for Deno, modelled after [axios](https://npmjs.org/package/axios)

## What is summon?
 Summon provides an elegant, more readable interface to the Deno fetch API for making requests. It's codebase and layout is modelled after [axios](https://npmjs.org/package/axios), but is more lightweight and uses a golang inspired return sytax.

## Usage
 First import the module from [nest.land](https://nest.land/package/summon):
 ```ts
 import { summon } from 'https://x.nest.land/summon@0.0.1/mod.ts'
 ```

 A simple summon `GET` request looks like this:

 ```ts
 const { response, error } = await summon.get('https://example.com', { params: {

   page: 1,
   testparam: true

 }}) // get request with custom config
 ```
 You can also access all requests with their respective lowercase shortcuts
 
 ```ts
 const { res } = await summon.post('https://example.com/post', { // you can also use shortcuts to response and error (res, err)

   title: 'test',
   description: 'This is a test description for a new post'

 })
 // or
 const { res } = await summon.put(...)
 const { res } = await summon.delete(...)
 const { res } = await summon.patch(...)
 const { res } = await summon.options(...)
 const { res } = await summon.head(...)
 const { res } = await summon.connect(...)
 const { res } = await summon.trace(...)
 ```

## Summon API
 Like axios, summon has it's own API for maximum configuration and readability

 ```ts
 const { response, error } = await summon('/test', {

  baseURL: 'https://example.com', // the base URL of the request. If this is not undefined, the library will concat the url to the value of this field. In this request, the baseURL and the url will be concated to https://example.com/test
  method: 'post', // 'get' | 'post' | 'put' | 'delete' | 'options' | 'head' | 'connect' | 'trace' | 'patch'
  headers: {

    'Accept': 'application/xml', // accept only xml response
    'Content-Type': 'application/json'

  },
  params: {

    page: 2 // this will be concated to "?page=2" and added to the request url

  },
  validateStatus: (status) => (status >= 200 && status < 210), // validate the returned status. In this example, if the status code is greater than 210, the result gives an error
  timeout: 100, // after how many milliseconds should the request timeout. Default is 0
  throwErrorOnTimeout: true // weather the library should throw an error on timeout (this will terminate your app, because of the way Deno behaves) Default: false
  auth: { username: 'test', password: 'password' }, // submit a base64 encoded auth request
  data: { somevalue: true }, // the request body 
  abortController: // an AbortController object that you can use to cancel/abort your request

 })
 ```
 You can even put the URL inside the config object
 ```ts
 const { res, err } = await summon({

  url: 'https://example.com/',
  ...

 })
 ```

### Instance
 You can create an instance of summon with the `create()` function
 ```ts
 const INSTANCE = summon.create({ baseURL: 'https://api.github.com/' })
 ```

# License
Licensed under the [MIT License](https://github.com/MartonDev/summon/blob/master/LICENSE)
Contributions are welcome. 