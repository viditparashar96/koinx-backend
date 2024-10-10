import { Router } from "express";
import {
  getDeviationContoller,
  getStatsContoller,
} from "../controller/crypto-controller";

const crypto_router = Router();

crypto_router.get("/stats", getStatsContoller);

crypto_router.get("/deviation", getDeviationContoller);

export { crypto_router };
