import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_search_1_template from "../templates/on_search_1.json";
import on_search_2_template from "../templates/on_search_2.json";
import { sendResponse } from "../utils/api";

const handleSerachRequest = (payload: any) => {
  if (payload.message.intent.fulfillment.stops) {
    handleSeach2(payload);
  } else {
    handleSearch1(payload);
  }
};

const handleSearch1 = (payload: any) => {
  console.log("search 1 payload: ", payload);

  const extarctedData = extractPayloadData(payload, "search_1");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_search_1_template, extarctedData);
  sendResponse(responsePayload, "search");
};

const handleSeach2 = (payload: any) => {
  console.log("search 2 payload: ", payload);

  const extarctedData = extractPayloadData(payload, "search_2");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_search_2_template, extarctedData);
  sendResponse(responsePayload, "search");
};

export default handleSerachRequest;
