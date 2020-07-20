import { summon } from '../mod.ts'

let { response, error } = await summon.get('https://jsonplaceholder.typicode.com/posts/1')

if(!error)
  console.log('No error', response)
else
  console.log('Error', error)
  
