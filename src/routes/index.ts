import { Router } from "express";

const apiRouter = Router();

import { triggerevent, handleRequest } from "./../controller/index";

apiRouter.post("/:action", handleRequest);

apiRouter.post("/trigger",triggerevent )



export default apiRouter;
