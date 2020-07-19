import { summon } from '../mod.ts'

await summon.get('test')
await summon({

  method: 'get'

})