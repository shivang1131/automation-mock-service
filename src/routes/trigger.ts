import { Router } from "express";

const router = Router();

import { triggerevent} from "./../controller/index";


router.post("/",triggerevent )


export default router;