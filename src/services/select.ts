import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_select_template from "../templates/on_select.json";
import error_template from "../templates/error.json";
import { sendResponse } from "../utils/api";
import { performL2Validations } from "../validations/l2-validations";
const handleSelectRequest = async (payload: any) => {
  console.log("select  payload: ", payload);

  const extarctedData = extractPayloadData(payload, "select");

  const l2 = await performL2Validations(
    payload?.context?.action,
    payload,
    extarctedData
  );
  console.log(l2);
  if (!l2.valid) {
    const responsePayload = resolveTemplate(error_template, {
      ...extarctedData,
      action: "on_select",
      error: l2.error,
    });
    sendResponse(responsePayload, "select");
    return;
  }
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_select_template, extarctedData);
  sendResponse(responsePayload, "select");
};

export default handleSelectRequest;
