import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_select_template from "../templates/on_select.json";
import error_template from "../templates/error_seller.json";
import { sendResponse } from "../utils/api";
import { performL2Validations } from "../L2-validations";
import { setToCache,getFromCache } from "../utils/redis";
import { CACHE_DB_0 } from "../constants/constants";


function createAndAppendFulfillments(items: any[], fulfillments: any[]): void {
  items.forEach(item => {
      // For each item, check the fulfillment_ids
      item.fulfillment_ids.forEach((parentFulfillmentId: string) => {
          // Get the parent fulfillment object from the fulfillments array
          const parentFulfillment = fulfillments.find(f => f.id === parentFulfillmentId);

          if (parentFulfillment) {
              // Get the quantity based on the selected count
              const quantity = item.quantity.selected.count;

              for (let i = 0; i < quantity; i++) {
                  // Create new fulfillment object
                  const newFulfillment = {
                      "id": `F${Math.random().toString(36).substring(2, 9)}`, // Unique ID for new fulfillment
                      "type": "TICKET",
                      "tags": [
                          {
                              "descriptor": {
                                  "code": "INFO"
                              },
                              "list": [
                                  {
                                      "descriptor": {
                                          "code": "PARENT_ID"
                                      },
                                      "value": parentFulfillment.id // Set parent ID
                                  }
                              ]
                          }
                      ]
                  };

                  // Append the new fulfillment to the fulfillments array
                  fulfillments.push(newFulfillment);

                  // Append the new fulfillment's id to the item's fulfillment_ids
                  item.fulfillment_ids.push(newFulfillment.id);
              }
          }
      });
  });
}
function getUniqueFulfillmentIdsAndFilterFulfillments(items: any[], fulfillments: any[]): any[] {

  fulfillments = [fulfillments]
  // Ensure fulfillments is an array, fallback to an empty array if it's not
  if (!Array.isArray(fulfillments)) {
    throw new Error("Expected 'fulfillments' to be an array.");
  }

  // Step 1: Get all unique fulfillment IDs from the items
  const fulfillmentIds = items
      .flatMap(item => item.fulfillment_ids)  // Flatten the fulfillment_ids arrays
      .filter((value, index, self) => self.indexOf(value) === index);  // Remove duplicates
  
    
  // Step 2: Filter the fulfillments based on the unique fulfillment IDs
  const filteredFulfillments = fulfillments.filter(fulfillment => 
      fulfillmentIds.includes(fulfillment.id)  // Check if fulfillment.id is in the unique fulfillmentIds list
  );

  return filteredFulfillments;
}


const createQuoteFromItems = (items: any): any => {
  let totalPrice = 0; // Initialize total price

  const breakup = items.map((item: any) => {
      const itemTotalPrice = Number(item.price.value) * item.quantity.selected.count; // Calculate item total price
      totalPrice += itemTotalPrice; // Add to total price

      return {
          title: "BASE_FARE",
          item: {
              id: item.id,
              price: {
                  currency: item.price.currency,
                  value: item.price.value,
              },
              quantity: {
                  selected: {
                      count: item.quantity.selected.count,
                  },
              },
          },
          price: {
              currency: item.price.currency,
              value: itemTotalPrice.toFixed(2),
          },
      };
  });

  return {
      price: {
          value: totalPrice.toFixed(2), // Total price as a string with two decimal places
          currency: items[0]?.price.currency || "INR", // Use currency from the first item or default to "INR"
      },
      breakup,
  };
};
const handleSelectRequest = async (payload: any) => {

  const extarctedData = extractPayloadData(payload, "select");
  extarctedData["selected_ids"] = Array.isArray(extarctedData["selected_ids"]) ? extarctedData["selected_ids"] : [extarctedData["selected_ids"]];
  const ids_with_quantities = {
    items: payload.message.order.items.reduce((acc: any, item: any) => {
      acc[item.id] = item.quantity.selected.count;
      return acc;
    }, {})
  };
  const filterItemsBySelectedIds = (items: any[], selectedIds: string | string[]): any[] => {
    // Convert selectedIds to an array if it's a string
    const idsToFilter = Array.isArray(selectedIds) ? selectedIds : [selectedIds];

    // Filter the items array based on the presence of ids in selectedIds
    return items.filter(item => idsToFilter.includes(item.id));
};
  extarctedData["ids_with_quantities"] = ids_with_quantities

  // store in cache
  // valdiation
  // if(l2.template) { return }


  let json_cache_data: any = await getFromCache(payload.context.transaction_id,CACHE_DB_0);
  if(!json_cache_data){throw new Error("Cache data not found at select action")}
  json_cache_data.items = filterItemsBySelectedIds(json_cache_data.items,extarctedData["selected_ids"])
  json_cache_data.fulfillments = getUniqueFulfillmentIdsAndFilterFulfillments(json_cache_data.items,json_cache_data.fulfillments)
  const updatedItems = json_cache_data.items.map((item: any) => ({
    ...item,
    quantity: {
      selected: {
        count: extarctedData["ids_with_quantities"]["items"][item.id] || 0, // Default to 0 if not in the mapping
      },
    },
  }
  ));
  extarctedData["updated_items"] = updatedItems

  createAndAppendFulfillments(updatedItems,json_cache_data.fulfillments)
  const quote = createQuoteFromItems(updatedItems)
  extarctedData["quote"] = quote
  extarctedData["timestamp"] = new Date().toISOString();
  const combined_data = { ...json_cache_data, ...extarctedData };
  const responsePayload = resolveTemplate(on_select_template, combined_data);
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
      action: "on_select",
      error: combined_errors,
    });
    sendResponse(responsePayload, "on_select");
    return;
  }
  await setToCache(
    payload?.context?.transaction_id,
    combined_data,
    CACHE_DB_0
  );

  sendResponse(responsePayload, "on_select");
};

export default handleSelectRequest;






























