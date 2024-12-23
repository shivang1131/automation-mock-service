import extractPayloadData from "../utils/extract-payload-data";
import { resolveTemplate } from "../utils/template_parser";
import on_search_1_template from "../templates/on_search_1.json";
import on_search_2_template from "../templates/on_search_2.json";
import { sendResponse } from "../utils/api";
import stations from '../dataPaths/static_cache_data.json'
import { start } from "repl";
import { setToCache } from "../utils/redis";
import { CACHE_DB_2 } from "../constants/constants";
import logger from "../utils/logger";

const createCustomRoute = (routeData: any[], startStationCode: string, endStationCode: string): any[] => {
  return routeData.map(route => {
      const stops = route.stops;

      // Find the start and end indices based on the input station codes
      const startIndex = stops.findIndex((stop: any) => stop.location.descriptor.code === startStationCode);
      const endIndex = stops.findIndex((stop: any) => stop.location.descriptor.code === endStationCode);

      // Check if both stations exist in the stops list
      if (startIndex === -1 || endIndex === -1) {
          throw new Error(`Start or End station not found in the route`);
      }

      // Ensure start and end indices are different
      if (startIndex === endIndex) {
          throw new Error(`Start and End stations must be different`);
      }

      // Slice and reverse if necessary
      let selectedStops: any[];
      if (startIndex > endIndex) {
          selectedStops = stops.slice(endIndex, startIndex + 1).reverse();
      } else {
          selectedStops = stops.slice(startIndex, endIndex + 1);
      }

      // Adjust types, parent IDs, and assign sequential IDs
      selectedStops.forEach((stop, index) => {
          stop.id = (index + 1).toString(); // Assign sequential ID starting from 1

          if (index === 0) {
              stop.type = "START";
              delete stop.parent_stop_id; // No parent for the first stop
          } else if (index === selectedStops.length - 1) {
              stop.type = "END";
              stop.parent_stop_id = selectedStops[index - 1].id;
          } else {
              stop.type = "INTERMEDIATE_STOP";
              stop.parent_stop_id = selectedStops[index - 1].id;
          }
      });

      // Construct the new route
      return {
          id: route.id,
          stops: selectedStops,
          type: route.type,
          vehicle: route.vehicle
      };
  });
};
const handleSerachRequest =  (payload: any) => {
  if (payload.message.intent.fulfillment.stops) {
    handleSearch2(payload);
  } else {
    handleSearch1(payload);
  }
};

const handleSearch1 = async (payload: any) => {

  const extarctedData_search = extractPayloadData(payload, "search_1");
  // store in cache
  // valdiation
  // if(l2.template) { return }
  const city_code = extarctedData_search["cityCode"]
  extarctedData_search["fulfillments"] = stations[city_code as keyof typeof stations]
  const responsePayload = resolveTemplate(on_search_1_template, extarctedData_search);
  const extarctedData_on_search = extractPayloadData(responsePayload,"on_search_1");
  sendResponse(responsePayload, "on_search");
};

const handleSearch2 = async (payload: any) => {

  const extarctedData_search = extractPayloadData(payload, "search_2");

  const city_code = extarctedData_search["cityCode"]
  const route = stations[city_code as keyof typeof stations]
  const start_code = extarctedData_search["start_code"]
  const end_code = extarctedData_search["end_code"]
  const fulfillments = createCustomRoute(route,start_code,end_code)
  extarctedData_search["fulfillments"] = fulfillments
  extarctedData_search["timestamp"] = new Date().toISOString();
  const responsePayload = resolveTemplate(on_search_2_template, extarctedData_search);
  const extarctedData_on_search = extractPayloadData(responsePayload,"on_search_2");
  logger.info(extarctedData_on_search)
  const combined_data = { ...extarctedData_search, ...extarctedData_on_search};
  await setToCache(
      payload?.context?.transaction_id,
      combined_data,
      CACHE_DB_2
    );
  sendResponse(responsePayload, "on_search");
};

export default handleSerachRequest;
