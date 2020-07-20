import { summon } from '../mod.ts'

let { response, error } = await summon.get('test')

if(!error)
  console.log('No error', response)
else
  console.log('Error', error)
  
