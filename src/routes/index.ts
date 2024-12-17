import { Router } from "express";

const apiRouter = Router();

import { handleBAPRequest,triggerevent, handleBPPrequest, handleRequest } from "./../controller/index";
import logger from "../utils/logger";

apiRouter.post("/:action", handleRequest);

apiRouter.post("/trigger",triggerevent )



export default apiRouter;
