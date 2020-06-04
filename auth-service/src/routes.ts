import { Router } from "express";

import * as authController from "./controllers/auth";

const router: Router = Router();

router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);
router.get("/jwks", authController.getJwks);

export default router;
