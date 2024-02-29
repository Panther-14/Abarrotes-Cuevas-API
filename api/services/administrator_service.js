import { Router } from "express";
const router = Router();

import { verifytoken } from "../security/tkn_auth.js";

router.use(verifytoken);

router.put('/registrousuarios',);

router.put('/registrosucursles',);

router.put('/registroproducos',);


export default router;
