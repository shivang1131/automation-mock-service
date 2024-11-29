import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_select_template from "../templates/on_select.json";
import { sendResponse } from "../utils/api";

const handleSelectRequest = (payload: any) => {
  console.log("select  payload: ", payload);

  const extarctedData = extractPayloadData(payload, "select");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_select_template, extarctedData);
  sendResponse(responsePayload, "select");
};

export default handleSelectRequest;
