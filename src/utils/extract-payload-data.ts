import jsonpath from "jsonpath";

import search_1 from "../dataPaths/search_1.json";
import search_2 from "../dataPaths/search_2.json";
import select from "../dataPaths/select.json";
import init from "../dataPaths/init.json";
import confirm from "../dataPaths/confirm.json";

const extractPayloadData = (payload: any, type: string) => {
  let dataPaths: any = null;

  switch (type) {
    case "search_1":
      dataPaths = search_1;
      break;
    case "search_2":
      dataPaths = search_2;
      break;
    case "select":
      dataPaths = select;
      break;
    case "init":
      dataPaths = init;
      break;
    case "confirm":
      dataPaths = confirm;
      break;
    default:
      console.log("invalid type for data path" + type);
  }

  const extarctedData: any = {};

  for (const key in dataPaths) {
    const path = dataPaths[key];
    const value = jsonpath.query(payload, path);
    extarctedData[key] = String(value);
    extarctedData["maximum_quantity"] = 5
  }

  return {
    ...extarctedData,
    timestamp: "asda",
    search_start_coordinates: "sadsa",
    search_end_coordinates: "asda",
  };
};

export default extractPayloadData;
