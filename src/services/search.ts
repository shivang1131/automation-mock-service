import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_search_1_template from "../templates/on_search_1.json";
import on_search_2_template from "../templates/on_search_2.json";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";

const handleSerachRequest =  (payload: any) => {
  if (payload.message.intent.fulfillment.stops) {
    handleSearch2(payload);
  } else {
    handleSearch1(payload);
  }
};

const handleSearch1 = async (payload: any) => {

  const extarctedData_search = extractPayloadData(payload, "search_1");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_search_1_template, extarctedData_search);
  const extarctedData_on_search = extractPayloadData(responsePayload,"on_search_1");
  sendResponse(responsePayload, "on_search");
};

const handleSearch2 = async (payload: any) => {

  const extarctedData_search = extractPayloadData(payload, "search_2");
  
  const responsePayload = resolveTemplate(on_search_2_template, extarctedData_search);
  const extarctedData_on_search = extractPayloadData(responsePayload,"on_search_2");
  extarctedData_on_search["timestamp"] = new Date().toISOString();
  const combined_data = { ...extarctedData_search, ...extarctedData_on_search };
  await RedisService.setKey(
      payload?.context?.transaction_id,
      JSON.stringify(combined_data),
    );
  sendResponse(responsePayload, "on_search");
};

export default handleSerachRequest;
