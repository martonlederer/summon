import { IRequest, IData } from "./types.ts";

export async function summon (url: string | IRequest, config?: IRequest) { 
    
  console.log(url, config)

}

summon.get = async (url: string, data?: IData) => {

  console.log(`get ${ url }`)  

}

summon.post = async (url: string, data?: IData) => {

  console.log(`post ${ url }`)  

}

summon.delete = async (url: string, data?: IData) => {

  console.log(`delete ${ url }`)  

}

summon.put = async (url: string, data?: IData) => {

  console.log(`put ${ url }`)  

}