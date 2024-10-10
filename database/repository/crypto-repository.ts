import { APIError, STATUS_CODES } from "../../utils/app-errors";
import { CryptoPrice } from "../models/crypto-model";

export class CryptoRepository {
  async getStats({ coin }: { coin: string }) {
    try {
      const Stats = await CryptoPrice.find({ coinId: coin })
        .sort({ timestamp: -1 })
        .limit(1);

      if (Stats.length === 0) {
        throw new APIError(
          "API Error",
          STATUS_CODES.NOT_FOUND,
          "No data found"
        );
      }

      return Stats;
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to fetch stats"
      );
    }
  }

  async getDeviation({ coin }: { coin: string }) {
    try {
      const prices = await CryptoPrice.aggregate([
        {
          $match: { coinId: coin },
        },
        {
          $sort: { timestamp: -1 },
        },
        {
          $limit: 100,
        },
        {
          $group: {
            _id: null,
            prices: { $push: "$current_price_usd" },
            mean: { $avg: "$current_price_usd" },
          },
        },
        {
          $project: {
            _id: 0,
            mean: 1,
            prices: 1,
            deviation: {
              $sqrt: {
                $divide: [
                  {
                    $reduce: {
                      input: "$prices",
                      initialValue: 0,
                      in: {
                        $add: [
                          "$$value",
                          {
                            $pow: [{ $subtract: ["$$this", "$mean"] }, 2],
                          },
                        ],
                      },
                    },
                  },
                  { $size: "$prices" },
                ],
              },
            },
          },
        },
      ]);

      if (!prices.length) {
        throw new APIError(
          "Data Not Found",
          STATUS_CODES.NOT_FOUND,
          `No price data found for ${coin}`
        );
      }

      return {
        prices: prices[0].prices,
        mean: Number(prices[0].mean.toFixed(2)),
        deviation: Number(prices[0].deviation.toFixed(2)),
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to calculate deviation"
      );
    }
  }
}
