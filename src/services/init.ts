import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_init_template from "../templates/on_init.json";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";
import { json } from "body-parser";
const handleInitRequest = async (payload: any) => {

  const extarctedData = extractPayloadData(payload, "init");
  let cachedata: any = await RedisService.getKey(payload.context.transaction_id);
  let json_cache_data = JSON.parse(cachedata)
  const randomId = Math.random().toString(36).substring(2, 15);
  extarctedData["payments"]["id"] = randomId
  extarctedData["payments"]["params"] = {
    "bank_code": "XXXXXXXX",
    "bank_account_number": "xxxxxxxxxxxxxx"
  }
  // store in cache
  // valdiation
  // if(l2.template) { return }
  extarctedData["timestamp"] = new Date().toISOString();
  const combined_data = { ...json_cache_data, ...extarctedData}
  const responsePayload = resolveTemplate(on_init_template, combined_data);

  await RedisService.setKey(
    payload?.context?.transaction_id,
    JSON.stringify(combined_data),
  );
  sendResponse(responsePayload, "on_init");
};

export default handleInitRequest;
