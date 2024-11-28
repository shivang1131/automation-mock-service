
import fs from 'fs';
import jsonpath from 'jsonpath';
import { RedisService } from "ondc-automation-cache-lib";
import { performL2Validations } from './validations/l2-validations';
import { resolveTemplate } from './utils/template_parser';
import on_search_template from './templates/on_search.json'

function get_required_data(payload: any, action: string){
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
        data[key] = String(value);
    }
    return data;
}
export async function mock_service(payload: any) {
    let required_cache_data = get_required_data(payload,'search')
    let required_cache_params = JSON.stringify(required_cache_data)
    await RedisService.setKey(
        payload?.context?.transaction_id,
        required_cache_params,
      );

    const l2 =  await performL2Validations(payload?.context?.action,payload,required_cache_params)
    console.log((JSON.stringify(resolveTemplate(on_search_template,required_cache_data))))
}