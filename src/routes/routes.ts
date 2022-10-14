import express from "express";

import {test, signup, fundAccount, withdrawFunds, transferFunds} from "../controllers/controller";

const router = express.Router();

router.get("/", test);

router.post("/signup", signup);

router.post("/fundAccount", fundAccount);

router.post("/withdrawFunds", withdrawFunds);

router.post("/transferFunds", transferFunds);

export default router;