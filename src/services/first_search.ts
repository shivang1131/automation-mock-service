import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";
import search_1 from "../templates/search_1.json";
import { generateRandomUUID } from "../utils/generate_uuids";22

const initiateFirstSearch = async (payload: any) => {

        const subscriber_url = payload.subscriberUrl
        if(payload?.initiateSearch){
        const extracted_data:any = {}
        extracted_data["transaction_id"] = generateRandomUUID()
        extracted_data["message_id"] = generateRandomUUID()
        extracted_data["timestamp"] = new Date().toISOString()
        extracted_data["city_code"] = payload?.city_code
        extracted_data["subscriber"] = subscriber_url
        RedisService.useDb(0);
        await RedisService.setKey(
            payload?.context?.transaction_id,
            JSON.stringify(extracted_data),
        );
        const responsePayload = resolveTemplate(search_1, extracted_data);
        sendResponse(responsePayload, "search",{ subscriberUrl: subscriber_url});
        }
  };




  export default initiateFirstSearch;