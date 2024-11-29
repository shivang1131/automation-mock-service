
import fs from 'fs';
import jsonpath from 'jsonpath';
import { RedisService } from "ondc-automation-cache-lib";
import { performL2Validations } from './validations/l2-validations';
import { resolveTemplate } from './utils/template_parser';
import on_search_template from './templates/on_search_1.json'




function insert_and_update_cache(payload: any, action: string){

}
function get_template(payload: any, action:string) {
    let template
    switch(action){
        case 'search':
            const stopsPath = '$.message.intent.fulfillment.stops';
            const stops = jsonpath.query(payload, stopsPath);
            if (stops.length == 0) {
                // template = on_search_template_city_search
            } else {
                // template = on_search_template_station_flow
            }
            break;

    }
    return template

}
function get_data_for_cache(payload: any, action: string){
    let data: any = {};
    let paths;
    switch(action){
        case 'search':
            paths =JSON.parse(fs.readFileSync('/Users/shivangdudani/Desktop/mock_service/src/data.json', 'utf-8'));
            break;
        case 'on_search':
            paths =JSON.parse(fs.readFileSync('/Users/shivangdudani/Desktop/mock_service/src/data.json', 'utf-8'));
            break;
    }
    for (const key in paths){
        const path = paths[key];
        const value = jsonpath.query(payload, path);
        if(value){
            data[key] = String(value);
        }
    }
    return data;
}
export async function mock_service(payload: any) {
    let required_cache_data = get_data_for_cache(payload,payload?.context?.action)
    let required_cache_params = JSON.stringify(required_cache_data)
    await RedisService.setKey(
        payload?.context?.transaction_id,
        required_cache_params,
      );
    const response_template = get_template(payload,payload?.context?.action)
    const l2 =  await performL2Validations(payload?.context?.action,payload,required_cache_params)
    console.log((JSON.stringify(resolveTemplate(response_template,required_cache_data))))
}