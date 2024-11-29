import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_init_template from "../templates/on_init.json";
import { sendResponse } from "../utils/api";

const handleInitRequest = (payload: any) => {
  console.log("init payload: ", payload);

  const extarctedData = extractPayloadData(payload, "init");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const responsePayload = resolveTemplate(on_init_template, extarctedData);
  sendResponse(responsePayload, "init");
};

export default handleInitRequest;
