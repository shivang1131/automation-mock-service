import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import search_2_template from "../templates/search_2.json";
import select from "../templates/select.json";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";
import { generateRandomUUID } from "../utils/generate_uuids";
import { json } from "body-parser";

const handleOnSearchRequest = async (payload: any) => {
    if (payload?.message?.catalog?.providers[0]?.items) {
        handleOnSearchRequest2(payload);
      } else {
        handleOnSearchRequest1(payload);
      }
  };


  const handleOnSearchRequest1 = async (payload: any) => {
    const extracted_data = extractPayloadData(payload, "on_search_1");
    extracted_data["transaction_id"] = "7743a9e2-4fb5-487c-92b7-13ba8018f177"
    extracted_data["message_id"] = "8743e9e2-4fb5-487c-92b7-13ba8018f177"
    extracted_data["timestamp"] = new Date().toISOString();
    extracted_data["city_code"] = payload?.city_code

    await RedisService.setKey(
        extracted_data["transaction_id"],
        JSON.stringify(extracted_data),
      );
      
    const responsePayload = resolveTemplate(search_2_template, extracted_data);

    sendResponse(responsePayload, "search");
  };

  const handleOnSearchRequest2 = async (payload: any) => {
    let cachedata: any = await RedisService.getKey(payload.context.transaction_id);
    let json_cache_data = JSON.parse(cachedata)
    const extracted_data = extractPayloadData(payload, "on_search_2");
    extracted_data["message_id"] = "6843e9e2-4fb5-487c-92b7-13ba8018f176"
    extracted_data["timestamp"] = new Date().toISOString();
    const combined_data = {...json_cache_data,...extracted_data}
    const responsePayload = resolveTemplate(select, combined_data);
    await RedisService.setKey(
        payload.context.transaction_id,
        JSON.stringify(combined_data),
      );
    sendResponse(responsePayload, "select");
  };

  export default handleOnSearchRequest;

