import { summon } from '../mod.ts'
import { assertEquals } from 'https://x.nest.land/std@0.61.0/testing/asserts.ts'

Deno.test({

  name: 'Test summon api #1 - GET request, with base url\n',
  async fn () {

    let { response, error } = await summon({ 
      
      url: '/posts/1',
      baseURL: 'https://jsonplaceholder.typicode.com/',
      method: 'get'
    
    })

    if(error)
      throw new Error(JSON.stringify(error))

    if(response === null)
      throw new Error('Response is null')

    console.log(response)

    assertEquals(response.data.id, 1)

  }
  
})

Deno.test({

  name: 'Test summon api #2 - POST request, with headers and data\n',
  async fn () {

    let { response, error } = await summon({ 
      
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
      data: {

        title: 'foo',
        body: 'bar',
        userId: 1

      },
      headers: {

        'Content-type': 'application/json; charset=UTF-8'

      }
    
    })

    if(error)
      throw new Error(JSON.stringify(error))

    if(response === null)
      throw new Error('Response is null')

    console.log(response)    

    assertEquals(response.data.title, 'foo')

  }
  
})