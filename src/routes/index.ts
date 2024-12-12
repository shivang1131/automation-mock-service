import { Router } from "express";

const apiRouter = Router();

import { handleBAPRequest,triggerevent, handleBPPrequest, handleRequest } from "./../controller/index";

apiRouter.post("/:action", handleRequest);

apiRouter.post("/trigger",triggerevent )

// router.post("/seller/:action",handleBPPrequest)


export default apiRouter;
