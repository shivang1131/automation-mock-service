import { Router } from "express";

const router = Router();

import { handleRequest } from "./../controller/index";

router.post("/:action", handleRequest);

export default router;
