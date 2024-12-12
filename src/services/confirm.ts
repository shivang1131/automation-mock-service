import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_confirm_template from "../templates/on_confirm.json";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";
import { randomBytes } from "crypto";

function generateQrToken(): string {
  return randomBytes(32).toString("base64");
}

function updateFulfillmentsWithParentInfo(fulfillments: any[]): void {
  const validTo = "2024-07-23T23:59:59.999Z";

  fulfillments.forEach((fulfillment) => {
    // Check if the fulfillment has a parent tag
    const parentTag = fulfillment.tags?.find(
      (tag: any) =>
        tag.descriptor?.code === "INFO" &&
        tag.list?.some(
          (item: any) => item.descriptor?.code === "PARENT_ID"
        )
    );

    if (parentTag) {
      // Generate a random QR token
      const qrToken = generateQrToken();

      // Add the stops object
      fulfillment.stops = [
        {
          type: "START",
          authorization: {
            type: "QR",
            token: qrToken,
            valid_to: validTo,
            status: "UNCLAIMED",
          },
        },
      ];

      // Generate a random ticket number
      const ticketNumber = Math.random().toString(36).substring(2, 10);

      // Add the new TICKET_INFO tag
      fulfillment.tags.push({
        descriptor: {
          code: "TICKET_INFO",
        },
        list: [
          {
            descriptor: {
              code: "NUMBER",
            },
            value: ticketNumber,
          },
        ],
      });
    }
  });
}
const handleConfirmRequest = async (payload: any) => {

  const extarctedData = extractPayloadData(payload, "confirm");
  let cachedata: any = await RedisService.getKey(payload.context.transaction_id);
  let json_cache_data = JSON.parse(cachedata)

  const randomId = Math.random().toString(36).substring(2, 15);
  extarctedData["order_id"] = randomId
  extarctedData["updated_payments"]["params"] = {
    ...extarctedData["updated_payments"]["params"],
    "bank_code": "XXXXXXXX",
    "bank_account_number": "xxxxxxxxxxxxxx"
  }
  if (!Array.isArray(extarctedData.updated_payments)) {
    extarctedData.updated_payments = [extarctedData.updated_payments];
  }
  // store in cache
  // valdiation
  // if(l2.template) { return }
  updateFulfillmentsWithParentInfo(json_cache_data.fulfillments)
  const time_stamp = new Date().toISOString();
  extarctedData["created_at"] = time_stamp
  extarctedData["updated_at"] = time_stamp
  extarctedData["timestamp"] = new Date().toISOString();
  const combined_data = { ...json_cache_data, ...extarctedData}
  const responsePayload = resolveTemplate(on_confirm_template, combined_data);
  await RedisService.setKey(
    payload?.context?.transaction_id,
    JSON.stringify(combined_data),
  );
  sendResponse(responsePayload, "on_confirm");
};

export default handleConfirmRequest;
