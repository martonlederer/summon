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
    else if(response) {

      console.log(response)
      assertEquals(response.data.id, 1)

    }

  }
  
})

Deno.test({

  name: 'Test summon api #2 - POST request, with headers and data\n',
  async fn () {

    let { res, err } = await summon({ 
      
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

    if(err)
      throw new Error(JSON.stringify(err))
    else if(res) {

      console.log(res)
      assertEquals(res.data.title, 'foo')

    }

  }
  
})

Deno.test({

  name: 'Test summon api #3 - DELETE request\n',
  async fn () {

    let { response, error } = await summon({ 
      
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'delete'
    
    })

    if(error)
      throw new Error(JSON.stringify(error))
    else if(response)
      console.log(response)  

  }
  
})

Deno.test({
  
  name: 'Test summon shortcuts #1 - GET request\n',
  async fn () {

    let { response, error } = await summon.get('https://api.github.com/repos/nestdotland/nest.land')

    if(error)
      throw new Error(JSON.stringify(error))
    else if(response)
      console.log(`Got response. The nest.land repo has ${ response.data.stargazers_count } starts, ${ response.data.forks_count } forks and is written in ${ response.data.language }.`)

  }

})

Deno.test({

  name: 'Test summon instance #1 - GET request\n',
  async fn () {

    const INSTANCE = summon.create({ baseURL: 'https://api.github.com' })

    let { response, error } = await INSTANCE.get('users/MartonDev')

    if(error)
      throw new Error(JSON.stringify(error))
    else if(response)
      console.log(`Marton Lederer has ${ response.data.public_repos } public repos`)  

  }
  
})