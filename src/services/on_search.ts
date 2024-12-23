import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import search_2_template from "../templates/search_2.json";
import select from "../templates/select.json";
import { sendResponse } from "../utils/api";
import { getFromCache,setToCache } from "../utils/redis";
import { generateRandomUUID } from "../utils/generate_uuids";
import { CACHE_DB_0 } from "../constants/constants";
import logger from "../utils/logger";

function getRandomStations(data: any) {
    // Flatten all stops across all fulfillments
    const allStops = data.flatMap((fulfillment: any) => fulfillment.stops);

    // Get two unique random indices
    let firstIndex = Math.floor(Math.random() * allStops.length);
    let secondIndex;
  
    do {
      secondIndex = Math.floor(Math.random() * allStops.length);
    } while (secondIndex === firstIndex); // Ensure the indices are different
  
    // Return the randomly selected stops
    return {
      start_station: allStops[firstIndex].location.descriptor.code,
      end_station: allStops[secondIndex].location.descriptor.code
    };
  }
  const transformToItemFormat = (items: any[]): any => {
    try{return items.map(item => ({
      id: item.id,
      quantity: {
        maximum: {
          count: item.quantity.maximum.count,
        },
        minimum: {
          count: item.quantity.minimum.count,
        },
      },
    }));}
      catch(e: any){
        logger.error(e.message)
      }
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
    let json_cache_data: any = await getFromCache(payload.context.transaction_id,CACHE_DB_0);
    //perform l2 validations with json_cache_data
    const extracted_data = extractPayloadData(payload, "on_search_1");
    extracted_data["transaction_id"] = generateRandomUUID()
    extracted_data["message_id"] = generateRandomUUID()
    extracted_data["timestamp"] = new Date().toISOString();
    const { start_station, end_station } = getRandomStations([extracted_data["fulfillments"]]);
    extracted_data["start_station"] = start_station
    extracted_data["end_station"] = end_station
    const responsePayload = resolveTemplate(search_2_template, extracted_data);

    sendResponse(responsePayload, "search");
  };

  const handleOnSearchRequest2 = async (payload: any) => {
    let json_cache_data: any = await getFromCache(payload.context.transaction_id,CACHE_DB_0);

    const extracted_data = extractPayloadData(payload, "on_search_2");
    extracted_data["message_id"] = generateRandomUUID()
    extracted_data["timestamp"] = new Date().toISOString();
    const items = json_cache_data?.items
    const items_min_max = transformToItemFormat(items)
    const chosen_items = getRandomItemsWithQuantities(items_min_max)
    extracted_data["chosen_items"] = chosen_items
    const combined_data = {...json_cache_data,...extracted_data}
    const responsePayload = resolveTemplate(select, combined_data);
    await setToCache(
        payload.context.transaction_id,
        combined_data,
        CACHE_DB_0
      );
    sendResponse(responsePayload, "select");
  };

  export default handleOnSearchRequest;

