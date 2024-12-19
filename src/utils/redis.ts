import { RedisService } from "ondc-automation-cache-lib";


export const getFromCache = async (key: string,db: number): Promise<any> => {
    try{
    RedisService.useDb(db);
    let cacheData :string = await RedisService.getKey(key) || "{}";
    cacheData = canBeParsed(cacheData) ? JSON.parse(cacheData) :  cacheData ;
    return cacheData;}
    catch(e:any){
        console.error("An error occurred while fetching data from cache, key - "+ key +", error - " + e.message)
        return {}
    }
};

export const setToCache = async (key: string, value: object | any[] | string| number| boolean , db:number): Promise<any> => {
    try{
    const cacheData : string = typeof value === 'string' ? value : JSON.stringify(value);
    RedisService.useDb(db);
    await RedisService.setKey(key, cacheData);
    return true
    }
    catch(e:any){
        console.error("An error occurred while setting data in cache key - "+ key +" error - " + e.message)
        return false
    }
};

function canBeParsed(str : any) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  