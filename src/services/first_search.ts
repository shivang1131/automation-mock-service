import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import { sendResponse } from "../utils/api";
import { setToCache } from "../utils/redis";
import search_1 from "../templates/search_1.json";
import { generateRandomUUID } from "../utils/generate_uuids";
import { CACHE_DB_0 } from "../constants/constants";

const initiateFirstSearch = async (payload: any) => {

        const subscriber_url = payload.subscriberUrl
        if(payload?.initiateSearch){
        const extracted_data:any = {}
        extracted_data["transaction_id"] = generateRandomUUID()
        extracted_data["message_id"] = generateRandomUUID()
        extracted_data["timestamp"] = new Date().toISOString()
        extracted_data["cityCode"] = payload?.city_code ?? "std:011"
        extracted_data["subscriber"] = subscriber_url
        await setToCache(
            payload?.context?.transaction_id,
            extracted_data,
            CACHE_DB_0
        );
        const responsePayload = resolveTemplate(search_1, extracted_data);
        sendResponse(responsePayload, "search",{ subscriberUrl: subscriber_url});
        }
  };




  export default initiateFirstSearch;