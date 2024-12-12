import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import init from "../templates/init.json";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";
import { generateRandomUUID } from "../utils/generate_uuids";

const handleOnSelectRequest = async (payload: any) => {
    let cachedata: any = await RedisService.getKey(payload.context.transaction_id);
    let json_cache_data = JSON.parse(cachedata)
    console.log(json_cache_data)
    const extracted_data:any = {}
    extracted_data["message_id"] = "7343e9e2-4fb5-487c-92b7-13ba8018f176"
    extracted_data["timestamp"] = new Date().toISOString();
    const combined_data = {...json_cache_data,...extracted_data}
    const responsePayload = resolveTemplate(init, combined_data);
    sendResponse(responsePayload, "init");
  };


  export default handleOnSelectRequest;