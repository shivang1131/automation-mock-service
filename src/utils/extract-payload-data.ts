import jsonpath from "jsonpath";

import search_1 from "../dataPaths/search_1.json";
import search_2 from "../dataPaths/search_2.json";
import select from "../dataPaths/select.json";
import init from "../dataPaths/init.json";
import confirm from "../dataPaths/confirm.json";
import on_search_1 from "../dataPaths/on_search_1.json";
import on_search_2 from "../dataPaths/on_search_2.json";


const extractPayloadData = (payload: any, type: string) => {
  let dataPaths: any = null;
  
  const extarctedData: any = {};
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
    case "on_search_1":
      dataPaths = on_search_1
      break;
    case "on_search_2":
      dataPaths = on_search_2
      break;
    default:
      console.log("invalid type for data path" + type);
  }

  for (const key in dataPaths) {
    const path = dataPaths[key];
    const value = jsonpath.query(payload, path);
    if (!value.length){
      continue;
    }
    if(value.length == 1){
      extarctedData[key] = value[0];
    }
    else{
      extarctedData[key] = value;
    }
  }
  extarctedData["timestamp"] = new Date().toISOString();
  return {
    ...extarctedData
  };
};

export default extractPayloadData;
