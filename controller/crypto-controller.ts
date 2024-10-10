import { NextFunction, Request, Response } from "express";
import { CryptoService } from "../services/crypto-services";
import { APIError, STATUS_CODES } from "../utils/app-errors";

export const getStatsContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = new CryptoService();
    const { coin } = req.query;
    if (!coin) {
      throw new APIError(
        "Bad Request",
        STATUS_CODES.BAD_REQUEST,
        "Coin is missing in query parameters"
      );
    }

    const stats = await service.getStats({ coin: coin as string });

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeviationContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = new CryptoService();
    const { coin } = req.query;

    const deviation = await service.getDeviation({ coin: coin as string });
    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: deviation,
    });
  } catch (error) {
    next(error);
  }
};
