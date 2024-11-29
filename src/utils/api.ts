import axios from "axios";

export const sendResponse = async (data: any, type: any) => {
  const resposne = axios.post(
    "https://9565-59-145-217-117.ngrok-free.app/",
    data
  );
  console.log("response>", resposne);
};
