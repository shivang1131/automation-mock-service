import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_confirm_template from "../templates/on_confirm.json";
import { sendResponse } from "../utils/api";

const handleConfirmRequest = (payload: any) => {
  console.log("confirm payload: ", payload);

  const extarctedData = extractPayloadData(payload, "confirm");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_confirm_template, extarctedData);
  sendResponse(responsePayload, "confirm");
};

export default handleConfirmRequest;
