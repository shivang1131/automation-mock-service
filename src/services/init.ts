import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_init_template from "../templates/on_init.json";
import error_template from "../templates/error_seller.json";
import { sendResponse } from "../utils/api";
import { getFromCache,setToCache } from "../utils/redis";
import { performL2Validations } from "../L2-validations";
import { CACHE_DB_2 } from "../constants/constants";
const handleInitRequest = async (payload: any) => {

  const extarctedData = extractPayloadData(payload, "init");
  let json_cache_data: any = await getFromCache(payload.context.transaction_id,CACHE_DB_2);
  const randomId = Math.random().toString(36).substring(2, 15);
  extarctedData["payments"]["id"] = randomId
  extarctedData["payments"]["params"] = {
    "bank_code": "XXXXXXXX",
    "bank_account_number": "xxxxxxxxxxxxxx"
  }
  if (!Array.isArray(extarctedData.payments)) {
    extarctedData.payments = [extarctedData.payments];
  }
  // store in cache
  // valdiation
  // if(l2.template) { return }
  extarctedData["timestamp"] = new Date().toISOString();
  const combined_data = { ...json_cache_data, ...extarctedData}
  const responsePayload = resolveTemplate(on_init_template, combined_data);
  const l2: any = performL2Validations(
    payload?.context?.action,
    payload,
    true,
    combined_data
  );
  if (!l2[0].valid) {
    const combined_errors = {"errors": l2}
    const responsePayload = resolveTemplate(error_template, {
      ...combined_data,
      action: "on_init",
      error: combined_errors,
    });
    console.log(responsePayload)
    sendResponse(responsePayload, "on_init");
    return;
  }
  await setToCache(
    payload?.context?.transaction_id,
    combined_data,
    CACHE_DB_2
  );
  sendResponse(responsePayload, "on_init");
};

export default handleInitRequest;
