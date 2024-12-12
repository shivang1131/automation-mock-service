import axios from "axios";

export const sendResponse = async (data: any, type: any, queryParam?: Record<string, string>) => {
  try {
    // Retrieve the base URL from the environment variable
    const baseUrl = `${process.env.API_SERVICE_LAYER}/mock/${type}`;

    // Append query parameters if provided
    const url = queryParam
      ? `${baseUrl}?${new URLSearchParams(queryParam).toString()}`
      : baseUrl;

    // Send the POST request
    const response = await axios.post(url, data);

    // Log the response
    console.log("response>", response.data);
  } catch (error) {
    // Handle errors
    console.error("Error sending response:", error);
  }
};
