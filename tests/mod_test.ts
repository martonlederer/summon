import { summon } from '../mod.ts'

let { response, error } = await summon.get('https://jsonplaceholder.typicode.com/posts/1')

console.log(response)
  
