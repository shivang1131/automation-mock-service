import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import search_2_template from "../templates/search_2.json";
import select from "../templates/select.json";
import { sendResponse } from "../utils/api";
import { RedisService } from "ondc-automation-cache-lib";
import { generateRandomUUID } from "../utils/generate_uuids";
import { json } from "body-parser";

const transformToItemFormat = (items: any[]): any => {
    return items.map(item => ({
      id: item.id,
      quantity: {
        maximum: {
          count: item.quantity.maximum.count,
        },
        minimum: {
          count: item.quantity.minimum.count,
        },
      },
    }));
  };

  const getRandomItemsWithQuantities = (items: any): any => {
    // Shuffle the array to select random items
    const shuffledItems = items.sort(() => Math.random() - 0.5);
  
    // Determine a random number of items to pick
    const randomItemCount = Math.floor(Math.random() * items.length) + 1;
  
    // Pick a random subset of items
    const selectedItems = shuffledItems.slice(0, randomItemCount);
  
    // Assign random quantities within the minimum and maximum range
    return selectedItems.map((item:any) => {
      const min = item.quantity.minimum.count;
      const max = item.quantity.maximum.count;
  
      return {
        id: item.id,
        quantity: {
          selected: {
            count: Math.floor(Math.random() * (max - min + 1)) + min, // Random number between min and max (inclusive)
          },
        },
      };
    });
  };
const handleOnSearchRequest = async (payload: any) => {
    if (payload?.message?.catalog?.providers[0]?.items) {
        handleOnSearchRequest2(payload);
      } else {
        handleOnSearchRequest1(payload);
      }
  };


  const handleOnSearchRequest1 = async (payload: any) => {
    const extracted_data = extractPayloadData(payload, "on_search_1");
    extracted_data["transaction_id"] = generateRandomUUID()
    extracted_data["message_id"] = generateRandomUUID()
    extracted_data["timestamp"] = new Date().toISOString();
    extracted_data["city_code"] = payload?.city_code

    await RedisService.setKey(
        extracted_data["transaction_id"],
        JSON.stringify(extracted_data),
      );
      
    const responsePayload = resolveTemplate(search_2_template, extracted_data);

    sendResponse(responsePayload, "search");
  };

  const handleOnSearchRequest2 = async (payload: any) => {
    let cachedata: any = await RedisService.getKey(payload.context.transaction_id);
    let json_cache_data = JSON.parse(cachedata)
    const extracted_data = extractPayloadData(payload, "on_search_2");
    extracted_data["message_id"] = generateRandomUUID()
    extracted_data["timestamp"] = new Date().toISOString();
    const items = json_cache_data?.item_ids
    const items_min_max = transformToItemFormat(items)
    const chosen_items = getRandomItemsWithQuantities(items_min_max)
    extracted_data["chosen_items"] = chosen_items
    const combined_data = {...json_cache_data,...extracted_data}
    const responsePayload = resolveTemplate(select, combined_data);
    await RedisService.setKey(
        payload.context.transaction_id,
        JSON.stringify(combined_data),
      );
    sendResponse(responsePayload, "select");
  };

  export default handleOnSearchRequest;

