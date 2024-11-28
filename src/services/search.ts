const handleSerachRequest = (payload: any) => {
  if (payload.message.intent.fulfillment.stops) {
    handleSeach2(payload);
  } else {
    handleSearch1(payload);
  }
};

const handleSearch1 = (payload: any) => {
  console.log("search 1 payload: ", payload);
};

const handleSeach2 = (payload: any) => {
  console.log("search 2 payload: ", payload);
};

export default handleSerachRequest;
